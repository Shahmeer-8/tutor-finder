import { Course } from '../types/tutor';

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

export const courseService = {
  /**
   * Get all courses for the logged-in tutor
   */
  async getMyCourses(): Promise<Course[]> {
    const response = await fetch(`${API_URL}/courses/me`, {
      method: 'GET',
      credentials: 'include',
    });
    return handleResponse<Course[]>(response);
  },

  /**
   * Create a new course
   */
  async createCourse(courseData: Partial<Course>): Promise<Course> {
    const response = await fetch(`${API_URL}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData),
      credentials: 'include',
    });
    return handleResponse<Course>(response);
  },

  /**
   * Update an existing course
   */
  async updateCourse(courseId: string, courseData: Partial<Course>): Promise<Course> {
    const response = await fetch(`${API_URL}/courses/${courseId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData),
      credentials: 'include',
    });
    return handleResponse<Course>(response);
  },

  /**
   * Delete a course (soft delete usually)
   */
  async deleteCourse(courseId: string): Promise<void> {
    const response = await fetch(`${API_URL}/courses/${courseId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return handleResponse<void>(response);
  }
};
