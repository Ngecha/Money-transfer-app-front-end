import { useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const useAuth = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const handleLogin = useCallback(
    async (email, password) => {
      try {
        await auth.login(email, password);
        navigate('/dashboard');
      } catch (error) {
        console.error('Login failed:', error.message || error);
        throw error;
      }
    },
    [auth, navigate]
  );

  const handleRegister = useCallback(
    async (userData) => {
      try {
        await auth.register(userData);
        navigate('/dashboard');
      } catch (error) {
        console.error('Registration failed:', error.message || error);
        throw error;
      }
    },
    [auth, navigate]
  );

  const handleLogout = useCallback(() => {
    auth.logout();
    navigate('/', { replace: true }); // Replace avoids adding to history
  }, [auth, navigate]);

  const handleUpdateProfile = useCallback(
    async (profileData) => {
      try {
        await auth.updateProfile(profileData);
        return true;
      } catch (error) {
        console.error('Profile update failed:', error.message || error);
        throw error;
      }
    },
    [auth]
  );

  const handlePasswordReset = useCallback(
    async (email) => {
      try {
        await auth.resetPassword(email);
        return true;
      } catch (error) {
        console.error('Password reset failed:', error.message || error);
        throw error;
      }
    },
    [auth]
  );

  const checkAuth = useCallback(() => {
    if (!auth.isAuthenticated) {
      navigate('/login', { state: { from: window.location.pathname } });
      return false;
    }
    return true;
  }, [auth.isAuthenticated, navigate]);

  const getAuthHeaders = useCallback(() => {
    return {
      Authorization: `Bearer ${auth.token}`, // Fixed template literal syntax
      'Content-Type': 'application/json',
    };
  }, [auth.token]);

  return {
    // State
    user: auth.user,
    token: auth.token,
    loading: auth.loading,
    error: auth.error,
    isAuthenticated: auth.isAuthenticated,

    // Methods
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    resetPassword: handlePasswordReset,
    checkAuth,
    getAuthHeaders,

    // Utility methods
    isAdmin: () => auth.user?.role === 'admin',
    hasPermission: (permission) => auth.user?.permissions?.includes(permission),
  };
};

export default useAuth;
