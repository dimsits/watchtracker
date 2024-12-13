import { create } from 'zustand';
import axios from 'axios';

// Define the Zustand store
const useAuthStore = create((set) => ({
  user: null, // Initial user state
  isAuthenticated: false, // Authentication status
  loading: false, // To manage loading states
  error: null, // For error handling

  // Action to log in the user
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const payload = {
        email: credentials.email,
        password: credentials.password,
      };

      const response = await axios.post('http://localhost:5000/api/auth/login', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Save token to localStorage or another secure storage
      const token = response.data.token; // Assuming the API returns a token
      localStorage.setItem('authToken', token);

      set({
        user: response.data.user, // Assuming response includes user details
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      console.error('Login error:', error);
      set({
        error: error.response?.data?.message || 'Login failed',
        loading: false,
      });

      // Explicitly throw the error so the calling code can handle it
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Action to register a user
  register: async (userDetails) => {
    set({ loading: true, error: null });
    try {
      const payload = {
        name: userDetails.fullName, // Map `fullName` to `name`
        username: userDetails.username,
        email: userDetails.email,
        password: userDetails.password,
      };

      const response = await axios.post('http://localhost:5000/api/auth/register', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Save token to localStorage or another secure storage
      const token = response.data.token; // Assuming the API returns a token
      localStorage.setItem('authToken', token);

      set({
        user: response.data.user, // Assuming response includes user details
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      console.error('Registration error:', error);
      set({
        error: error.response?.data?.message || 'Registration failed',
        loading: false,
      });
    }
  },

  // Action to log out the user
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
  
      localStorage.removeItem('authToken'); // Remove the token
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    } catch (error) {
      console.error('Logout failed:', error.response || error.message);
      set({
        error: error.response?.data?.message || 'Logout failed',
        loading: false,
      });
    }
  },
  

  // Action to fetch the authenticated user's session
  fetchSession: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('authToken'); // Retrieve token
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`, // Pass token in Authorization header
        },
      });

      set({
        user: response.data.user, // Assuming API returns the user in `response.data.user`
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      console.error('Session fetch error:', error);
      localStorage.removeItem('authToken'); // Clear token on failure
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },
}));

export default useAuthStore;
