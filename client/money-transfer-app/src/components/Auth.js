// Importing necessary modules from React and React Router
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Defining the Auth component that accepts mode and onClose as props
export default function Auth({ mode = 'login', onClose }) {
  // State hooks to manage form fields and form mode (login or signup)
  const [formMode, setFormMode] = useState(mode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation after login/signup

  // Function to handle user registration
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevents form from refreshing the page
    if (password !== confirmPassword) { // Checks if passwords match
      setError("Passwords do not match");
      return;
    }

    try {
      // Sending POST request to register endpoint with user data
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: name,
          email,
          password,
          phone_number: phone
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }
      alert('Registration successful');
      navigate('/dashboard'); // Redirects user to dashboard on success
      onClose(); // Closes the modal
    } catch (error) {
      // Sets error message if registration fails
      setError(error.message);
    }
  };

  // Function to handle user login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents form from refreshing the page

    try {
      // Sending POST request to login endpoint with login data
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginIdentifier,
          password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      alert('Login successful');
      navigate('/dashboard'); // Redirects user to dashboard on success
      onClose(); // Closes the modal
    } catch (error) {
      // Sets error message if login fails
      setError(error.message);
    }
  };

  // Function to toggle between login and signup forms
  const toggleFormMode = () => {
    setFormMode((prevMode) => (prevMode === 'signup' ? 'login' : 'signup'));
    // Resets form fields and error message
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    setLoginIdentifier('');
    setError('');
  };

  // Returning JSX for the modal form based on form mode (login/signup)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        {error && <p className="text-red-500">{error}</p>} {/* Displays error if exists */}
        <h2 className="text-2xl font-bold mb-4">{formMode === 'signup' ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={formMode === 'signup' ? handleRegister : handleLogin}>
          {formMode === 'signup' && (
            <>
              {/* Signup fields */}
              <input
                type="text"
                placeholder="Name"
                className="mb-4 w-full p-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="mb-4 w-full p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="mb-4 w-full p-2 border rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="mb-4 w-full p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="mb-4 w-full p-2 border rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </>
          )}
          {formMode === 'login' && (
            <>
              {/* Login fields */}
              <input
                type="text"
                placeholder="Email or Username"
                className="mb-4 w-full p-2 border rounded"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="mb-4 w-full p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {formMode === 'signup' ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          {/* Link to toggle between login and signup */}
          {formMode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <button onClick={toggleFormMode} className="text-blue-500 underline">
                Login
              </button>
            </p>
          ) : (
            <p>
              Don’t have an account?{' '}
              <button onClick={toggleFormMode} className="text-blue-500 underline">
                Sign Up
              </button>
            </p>
          )}
        </div>

        {/* Close button for the modal */}
        <button onClick={onClose} className="mt-4 text-red-500">
          Cancel
        </button>
      </div>
    </div>
  );
}
