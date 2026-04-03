import type { Request, Response, NextFunction } from "express";
import { authService } from "../services/authService.js";
import { userRepository } from "../repositories/userRepository.js";
import { sendSuccess } from "../utils/response.js";
import { BadRequestError, UnauthorizedError } from "../utils/errors.js";
import { env } from "../config/env.js";

const ACCESS_COOKIE_OPTS = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 15 * 60 * 1000,
};

function setRefreshCookieOpts(expiresAt: Date) {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    expires: expiresAt,
  };
}

function clearCookieOpts() {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
}

export const authController = {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password, role, phone, city } = req.body as {
        name: string;
        email: string;
        password: string;
        role: "student" | "tutor";
        phone?: string;
        city?: string;
      };

      if (!name || !email || !password || !role) {
        throw new BadRequestError("name, email, password, and role are required");
      }
      if (!["student", "tutor"].includes(role)) {
        throw new BadRequestError("role must be 'student' or 'tutor'");
      }
      if (password.length < 8) {
        throw new BadRequestError("Password must be at least 8 characters");
      }

      const { user, tokens } = await authService.register({ name, email, password, role, phone, city });

      res.cookie("accessToken", tokens.accessToken, ACCESS_COOKIE_OPTS);
      res.cookie("refreshToken", tokens.refreshToken, setRefreshCookieOpts(tokens.refreshTokenExpiry));

      sendSuccess({
        res,
        statusCode: 201,
        message: "Account created successfully",
        data: { user: authService.serializeUser(user) },
      });
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body as { email: string; password: string };

      if (!email || !password) {
        throw new BadRequestError("email and password are required");
      }

      const { user, tokens } = await authService.login({ email, password });

      res.cookie("accessToken", tokens.accessToken, ACCESS_COOKIE_OPTS);
      res.cookie("refreshToken", tokens.refreshToken, setRefreshCookieOpts(tokens.refreshTokenExpiry));

      sendSuccess({
        res,
        message: "Logged in successfully",
        data: { user: authService.serializeUser(user) },
      });
    } catch (err) {
      next(err);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const refreshToken = req.cookies?.refreshToken as string | undefined;
      const userId = req.userId;

      if (userId && refreshToken) {
        await authService.logout(userId, refreshToken);
      }

      res.clearCookie("accessToken", clearCookieOpts());
      res.clearCookie("refreshToken", clearCookieOpts());

      sendSuccess({ res, message: "Logged out successfully" });
    } catch (err) {
      next(err);
    }
  },

  async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const refreshToken = req.cookies?.refreshToken as string | undefined;
      if (!refreshToken) throw new UnauthorizedError("Refresh token missing");

      const tokens = await authService.refresh(refreshToken);

      res.cookie("accessToken", tokens.accessToken, ACCESS_COOKIE_OPTS);
      res.cookie("refreshToken", tokens.refreshToken, setRefreshCookieOpts(tokens.refreshTokenExpiry));

      sendSuccess({ res, message: "Token refreshed" });
    } catch (err) {
      next(err);
    }
  },

  async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await userRepository.findById(req.userId!);
      if (!user) throw new UnauthorizedError("User not found");

      sendSuccess({ res, data: { user: authService.serializeUser(user) } });
    } catch (err) {
      next(err);
    }
  },

  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body as { email: string };
      if (!email) throw new BadRequestError("email is required");

      await authService.forgotPassword(email);

      sendSuccess({
        res,
        message: "If an account with that email exists, a reset link has been sent",
      });
    } catch (err) {
      next(err);
    }
  },

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token, password } = req.body as { token: string; password: string };
      if (!token || !password) throw new BadRequestError("token and password are required");
      if (password.length < 8) throw new BadRequestError("Password must be at least 8 characters");

      await authService.resetPassword(token, password);

      res.clearCookie("accessToken", clearCookieOpts());
      res.clearCookie("refreshToken", clearCookieOpts());

      sendSuccess({ res, message: "Password reset successfully. Please log in." });
    } catch (err) {
      next(err);
    }
  },
};
