'use client';

import React, { useState, useEffect } from 'react';
import { TutorFilters } from '../../components/tutors/TutorFilters';
import { TutorCard } from '../../components/tutors/TutorCard';
import { TutorSearchFilters, TutorSearchResult } from '../../types/tutor';
import { tutorService } from '../../services/tutorService';

export default function TutorsPage() {
  const [filters, setFilters] = useState<TutorSearchFilters>({
    page: 1,
    limit: 10,
    verificationStatus: 'verified',
  });
  
  const [tutors, setTutors] = useState<TutorSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalResults, setTotalResults] = useState(0);

  const fetchTutors = async (currentFilters: TutorSearchFilters) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await tutorService.searchTutors(currentFilters);
      setTutors(response.results);
      setTotalResults(response.totalResults);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tutors. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchTutors(filters);
  }, []);

  const handleFilterChange = (key: keyof TutorSearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    // Reset to page 1 when applying new filters
    const newFilters = { ...filters, page: 1 };
    setFilters(newFilters);
    fetchTutors(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: TutorSearchFilters = {
      page: 1,
      limit: 10,
      verificationStatus: 'verified',
    };
    setFilters(clearedFilters);
    fetchTutors(clearedFilters);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = e.target.value as any;
    const newFilters = { ...filters, sortBy, page: 1 };
    setFilters(newFilters);
    fetchTutors(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find the Perfect Tutor</h1>
          <p className="mt-2 text-gray-600">Browse our highly-rated, verified tutors to help you achieve your goals.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filters */}
          <div className="w-full lg:w-1/4 flex-shrink-0">
            <TutorFilters 
              filters={filters} 
              onChange={handleFilterChange} 
              onApply={applyFilters} 
              onClear={clearFilters} 
            />
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:w-3/4">
            
            {/* Toolbar (Results count & Sorting) */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                Showing <span className="font-semibold text-gray-900">{tutors.length}</span> of <span className="font-semibold text-gray-900">{totalResults}</span> tutors
              </div>
              
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort by:</label>
                <select 
                  className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={filters.sortBy || 'default'}
                  onChange={handleSortChange}
                >
                  <option value="default">Recommended</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price">Lowest Price</option>
                </select>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-md">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white p-6 rounded-xl border border-gray-200 h-48">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 pt-4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : tutors.length === 0 && !error ? (
              /* Empty State */
              <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No tutors found</h3>
                <p className="mt-1 text-sm text-gray-500">We couldn't find any tutors matching your current filters.</p>
                <div className="mt-6">
                  <button onClick={clearFilters} className="text-blue-600 hover:text-blue-500 font-medium">
                    Clear filters and try again
                  </button>
                </div>
              </div>
            ) : (
              /* Results Grid */
              <div className="grid grid-cols-1 gap-6">
                {tutors.map((tutor) => (
                  <TutorCard key={tutor.id} tutor={tutor} />
                ))}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
