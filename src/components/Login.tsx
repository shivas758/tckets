import React, { useState } from 'react';
import { Phone, KeyRound } from 'lucide-react';

// Mock data for testing - this would come from your backend
const authorizedUsers = [
  { phone: "9999999999", type: "admin", name: "Admin User", city: null, theater: null },
  { phone: "8888888888", type: "representative", name: "Rajesh Kumar", city: "Mumbai", theater: "PVR Phoenix" },
  { phone: "7777777777", type: "representative", name: "Priya Singh", city: "Delhi", theater: "INOX Nehru Place" },
  { phone: "6666666666", type: "representative", name: "Arun Patel", city: "Bangalore", theater: "Cinepolis Forum" },
];

function Login({ onLogin }: { onLogin: (user: any) => void }) {
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = authorizedUsers.find(u => u.phone === phone);
    if (user) {
      setStep('otp');
      setError('');
      console.log('Sending OTP to', phone);
    } else {
      setError('Phone number not authorized');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '123456') {
      const user = authorizedUsers.find(u => u.phone === phone);
      localStorage.setItem('user', JSON.stringify(user));
      onLogin(user);
    } else {
      setError('Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <KeyRound className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Movie Theater Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === 'phone' ? 'Sign in with your phone number' : 'Enter the OTP sent to your phone'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <form className="mt-8 space-y-6" onSubmit={handlePhoneSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="relative">
                <label htmlFor="phone" className="sr-only">
                  Phone Number
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your 10-digit phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={10}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Get OTP
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleOtpSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="otp" className="sr-only">
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Change phone number
              </button>
              <button
                type="button"
                onClick={() => {
                  setOtp('');
                  console.log('Resending OTP to', phone);
                }}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Resend OTP
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
