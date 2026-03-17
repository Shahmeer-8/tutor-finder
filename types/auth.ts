export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'tutor' | 'admin';
  isVerified?: boolean;
  isBlocked?: boolean;
}

export interface AuthResponse {
  user: User;
}

export interface ApiError {
  message: string;
  code?: number;
}
