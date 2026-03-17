export interface TutorSearchResult {
  id: string;
  userId: string;
  name: string;
  email: string;
  rating: number;
  reviewCount: number;
  cities: string[];
  subjects: string[];
  featured: boolean;
  minFee: number;
  coursesCount: number;
  rankingScore: number;
}

export interface SearchTutorsResponse {
  results: TutorSearchResult[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface TutorSearchFilters {
  city?: string;
  subject?: string;
  mode?: 'online' | 'home' | 'both';
  classOrGrade?: string;
  maxFee?: number;
  verificationStatus?: 'verified' | 'pending' | 'rejected' | 'blocked';
  page?: number;
  limit?: number;
  sortBy?: 'rating' | 'price' | 'default';
}
