import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { TutorSearchResult } from '../../types/tutor';

interface TutorCardProps {
  tutor: TutorSearchResult;
}

export function TutorCard({ tutor }: TutorCardProps) {
  // Star rating helper
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.round(rating)) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          
          {/* Avatar and Info */}
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl flex-shrink-0">
              {tutor.name.charAt(0).toUpperCase()}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900">{tutor.name}</h3>
                <Badge variant="success">Verified</Badge>
                {tutor.featured && <Badge variant="info">Featured</Badge>}
              </div>
              
              <div className="flex items-center gap-1 text-sm">
                <div className="flex">{renderStars(tutor.rating)}</div>
                <span className="text-gray-600 font-medium ml-1">{tutor.rating}</span>
                <span className="text-gray-400">({tutor.reviewCount} reviews)</span>
              </div>
              
              <div className="text-sm text-gray-500 pt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {tutor.cities.join(', ') || 'Online only'}
              </div>
            </div>
          </div>

          {/* Price and Action */}
          <div className="flex flex-col md:items-end justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
            <div className="flex flex-col md:items-end mb-4 md:mb-0">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Starting from</span>
              <span className="text-2xl font-bold text-blue-600">${tutor.minFee || 0}</span>
              <span className="text-xs text-gray-400">per course</span>
            </div>
            
            <Link href={`/tutors/${tutor.userId}`}>
              <Button className="w-full md:w-auto" variant="outline">
                View Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Subjects tags */}
        <div className="mt-4 pt-4 border-t border-gray-50 flex flex-wrap gap-2">
          {tutor.subjects.slice(0, 5).map((subject, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
              {subject}
            </span>
          ))}
          {tutor.subjects.length > 5 && (
            <span className="px-2.5 py-1 rounded-md bg-gray-50 text-gray-500 text-xs font-medium">
              +{tutor.subjects.length - 5} more
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
