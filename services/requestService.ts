import { TutorRequest, RequestUpdatePayload } from "../types/request";

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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ course: courseId, message }),
      credentials: "include", // Important for auth
    });

    return handleResponse<any>(response);
  },

  /**
   * Get all requests for the currently logged in user
   */
  async getMyRequests(): Promise<{ requests: TutorRequest[] }> {
    const response = await fetch(`${API_URL}/requests`, {
      method: "GET",
      credentials: "include",
    });

    return handleResponse<{ requests: TutorRequest[] }>(response);
  },

  /**
   * Update a pending request
   */
  async updateRequest(
    requestId: string,
    payload: RequestUpdatePayload,
  ): Promise<{ request: TutorRequest }> {
    const response = await fetch(`${API_URL}/requests/${requestId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    return handleResponse<{ request: TutorRequest }>(response);
  },

  /**
   * Delete a pending request
   */
  async deleteRequest(requestId: string): Promise<void> {
    const response = await fetch(`${API_URL}/requests/${requestId}`, {
      method: "DELETE",
      credentials: "include",
    });

    return handleResponse<void>(response);
  },
};
