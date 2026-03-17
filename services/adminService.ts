import { User } from '../types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Handle API responses and throw standard errors
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = 'An unexpected error occurred';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e: any) {
      // Ignore parse errors
    }
    throw new Error(errorMessage);
  }
  
  if (response.status === 204) {
    return {} as T;
  }
  
  return response.json();
}

export const adminService = {
  /**
   * Get overall platform analytics
   */
  async getAnalytics(): Promise<any> {
    const response = await fetch(`${API_URL}/admin/analytics`, {
      method: 'GET',
      credentials: 'include',
    });
    return handleResponse<any>(response);
  },

  /**
   * Get all users (with optional role filter)
   */
  async getUsers(role?: string): Promise<{ users: User[], total: number }> {
    const url = role ? `${API_URL}/admin/users?role=${role}` : `${API_URL}/admin/users`;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });
    return handleResponse<{ users: User[], total: number }>(response);
  },

  /**
   * Block or unblock a user
   */
  async toggleBlockStatus(userId: string, isBlocked: boolean): Promise<{ user: User }> {
    const response = await fetch(`${API_URL}/admin/users/${userId}/block`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isBlocked }),
      credentials: 'include',
    });
    return handleResponse<{ user: User }>(response);
  },

  /**
   * Get pending tutor verification requests
   */
  async getPendingVerifications(): Promise<any> {
    const response = await fetch(`${API_URL}/admin/tutors/pending`, {
      method: 'GET',
      credentials: 'include',
    });
    return handleResponse<any>(response);
  },

  /**
   * Approve tutor profile
   */
  async approveTutor(tutorId: string): Promise<any> {
    const response = await fetch(`${API_URL}/admin/tutors/${tutorId}/verify`, {
      method: 'POST',
      credentials: 'include',
    });
    return handleResponse<any>(response);
  },
  
  /**
   * Reject tutor profile
   */
  async rejectTutor(tutorId: string): Promise<any> {
    const response = await fetch(`${API_URL}/admin/tutors/${tutorId}/reject`, {
      method: 'POST',
      credentials: 'include',
    });
    return handleResponse<any>(response);
  }
};
