'use client';

import React, { useState } from 'react';
import { useAuth, withAuth } from '../../../../context/AuthContext';
import { DashboardSidebar } from '../../../../components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/Card';
import { Input } from '../../../../components/ui/Input';
import { Button } from '../../../../components/ui/Button';

function TutorProfilePage() {
  const { user } = useAuth();
  
  // Mock state for profile update
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Experienced math tutor with 5 years of teaching high school students.',
    experience: 5,
    education: 'BSc in Mathematics, State University',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, you would call: await userService.updateProfile(formData)
      setSuccessMessage('Profile updated successfully.');
    } catch (err: any) {
      alert('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-gray-50">
      <DashboardSidebar role="tutor" />
      
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Public Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {successMessage && (
                  <div className="p-3 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm rounded-r animate-in fade-in">
                    {successMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    id="name"
                    name="name"
                    label="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />
                  
                  <Input
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={true} // Email usually requires verification to change
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    id="experience"
                    name="experience"
                    label="Years of Experience"
                    type="number"
                    min="0"
                    value={formData.experience}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  
                  <Input
                    id="education"
                    name="education"
                    label="Highest Education"
                    placeholder="e.g. BSc Computer Science"
                    value={formData.education}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Bio</label>
                  <textarea
                    name="bio"
                    className="w-full border border-gray-300 rounded-md shadow-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                    rows={5}
                    placeholder="Tell students about your teaching style, experience, and what makes you a great tutor..."
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <p className="mt-1 text-xs text-gray-500">This will be displayed on your public tutor card.</p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <Button type="submit" isLoading={isSubmitting}>
                    Save Profile
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default withAuth(TutorProfilePage, ['tutor']);
