"use client";

import React, { useState, useEffect } from "react";
import { TutorFilters } from "../../components/tutors/TutorFilters";
import { TutorCard } from "../../components/tutors/TutorCard";
import { TutorSearchFilters, TutorSearchResult } from "../../types/tutor";
import { tutorService } from "../../services/tutorService";
import { CardSkeleton } from "../../components/ui/Skeletons";
import { EmptyState } from "../../components/ui/EmptyState";

export default function TutorsPage() {
  const [filters, setFilters] = useState<TutorSearchFilters>({
    page: 1,
    limit: 10,
    verificationStatus: "verified",
  });

  const [tutors, setTutors] = useState<TutorSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalResults, setTotalResults] = useState(0);

  const fetchTutors = async (currentFilters: TutorSearchFilters) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await tutorService.searchTutors(currentFilters);
      setTutors(response.results);
      setTotalResults(response.totalResults);
    } catch (err: any) {
      setError(
        err.message || "Failed to fetch tutors. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchTutors(filters);
  }, []);

  const handleFilterChange = (key: keyof TutorSearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
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
      verificationStatus: "verified",
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
          <h1 className="text-3xl font-bold text-gray-900">
            Find the Perfect Tutor
          </h1>
          <p className="mt-2 text-gray-600">
            Browse our highly-rated, verified tutors to help you achieve your
            goals.
          </p>
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
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {tutors.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">
                  {totalResults}
                </span>{" "}
                tutors
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Sort by:
                </label>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={filters.sortBy || "default"}
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
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : tutors.length === 0 && !error ? (
              /* Empty State */
              <EmptyState
                title="No tutors found"
                description="We couldn't find any tutors matching your current filters."
                actionLabel="Clear Filters"
                onAction={clearFilters}
              />
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
