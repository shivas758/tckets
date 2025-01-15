import React, { useState } from 'react';
import { Ticket, Clock, Users, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function RepresentativeForm({ user }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    movieName: '',
    showTime: '',
    ticketsSold: '',
    ticketPrice: ''
  });
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to the backend
    console.log({
      ...formData,
      theater: user.theater,
      city: user.city,
      date: new Date().toISOString(),
      totalAmount: Number(formData.ticketsSold) * Number(formData.ticketPrice)
    });
    
    // Clear form after submission
    setFormData({
      movieName: '',
      showTime: '',
      ticketsSold: '',
      ticketPrice: ''
    });
    setSubmissionMessage('Thank you for entering the data!');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleLogout = () => {
    // In a real app, this would clear user data
    localStorage.removeItem('user');
    console.log('User logged out');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Daily Collection Entry</h2>
              <div className="mt-2 text-sm text-gray-600">
                <p>{user.theater}</p>
                <p>{user.city}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Logout
            </button>
          </div>
          {submissionMessage && (
            <div className="bg-green-100 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm mb-4">
              {submissionMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="movieName" className="block text-sm font-medium text-gray-700">
                Movie Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ticket className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="movieName"
                  required
                  className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.movieName}
                  onChange={(e) => setFormData({ ...formData, movieName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="showTime" className="block text-sm font-medium text-gray-700">
                Show Time
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="time"
                  id="showTime"
                  required
                  className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.showTime}
                  onChange={(e) => setFormData({ ...formData, showTime: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="ticketsSold" className="block text-sm font-medium text-gray-700">
                Number of Tickets Sold
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="ticketsSold"
                  min="0"
                  required
                  className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.ticketsSold}
                  onChange={(e) => setFormData({ ...formData, ticketsSold: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700">
                Ticket Price (₹)
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="ticketPrice"
                  min="0"
                  required
                  className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.ticketPrice}
                  onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Collection Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RepresentativeForm;
