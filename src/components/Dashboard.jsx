
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error during logout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ToDo Application</h1>
              <p className="text-gray-600 mt-1">Welcome back, <span className="font-semibold text-indigo-600">{user?.username}</span>!</p>
            </div>
            <button 
              onClick={handleLogout}
              disabled={loading}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:transform-none shadow-lg"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Logging out...
                </div>
              ) : (
                'Logout'
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tasks Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Tasks</h2>
              
              {/* Tasks Placeholder */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 p-12 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks yet</h3>
                <p className="text-gray-500 mb-6">Create your first task to get started!</p>
                <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Create Task
                </button>
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Total Tasks */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-bold text-indigo-600 mb-2">0</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Tasks</div>
              </div>

              {/* Completed Tasks */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-bold text-green-600 mb-2">0</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Completed</div>
              </div>

              {/* Pending Tasks */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-bold text-orange-500 mb-2">0</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Pending</div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-lg py-2 px-4 text-sm font-medium transition-all duration-300">
                    View All Tasks
                  </button>
                  <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-lg py-2 px-4 text-sm font-medium transition-all duration-300">
                    Filter Tasks
                  </button>
                  <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-lg py-2 px-4 text-sm font-medium transition-all duration-300">
                    Export Tasks
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;