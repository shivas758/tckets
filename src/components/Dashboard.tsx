import React, { useState } from 'react';
import { 
  BarChart3, 
  Ticket, 
  DollarSign, 
  Users, 
  Calendar,
  Search,
  ChevronDown,
  LogOut,
  Upload,
  Download,
  UserPlus
} from 'lucide-react';

// Mock data
const recentSales = [
  { id: 1, movie: "Pathaan", time: "20:30", amount: 1500, tickets: 3, date: "2024-03-15" },
  { id: 2, movie: "Animal", time: "18:45", amount: 2000, tickets: 4, date: "2024-03-15" },
  { id: 3, movie: "Jawan", time: "21:00", amount: 1000, tickets: 2, date: "2024-03-14" },
  { id: 4, movie: "Dunki", time: "19:15", amount: 2500, tickets: 5, date: "2024-03-14" },
];

const representatives = [
  { name: "Rajesh Kumar", phone: "8888888888", city: "Mumbai", theater: "PVR Phoenix" },
  { name: "Priya Singh", phone: "7777777777", city: "Delhi", theater: "INOX Nehru Place" },
  { name: "Arun Patel", phone: "6666666666", city: "Bangalore", theater: "Cinepolis Forum" },
];

function Dashboard({ user }) {
  const [showAddRepModal, setShowAddRepModal] = useState(false);
  const [showRepList, setShowRepList] = useState(false);

  const downloadTemplate = () => {
    // In a real app, this would download an Excel template
    const template = `Name,Phone,City,Theater
John Doe,9876543210,Mumbai,PVR Juhu
Jane Smith,9876543211,Delhi,PVR Select Citywalk`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'representatives_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Movie Theater Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">
                {user.type === 'admin' ? 'Admin Dashboard' : `${user.theater} - ${user.city}`}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {user.type === 'admin' && (
                <button
                  onClick={() => setShowAddRepModal(true)}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Add Representatives</span>
                </button>
              )}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <span>This Week</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Revenue"
            value="₹1,24,260"
            icon={<DollarSign className="h-6 w-6" />}
            trend="+12.5%"
            positive={true}
          />
          <StatsCard
            title="Tickets Sold"
            value="1,245"
            icon={<Ticket className="h-6 w-6" />}
            trend="+8.2%"
            positive={true}
          />
          <StatsCard
            title="Average Occupancy"
            value="76%"
            icon={<Users className="h-6 w-6" />}
            trend="-2.4%"
            positive={false}
          />
          <StatsCard
            title="Shows Today"
            value="24"
            icon={<Calendar className="h-6 w-6" />}
            trend="+4"
            positive={true}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[65, 45, 75, 55, 85, 35, 95].map((height, i) => (
                <div key={i} className="w-full">
                  <div 
                    className="bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm text-gray-600">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Popular Movies</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="space-y-4">
              {[
                { name: "Pathaan", sales: 284, percent: 85 },
                { name: "Animal", sales: 246, percent: 75 },
                { name: "Jawan", sales: 185, percent: 55 },
                { name: "Dunki", sales: 152, percent: 45 },
              ].map((movie, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{movie.name}</span>
                    <span className="font-medium">{movie.sales} tickets</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 rounded-full h-2"
                      style={{ width: `${movie.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Sales Table */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Sales</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 bg-gray-50">
                  <th className="px-6 py-3 font-medium">Movie</th>
                  <th className="px-6 py-3 font-medium">Time</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Tickets</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentSales.map((sale) => (
                  <tr key={sale.id} className="text-sm text-gray-900">
                    <td className="px-6 py-4">{sale.movie}</td>
                    <td className="px-6 py-4">{sale.time}</td>
                    <td className="px-6 py-4">₹{sale.amount}</td>
                    <td className="px-6 py-4">{sale.tickets}</td>
                    <td className="px-6 py-4">{sale.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Representatives Modal */}
      {showAddRepModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Add Representatives</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Download Template</h4>
                  <p className="text-sm text-gray-600">Get the Excel template for bulk upload</p>
                </div>
                <button
                  onClick={downloadTemplate}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Drag and drop your Excel file here</p>
                  <p className="text-xs text-gray-500">or</p>
                  <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm">
                    Browse files
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowRepList(!showRepList)}
                className="w-full text-left text-sm text-blue-600 hover:text-blue-700"
              >
                View current representatives
              </button>

              {showRepList && (
                <div className="mt-4 border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Phone</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">City</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {representatives.map((rep, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm">{rep.name}</td>
                          <td className="px-4 py-2 text-sm">{rep.phone}</td>
                          <td className="px-4 py-2 text-sm">{rep.city}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddRepModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle upload logic here
                  setShowAddRepModal(false);
                }}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatsCard({ title, value, icon, trend, positive }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
          {icon}
        </div>
      </div>
      <div className={`mt-4 text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {trend} from last week
      </div>
    </div>
  );
}

export default Dashboard;