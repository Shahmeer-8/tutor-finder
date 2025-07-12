import { BookOpen, Users, Star, TrendingUp, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

const TutorDashboard = () => {
  const stats = [
    {
      title: 'Total Sessions',
      value: '234',
      change: '+12%',
      changeType: 'positive',
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Students',
      value: '42',
      change: '+5%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      changeType: 'positive',
      icon: Star,
      color: 'bg-yellow-500'
    },
    {
      title: 'Monthly Earnings',
      value: '$2,840',
      change: '+18%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  const recentSessions = [
    {
      id: 1,
      student: 'John Smith',
      subject: 'Mathematics',
      date: '2024-01-15',
      time: '2:00 PM',
      status: 'completed',
      rating: 5
    },
    {
      id: 2,
      student: 'Emma Davis',
      subject: 'Physics',
      date: '2024-01-15',
      time: '4:00 PM',
      status: 'upcoming',
      rating: null
    },
    {
      id: 3,
      student: 'Michael Brown',
      subject: 'Chemistry',
      date: '2024-01-14',
      time: '10:00 AM',
      status: 'completed',
      rating: 4
    },
    {
      id: 4,
      student: 'Sophie Wilson',
      subject: 'Mathematics',
      date: '2024-01-14',
      time: '3:00 PM',
      status: 'cancelled',
      rating: null
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      student: 'Emma Davis',
      subject: 'Physics',
      date: '2024-01-16',
      time: '10:00 AM'
    },
    {
      id: 2,
      student: 'Alex Johnson',
      subject: 'Mathematics',
      date: '2024-01-16',
      time: '2:00 PM'
    },
    {
      id: 3,
      student: 'Lisa Chen',
      subject: 'Chemistry',
      date: '2024-01-17',
      time: '11:00 AM'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'upcoming':
        return <Clock className="text-blue-500" size={16} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-gray-400" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'upcoming':
        return 'text-blue-600 bg-blue-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-10 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <IconComponent className="text-white" size={24} />
                </div>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-tertiary mb-1">{stat.value}</h3>
              <p className="text-gray-30 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sessions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-tertiary">Recent Sessions</h2>
            <Calendar size={20} className="text-gray-30" />
          </div>
          <div className="space-y-4">
            {recentSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-gray-10/30 rounded-lg hover:bg-gray-10/50 transition-colors">
                <div className="flex items-center gap-3">
                  {getStatusIcon(session.status)}
                  <div>
                    <p className="font-medium text-tertiary">{session.student}</p>
                    <p className="text-sm text-gray-30">{session.subject}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-tertiary">{session.date}</p>
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-xs text-gray-30">{session.time}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-tertiary">Upcoming Sessions</h2>
            <Clock size={20} className="text-gray-30" />
          </div>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-secondary/70 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-deep rounded-full"></div>
                  <div>
                    <p className="font-medium text-tertiary">{session.student}</p>
                    <p className="text-sm text-gray-30">{session.subject}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-tertiary">{session.date}</p>
                  <p className="text-xs text-gray-30">{session.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-secondary text-tertiary rounded-lg font-medium hover:bg-secondary/90 transition-colors">
            View All Sessions
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;