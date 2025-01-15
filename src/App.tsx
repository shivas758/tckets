import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RepresentativeForm from './components/RepresentativeForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (user: any) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : currentUser.type === 'admin' ? (
        <Dashboard user={currentUser} />
      ) : (
        <RepresentativeForm user={currentUser} />
      )}
    </div>
  );
}

export default App;
