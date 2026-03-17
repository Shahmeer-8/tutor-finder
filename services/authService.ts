import { User, AuthResponse } from "../types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Handle API responses and throw standard errors
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = "An unexpected error occurred";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e: any) {
      // If parsing JSON fails, keep default error
    }
    throw new Error(errorMessage);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

/**
 * Auth Service for handling API calls related to authentication
 */
export const authService = {
  /**
   * Login a user
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      // Important for sending/receiving HTTP-only cookies
      credentials: "include",
    });

    return handleResponse<AuthResponse>(response);
  },

  /**
   * Register a new user
   */
  async signup(data: any): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    return handleResponse<AuthResponse>(response);
  },

  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    return handleResponse<void>(response);
  },

  /**
   * Request password reset email
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    return handleResponse<{ message: string }>(response);
  },

  /**
   * Get current user profile based on HttpOnly cookie
   */
  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    return handleResponse<User>(response);
  },
};
