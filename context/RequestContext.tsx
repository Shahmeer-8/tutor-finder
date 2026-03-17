'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { TutorRequest, RequestUpdatePayload } from '../types/request';
import { requestService } from '../services/requestService';

interface RequestContextType {
  requests: TutorRequest[];
  isLoading: boolean;
  error: string | null;
  
  // Student Actions
  fetchStudentRequests: () => Promise<void>;
  createRequest: (courseId: string, message?: string) => Promise<void>;
  updateRequest: (requestId: string, payload: RequestUpdatePayload) => Promise<void>;
  deleteRequest: (requestId: string) => Promise<void>;
  
  // Tutor Actions
  fetchTutorRequests: () => Promise<void>;
  approveRequest: (requestId: string) => Promise<void>;
  rejectRequest: (requestId: string) => Promise<void>;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const RequestProvider = ({ children }: { children: ReactNode }) => {
  const [requests, setRequests] = useState<TutorRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ====================
  // STUDENT ACTIONS
  // ====================
  const fetchStudentRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await requestService.getMyRequests();
      setRequests(data.requests);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch your requests');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createRequest = async (courseId: string, message?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Create request and refresh list
      await requestService.createRequest(courseId, message);
      await fetchStudentRequests();
    } catch (err: any) {
      setError(err.message || 'Failed to create request');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateRequest = async (requestId: string, payload: RequestUpdatePayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const { request } = await requestService.updateRequest(requestId, payload);
      setRequests(prev => prev.map(req => req._id === requestId ? request : req));
    } catch (err: any) {
      setError(err.message || 'Failed to update request');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRequest = async (requestId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await requestService.deleteRequest(requestId);
      setRequests(prev => prev.filter(req => req._id !== requestId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete request');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ====================
  // TUTOR ACTIONS
  // ====================
  const fetchTutorRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await requestService.getTutorRequests();
      setRequests(data.requests);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch incoming requests');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const approveRequest = async (requestId: string) => {
    setError(null);
    try {
      const { request } = await requestService.approveRequest(requestId);
      setRequests(prev => prev.map(req => req._id === requestId ? request : req));
    } catch (err: any) {
      setError(err.message || 'Failed to approve request');
      throw err;
    }
  };

  const rejectRequest = async (requestId: string) => {
    setError(null);
    try {
      const { request } = await requestService.rejectRequest(requestId);
      setRequests(prev => prev.map(req => req._id === requestId ? request : req));
    } catch (err: any) {
      setError(err.message || 'Failed to reject request');
      throw err;
    }
  };

  return (
    <RequestContext.Provider
      value={{
        requests,
        isLoading,
        error,
        fetchStudentRequests,
        createRequest,
        updateRequest,
        deleteRequest,
        fetchTutorRequests,
        approveRequest,
        rejectRequest,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequest = () => {
  const context = useContext(RequestContext);
  if (context === undefined) {
    throw new Error('useRequest must be used within a RequestProvider');
  }
  return context;
};
