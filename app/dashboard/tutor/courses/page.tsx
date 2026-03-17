'use client';

import React, { useState, useEffect } from 'react';
import { useAuth, withAuth } from '../../../../context/AuthContext';
import { DashboardSidebar } from '../../../../components/dashboard/Sidebar';
import { courseService } from '../../../../services/courseService';
import { Course } from '../../../../types/tutor';
import { Badge } from '../../../../components/ui/Badge';
import { Button } from '../../../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/Card';
import { Input } from '../../../../components/ui/Input';

function TutorCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Partial<Course> | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const data = await courseService.getMyCourses();
      setCourses(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (course?: Course) => {
    if (course) {
      setCurrentCourse(course);
    } else {
      setCurrentCourse({
        subject: '',
        classOrGrade: '',
        mode: 'online',
        fee: 0,
        description: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (courseId: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      await courseService.deleteCourse(courseId);
      setCourses(courses.filter(c => c._id !== courseId));
    } catch (err: any) {
      alert(err.message || 'Failed to delete course');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCourse) return;

    setIsSubmitting(true);
    try {
      if (currentCourse._id) {
        // Edit
        const updatedCourse = await courseService.updateCourse(currentCourse._id, currentCourse);
        setCourses(courses.map(c => c._id === updatedCourse._id ? updatedCourse : c));
      } else {
        // Create
        const newCourse = await courseService.createCourse(currentCourse);
        setCourses([...courses, newCourse]);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'Failed to save course');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-gray-50">
      <DashboardSidebar role="tutor" />
      
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
            <Button onClick={() => handleOpenModal()}>+ Add Course</Button>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-8 flex justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                </div>
              ) : courses.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  <p className="mb-4">You haven't added any courses yet.</p>
                  <Button variant="outline" onClick={() => handleOpenModal()}>Create your first course</Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">Subject</th>
                        <th className="px-6 py-4">Class/Grade</th>
                        <th className="px-6 py-4">Mode</th>
                        <th className="px-6 py-4">Fee</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y border-t border-gray-100 divide-gray-100">
                      {courses.map((course) => (
                        <tr key={course._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{course.subject}</div>
                            {course.description && (
                              <div className="text-xs text-gray-500 truncate max-w-xs">{course.description}</div>
                            )}
                          </td>
                          <td className="px-6 py-4">{course.classOrGrade}</td>
                          <td className="px-6 py-4">
                            <Badge variant="default" className="uppercase">{course.mode}</Badge>
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900">
                            ${course.fee}
                          </td>
                          <td className="px-6 py-4 text-right space-x-3">
                            <button 
                              onClick={() => handleOpenModal(course)}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDelete(course._id)}
                              className="text-red-600 hover:text-red-800 font-medium"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Course Modal */}
      {isModalOpen && currentCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                {currentCourse._id ? 'Edit Course' : 'Create New Course'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <Input
                  label="Subject"
                  required
                  placeholder="e.g. Mathematics"
                  value={currentCourse.subject}
                  onChange={(e) => setCurrentCourse({...currentCourse, subject: e.target.value})}
                />
                
                <Input
                  label="Class or Grade"
                  required
                  placeholder="e.g. 10th Grade, College"
                  value={currentCourse.classOrGrade}
                  onChange={(e) => setCurrentCourse({...currentCourse, classOrGrade: e.target.value})}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
                    <select
                      className="block w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={currentCourse.mode}
                      onChange={(e) => setCurrentCourse({...currentCourse, mode: e.target.value as any})}
                    >
                      <option value="online">Online</option>
                      <option value="home">Home</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  
                  <Input
                    label="Fee ($)"
                    type="number"
                    min="0"
                    required
                    value={currentCourse.fee}
                    onChange={(e) => setCurrentCourse({...currentCourse, fee: Number(e.target.value)})}
                  />
                </div>

                {currentCourse.mode !== 'online' && (
                  <Input
                    label="City"
                    placeholder="e.g. New York (Required for Home tutoring)"
                    value={currentCourse.city || ''}
                    onChange={(e) => setCurrentCourse({...currentCourse, city: e.target.value})}
                    required={currentCourse.mode === 'home'}
                  />
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md shadow-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                    rows={3}
                    placeholder="Brief description of what you will cover in this course..."
                    value={currentCourse.description || ''}
                    onChange={(e) => setCurrentCourse({...currentCourse, description: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3 justify-end">
                <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" isLoading={isSubmitting}>
                  Save Course
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(TutorCoursesPage, ['tutor']);
