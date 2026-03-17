export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'trial' | 'completed';

export interface TutorRequest {
  _id: string;
  student: string | any;
  tutor: {
    _id: string;
    name: string;
    email: string;
  };
  course: {
    _id: string;
    subject: string;
    classOrGrade: string;
    mode: string;
    fee: number;
  };
  status: RequestStatus;
  message?: string;
  trialStartDate?: string;
  trialEndDate?: string;
  hasPaid: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RequestUpdatePayload {
  message?: string;
}
