import { SearchTutorsResponse, TutorSearchFilters } from '../types/tutor';

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
      // If parsing JSON fails, keep default error
    }
    throw new Error(errorMessage);
  }
  
  if (response.status === 204) {
    return {} as T;
  }
  
  return response.json();
}

export const tutorService = {
  /**
   * Search for tutors with applied filters
   */
  async searchTutors(filters: TutorSearchFilters): Promise<SearchTutorsResponse> {
    const params = new URLSearchParams();
    
    // Always fetch verified tutors unless specified otherwise
    params.append('verificationStatus', filters.verificationStatus || 'verified');
    
    if (filters.city) params.append('city', filters.city);
    if (filters.subject) params.append('subject', filters.subject);
    if (filters.mode) params.append('mode', filters.mode);
    if (filters.classOrGrade) params.append('classOrGrade', filters.classOrGrade);
    if (filters.maxFee) params.append('maxFee', filters.maxFee.toString());
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    
    // The backend handles the default ranking algorithm (rating + featured + etc).
    // If we want explicit overrides for sorting, we might need to send a 'sortBy' param to the backend.
    if (filters.sortBy) params.append('sortBy', filters.sortBy);

    const response = await fetch(`${API_URL}/tutors/search?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return handleResponse<SearchTutorsResponse>(response);
  },
};
