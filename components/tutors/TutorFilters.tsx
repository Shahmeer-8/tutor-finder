'use client';

import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { TutorSearchFilters } from '../../types/tutor';

interface TutorFiltersProps {
  filters: TutorSearchFilters;
  onChange: (key: keyof TutorSearchFilters, value: any) => void;
  onApply: () => void;
  onClear: () => void;
}

export function TutorFilters({ filters, onChange, onApply, onClear }: TutorFiltersProps) {
  return (
    <Card className="sticky top-20">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          <button 
            onClick={onClear}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all
          </button>
        </div>

        <div className="space-y-6">
          {/* Subject Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
            <Input 
              placeholder="e.g. Mathematics" 
              value={filters.subject || ''} 
              onChange={(e) => onChange('subject', e.target.value)}
            />
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
            <Input 
              placeholder="e.g. New York" 
              value={filters.city || ''} 
              onChange={(e) => onChange('city', e.target.value)}
            />
          </div>

          {/* Class/Grade Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Class / Grade</label>
            <Input 
              placeholder="e.g. 10th Grade" 
              value={filters.classOrGrade || ''} 
              onChange={(e) => onChange('classOrGrade', e.target.value)}
            />
          </div>

          {/* Mode Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mode</label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={filters.mode || ''}
              onChange={(e) => onChange('mode', e.target.value || undefined)}
            >
              <option value="">Any</option>
              <option value="online">Online</option>
              <option value="home">Home / In-person</option>
              <option value="both">Both</option>
            </select>
          </div>

          {/* Max Fee Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Max Fee ($)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={filters.maxFee || 500}
                onChange={(e) => onChange('maxFee', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700 w-12 text-right">
                ${filters.maxFee || 500}
              </span>
            </div>
          </div>

          <Button className="w-full" onClick={onApply}>
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
