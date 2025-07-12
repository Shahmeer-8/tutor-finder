import  { useState } from 'react';
import { Camera, Save, Edit, MapPin, Mail, Calendar, DollarSign, BookOpen, Award } from 'lucide-react';

const TutorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // For storing image preview
  
  // dummy formData 😁

  const [formData, setFormData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    dateOfBirth: '1990-05-15',
    joinedDate: '2022-03-10',
    country: 'United States',
    city: 'New York',
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    hourlyRate: '35',
    about: 'Passionate mathematics tutor with over 5 years of experience helping students achieve their academic goals. I specialize in making complex concepts easy to understand through interactive teaching methods.',
    qualifications: [
      'Master of Science in Mathematics - NYU (2018)',
      'Bachelor of Education - Columbia University (2016)',
      'Certified Mathematics Teacher - NY State (2016)'
    ],
    experience: '5',
    languages: ['English', 'Spanish'],
    availability: 'Monday-Friday, 9 AM - 6 PM'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saving profile data:', formData);
    if(profileImage) {
      console.log('Profile Image:', profileImage);
    }
  };

  // Image upload handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const addSubject = () => {
    const newSubject = prompt('Enter a new subject:');
    if (newSubject && !formData.subjects.includes(newSubject)) {
      handleInputChange('subjects', [...formData.subjects, newSubject]);
    }
  };

  const removeSubject = (subject) => {
    handleInputChange('subjects', formData.subjects.filter(s => s !== subject));
  };

  const addQualification = () => {
    const newQualification = prompt('Enter a new qualification:');
    if (newQualification && !formData.qualifications.includes(newQualification)) {
      handleInputChange('qualifications', [...formData.qualifications, newQualification]);
    }
  };

  const removeQualification = (qualification) => {
    handleInputChange('qualifications', formData.qualifications.filter(q => q !== qualification));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-tertiary">Profile Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-tertiary rounded-lg font-medium hover:bg-secondary/90 transition-colors"
          >
            <Edit size={16} />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="flex items-start gap-6">
          {/* Profile Picture */}
          <div className="relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-tertiary text-2xl font-bold">
                {formData.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .toUpperCase()}
              </div>
            )}
            {isEditing && (
              <>
                <label
                  htmlFor="profileImageInput"
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-tertiary text-white rounded-full flex items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <Camera size={16} />
                </label>
                <input
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-tertiary mb-1">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              ) : (
                <p className="text-gray-50">{formData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-tertiary mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-50">
                  <Mail size={16} />
                  {formData.email}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-tertiary mb-1">Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-50">
                  <Calendar size={16} />
                  {new Date(formData.dateOfBirth).toLocaleDateString()}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-tertiary mb-1">Joined Date</label>
              <div className="flex items-center gap-2 text-gray-50">
                <Calendar size={16} />
                {new Date(formData.joinedDate).toLocaleDateString()}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-tertiary mb-1">Country</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-50">
                  <MapPin size={16} />
                  {formData.country}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-tertiary mb-1">City</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              ) : (
                <p className="text-gray-50">{formData.city}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Teaching Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-10">
        <h3 className="text-xl font-semibold text-tertiary mb-4">Teaching Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-tertiary mb-2">Subjects</label>
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {formData.subjects.map((subject, index) => (
                    <span key={index} className="px-3 py-1 bg-secondary text-tertiary rounded-full text-sm flex items-center gap-2">
                      {subject}
                      <button onClick={() => removeSubject(subject)} className="text-red-500 hover:text-red-700">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <button onClick={addSubject} className="text-sm text-deep hover:text-deep/80">
                  + Add Subject
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {formData.subjects.map((subject, index) => (
                  <span key={index} className="px-3 py-1 bg-secondary text-tertiary rounded-full text-sm">
                    {subject}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-tertiary mb-1">Hourly Rate</label>
            {isEditing ? (
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 text-gray-30" size={16} />
                <input
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-50">
                <DollarSign size={16} />
                ${formData.hourlyRate}/hour
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-tertiary mb-1">Experience (Years)</label>
            {isEditing ? (
              <input
                type="number"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full px-3 py-2 border border-gray-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            ) : (
              <div className="flex items-center gap-2 text-gray-50">
                <Award size={16} />
                {formData.experience} years
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-tertiary mb-1">Languages</label>
            {isEditing ? (
              <input
                type="text"
                value={Array.isArray(formData.languages) ? formData.languages.join(', ') : ''}
                onChange={(e) => handleInputChange('languages', e.target.value.split(',').map(lang => lang.trim()))}
                placeholder="English, Spanish, French..."
                className="w-full px-3 py-2 border border-gray-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            ) : (
              <p className="text-gray-50">{Array.isArray(formData.languages) ? formData.languages.join(', ') : ''}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-tertiary mb-1">Availability</label>
          {isEditing ? (
            <input
              type="text"
              value={formData.availability}
              onChange={(e) => handleInputChange('availability', e.target.value)}
              className="w-full px-3 py-2 border border-gray-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          ) : (
            <p className="text-gray-50">{formData.availability}</p>
          )}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-10">
        <h3 className="text-xl font-semibold text-tertiary mb-4">About Me</h3>
        {isEditing ? (
          <textarea
            value={formData.about}
            onChange={(e) => handleInputChange('about', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            placeholder="Tell students about yourself, your teaching style, and experience..."
          />
        ) : (
          <p className="text-gray-50 leading-relaxed">{formData.about}</p>
        )}
      </div>

      {/* Qualifications */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-10">
        <h3 className="text-xl font-semibold text-tertiary mb-4">Qualifications</h3>
        {isEditing ? (
          <div className="space-y-2">
            {formData.qualifications.map((qualification, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-10/30 rounded-lg">
                <span className="text-gray-50">{qualification}</span>
                <button onClick={() => removeQualification(qualification)} className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </div>
            ))}
            <button onClick={addQualification} className="text-sm text-deep hover:text-deep/80">
              + Add Qualification
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {formData.qualifications.map((qualification, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-10/30 rounded-lg">
                <BookOpen size={16} className="text-deep" />
                <span className="text-gray-50">{qualification}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-deep text-white rounded-lg font-medium hover:bg-deep/90 transition-colors"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default TutorProfile;
