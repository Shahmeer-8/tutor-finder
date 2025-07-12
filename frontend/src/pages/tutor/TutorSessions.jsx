import { useState } from 'react';
import { Calendar, Clock, BookOpen, Star, Filter, Search, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const TutorSessions = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const sessions = [
    {
      id: 1,
      student: 'John Smith',
      subject: 'Mathematics',
      date: '2024-01-20',
      time: '10:00 AM',
      duration: 60,
      status: 'upcoming',
      fee: 35,
      notes: 'Algebra review session',
      studentAvatar: 'JS'
    },
    {
      id: 2,
      student: 'Emma Davis',
      subject: 'Physics',
      date: '2024-01-19',
      time: '2:00 PM',
      duration: 90,
      status: 'completed',
      fee: 52.5,
      rating: 5,
      review: 'Excellent session! Very clear explanations.',
      studentAvatar: 'ED'
    },
    {
      id: 3,
      student: 'Michael Brown',
      subject: 'Chemistry',
      date: '2024-01-18',
      time: '4:00 PM',
      duration: 60,
      status: 'completed',
      fee: 35,
      rating: 4,
      review: 'Good session, helped me understand organic chemistry better.',
      studentAvatar: 'MB'
    },
    {
      id: 4,
      student: 'Sophie Wilson',
      subject: 'Mathematics',
      date: '2024-01-17',
      time: '11:00 AM',
      duration: 60,
      status: 'cancelled',
      fee: 0,
      notes: 'Student cancelled due to illness',
      studentAvatar: 'SW'
    },
    {
      id: 5,
      student: 'Alex Johnson',
      subject: 'Physics',
      date: '2024-01-21',
      time: '3:00 PM',
      duration: 60,
      status: 'upcoming',
      fee: 35,
      notes: 'Mechanics and motion problems',
      studentAvatar: 'AJ'
    },
    {
      id: 6,
      student: 'Lisa Chen',
      subject: 'Chemistry',
      date: '2024-01-16',
      time: '1:00 PM',
      duration: 75,
      status: 'completed',
      fee: 43.75,
      rating: 5,
      review: 'Amazing tutor! Made chemistry fun and easy to understand.',
      studentAvatar: 'LC'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Sessions', count: sessions.length },
    { id: 'upcoming', label: 'Upcoming', count: sessions.filter(s => s.status === 'upcoming').length },
    { id: 'completed', label: 'Completed', count: sessions.filter(s => s.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: sessions.filter(s => s.status === 'cancelled').length }
  ];

  const filteredSessions = sessions.filter(session => {
    const matchesFilter = activeFilter === 'all' || session.status === activeFilter;
    const matchesSearch = session.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'upcoming':
        return <Clock className="text-blue-500" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <AlertCircle className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'upcoming':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'cancelled':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-tertiary">Sessions</h2>
          <p className="text-gray-30">Manage your tutoring sessions</p>
        </div>
        
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 text-gray-30" size={16} />
          <input
            type="text"
            placeholder="Search students or subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === filter.id
                ? 'bg-secondary text-tertiary'
                : 'text-gray-50 hover:bg-gray-10'
            }`}
          >
            <Filter size={16} />
            {filter.label}
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeFilter === filter.id ? 'bg-tertiary text-white' : 'bg-gray-10 text-gray-30'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="mx-auto text-gray-20 mb-4" size={48} />
            <h3 className="text-lg font-medium text-tertiary mb-2">No sessions found</h3>
            <p className="text-gray-30">
              {searchTerm ? 'Try adjusting your search terms.' : 'Your sessions will appear here.'}
            </p>
          </div>
        ) : (
          filteredSessions.map((session) => (
            <div key={session.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-10 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Student Avatar */}
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-tertiary font-semibold">
                    {session.studentAvatar}
                  </div>

                  {/* Session Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-tertiary">{session.student}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border capitalize ${getStatusColor(session.status)}`}>
                        {session.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-gray-50 mb-3">
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} />
                        {session.subject}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {formatDate(session.date)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        {session.time} ({session.duration}min)
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-medium">${session.fee}</span>
                      </div>
                    </div>

                    {/* Notes or Review */}
                    {session.notes && (
                      <p className="text-sm text-gray-30 mb-2">
                        <strong>Notes:</strong> {session.notes}
                      </p>
                    )}

                    {session.review && (
                      <div className="bg-gray-10/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} fill={i < (session.rating || 0) ? "currentColor" : "none"} />
                            ))}
                          </div>
                          <span className="text-xs text-gray-30">Student Review</span>
                        </div>
                        <p className="text-sm text-tertiary italic">"{session.review}"</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Icon */}
                <div className="ml-4">
                  {getStatusIcon(session.status)}
                </div>
              </div>

              {/* Action Buttons */}
              {session.status === 'upcoming' && (
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-10">
                  <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-deep text-white rounded-lg font-medium hover:bg-deep/90 transition-colors">
                    Start Session
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-10">
        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-10">
          <p className="text-2xl font-bold text-green-600">
            {sessions.filter(s => s.status === 'completed').length}
          </p>
          <p className="text-sm text-gray-30">Completed Sessions</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-10">
          <p className="text-2xl font-bold text-blue-600">
            {sessions.filter(s => s.status === 'upcoming').length}
          </p>
          <p className="text-sm text-gray-30">Upcoming Sessions</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-10">
          <p className="text-2xl font-bold text-tertiary">
            ${sessions.reduce((sum, s) => sum + s.fee, 0)}
          </p>
          <p className="text-sm text-gray-30">Total Earnings</p>
        </div>
      </div>
    </div>
  );
};

export default TutorSessions;