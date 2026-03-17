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
    } catch (e) {
      // Ignore parse errors
    }
    throw new Error(errorMessage);
  }
  
  if (response.status === 204) {
    return {} as T;
  }
  
  return response.json();
}

export const requestService = {
  /**
   * Request a tutor's course
   * @param courseId The ID of the course being requested
   * @param message Optional initial message to the tutor
   */
  async createRequest(courseId: string, message?: string): Promise<any> {
    const response = await fetch(`${API_URL}/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ course: courseId, message }),
      credentials: 'include', // Important for auth
    });

    return handleResponse<any>(response);
  },
};
