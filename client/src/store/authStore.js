import { create } from 'zustand';
import axios from 'axios';

// Define the Zustand store
const useAuthStore = create((set) => ({
  user: null, // Initial user state
  isAuthenticated: false, // Authentication status
  loading: false, // To manage loading states
  error: null, // For error handling

  // Action to log in the user
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
  
      set({
        user: response.data,
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
      // Transform userDetails to match API requirements
      const payload = {
        name: userDetails.fullName, // Map `fullName` to `name`
        username: userDetails.username,
        email: userDetails.email,
        password: userDetails.password,
      };
  
      console.log('Sending payload to API:', payload); // Debug log
  
      const response = await axios.post('http://localhost:5000/api/auth/register', payload, {
        headers: {
          'Content-Type': 'application/json', // Ensure the correct content type
        },
      });
  
      console.log('API Response:', response.data); // Debug log
  
      set({
        user: response.data, // Update Zustand state with API response
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      console.error('Registration error:', error); // Debug log
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
      await axios.post('http:localhost:5000/api/auth/logout'); // Optionally call logout endpoint
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
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
      const response = await axios.get('/api/auth/session');
      set({
        user: response.data,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      console.error('Session fetch error:', error);
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },
}));

export default useAuthStore;
