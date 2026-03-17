'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { tutorService } from '../../../services/tutorService';
import { requestService } from '../../../services/requestService';
import { useAuth } from '../../../context/AuthContext';
import { TutorProfileDetail, Course } from '../../../types/tutor';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent } from '../../../components/ui/Card';

export default function TutorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser } = useAuth();
  
  const [profile, setProfile] = useState<TutorProfileDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Request Modal State
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [requestError, setRequestError] = useState('');

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const data = await tutorService.getTutorById(params.id as string);
        setProfile(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load tutor profile');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchTutorData();
    }
  }, [params.id]);

  const openRequestModal = (course: Course) => {
    if (!currentUser) {
      router.push(`/login?redirect=/tutors/${params.id}`);
      return;
    }
    
    if (currentUser.role !== 'student') {
      alert('Only students can request courses.');
      return;
    }

    setSelectedCourse(course);
    setIsRequestModalOpen(true);
    setRequestError('');
    setRequestMessage('');
  };

  const submitRequest = async () => {
    if (!selectedCourse) return;
    
    setIsSubmittingRequest(true);
    setRequestError('');
    
    try {
      await requestService.createRequest(selectedCourse._id, requestMessage);
      setIsRequestModalOpen(false);
      alert('Request sent successfully! You will be notified when the tutor responds.');
      // In a real app, you might use a toast notification here
    } catch (err: any) {
      setRequestError(err.message || 'Failed to send request');
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Oops!</h2>
          <p className="text-gray-600">{error || 'Tutor not found'}</p>
          <Button onClick={() => router.push('/tutors')} variant="primary">Back to Tutors</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-4xl flex-shrink-0">
              {profile.user?.name?.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{profile.user?.name}</h1>
                  {profile.verificationStatus === 'verified' && <Badge variant="success">Verified Tutor</Badge>}
                  {profile.featured && <Badge variant="info">Featured</Badge>}
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  {renderStars(profile.rating)}
                  <span className="font-semibold text-gray-900">{profile.rating}</span>
                  <span className="text-gray-500">({profile.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900 block">Locations</span>
                    <span className="text-gray-600">{profile.cities.join(', ') || 'Online Only'}</span>
                  </div>
                </div>
                
                {profile.experience !== undefined && (
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <span className="font-medium text-gray-900 block">Experience</span>
                      <span className="text-gray-600">{profile.experience} years</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {profile.bio && (
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-3">About Me</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{profile.bio}</p>
            </div>
          )}
          
          {profile.education && (
            <div className="mt-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Education</h2>
              <p className="text-gray-600">{profile.education}</p>
            </div>
          )}
        </div>

        {/* Courses Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Courses</h2>
          
          {(!profile.courses || profile.courses.length === 0) ? (
            <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
              <p className="text-gray-500">This tutor hasn't listed any courses yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {profile.courses.map((course) => (
                <Card key={course._id} className="overflow-hidden hover:border-blue-200 transition-colors">
                  <CardContent className="p-0 sm:flex">
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{course.subject}</h3>
                          <p className="text-sm text-blue-600 font-medium mt-1">{course.classOrGrade}</p>
                        </div>
                        <Badge variant="default" className="uppercase tracking-wider">
                          {course.mode}
                        </Badge>
                      </div>
                      
                      {course.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                      )}
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Flexible Schedule
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 sm:w-64 border-t sm:border-t-0 sm:border-l border-gray-100 flex flex-col justify-center">
                      <div className="text-center mb-4">
                        <span className="text-3xl font-bold text-gray-900">${course.fee}</span>
                        <span className="text-gray-500 text-sm block">per course</span>
                      </div>
                      <Button 
                        variant="primary" 
                        className="w-full shadow-sm"
                        onClick={() => openRequestModal(course)}
                      >
                        Request Tutor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Request Modal Overlay */}
      {isRequestModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">Request Course</h3>
              <button 
                onClick={() => setIsRequestModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {requestError && (
                <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r">
                  {requestError}
                </div>
              )}
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-sm font-semibold text-blue-900">{selectedCourse.subject} - {selectedCourse.classOrGrade}</p>
                <p className="text-sm text-blue-700 mt-1">Fee: ${selectedCourse.fee}</p>
                <p className="text-xs text-blue-600 mt-2">
                  A request will initiate a 48-hour trial period if approved by the tutor.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message to Tutor (Optional)
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md shadow-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  rows={4}
                  placeholder="Introduce yourself and explain what you need help with..."
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  disabled={isSubmittingRequest}
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setIsRequestModalOpen(false)}
                disabled={isSubmittingRequest}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={submitRequest}
                isLoading={isSubmittingRequest}
              >
                Send Request
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
