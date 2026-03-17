'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  
  // Tutor specific dynamic fields
  const [tutorData, setTutorData] = useState({
    cities: '',
    subjects: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTutorDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTutorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password.length < 8 || !/\d/.test(formData.password) || !/[a-zA-Z]/.test(formData.password)) {
      setError('Password must be at least 8 characters long and contain both letters and numbers');
      return;
    }

    setIsLoading(true);

    try {
      // Format payload based on role
      const payload: any = { ...formData };
      
      if (formData.role === 'tutor') {
        // Convert comma separated strings to arrays
        payload.cities = tutorData.cities.split(',').map(c => c.trim()).filter(Boolean);
        payload.subjects = tutorData.subjects.split(',').map(s => s.trim()).filter(Boolean);
      }

      const response = await authService.signup(payload);
      
      // Auto-login after successful signup
      login(response.user);
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
              Create an account
            </CardTitle>
            <p className="text-sm text-gray-500">
              Join TutorFinder today and start learning
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r animate-in fade-in zoom-in-95">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                {/* Role Selection */}
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button
                    type="button"
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                      formData.role === 'student' 
                        ? 'bg-white shadow-sm text-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setFormData({ ...formData, role: 'student' })}
                  >
                    I am a Student
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                      formData.role === 'tutor' 
                        ? 'bg-white shadow-sm text-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setFormData({ ...formData, role: 'tutor' })}
                  >
                    I am a Tutor
                  </button>
                </div>

                <Input
                  id="name"
                  name="name"
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />

                <Input
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />
                
                <Input
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />

                {/* Dynamic fields for Tutor */}
                {formData.role === 'tutor' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Tutor Details</p>
                      
                      <div className="space-y-4">
                        <Input
                          id="cities"
                          name="cities"
                          label="Cities (Comma separated)"
                          type="text"
                          placeholder="New York, Online"
                          value={tutorData.cities}
                          onChange={handleTutorDataChange}
                          disabled={isLoading}
                          required={formData.role === 'tutor'}
                        />
                        
                        <Input
                          id="subjects"
                          name="subjects"
                          label="Subjects (Comma separated)"
                          type="text"
                          placeholder="Math, Physics, English"
                          value={tutorData.subjects}
                          onChange={handleTutorDataChange}
                          disabled={isLoading}
                          required={formData.role === 'tutor'}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full mt-6" 
                isLoading={isLoading}
              >
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center bg-transparent border-t-0 pb-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
