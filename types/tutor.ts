export interface Course {
  _id: string;
  tutor: string;
  subject: string;
  classOrGrade: string;
  city?: string;
  mode: "online" | "home" | "both";
  fee: number;
  description?: string;
  isDeleted: boolean;
}

export interface TutorProfileDetail {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  bio?: string;
  education?: string;
  experience?: number;
  cities: string[];
  subjects: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  verificationStatus: string;
  courses?: Course[];
}

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
  mode?: "online" | "home" | "both";
  classOrGrade?: string;
  maxFee?: number;
  verificationStatus?: "verified" | "pending" | "rejected" | "blocked";
  page?: number;
  limit?: number;
  sortBy?: "rating" | "price" | "default";
}
