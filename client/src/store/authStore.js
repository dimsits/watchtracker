import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // Initial user state
      token: null, // Token stored in memory
      isAuthenticated: false, // Authentication status
      loading: false, // To manage loading states
      error: null, // For error handling

      // Action to register a new user
      register: async (registrationData) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post('http://localhost:5000/api/auth/register', registrationData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const token = response.data.token; // Assuming the API returns a token
          set({
            user: response.data.user, // Assuming response includes user details
            token,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          console.error('Registration error:', error);
          set({
            error: error.response?.data?.message || 'Registration failed',
            loading: false,
          });
          throw new Error(error.response?.data?.message || 'Registration failed');
        }
      },

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

          const token = response.data.token; // Assuming the API returns a token
          set({
            user: response.data.user, // Assuming response includes user details
            token,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          console.log('Login error:', error);
          set({
            error: error.response?.data?.message || 'Login failed',
            loading: false,
          });

          throw new Error(error.response?.data?.message || 'Login failed');
        }
      },

      // Action to log out the user
      logout: async () => {
        set({ loading: true, error: null });
        try {
          await axios.post('http://localhost:5000/api/auth/logout', {}, {
            headers: {
              Authorization: `Bearer ${useAuthStore.getState().token}`,
            },
          });

          set({
            user: null,
            token: null, // Clear the token from memory
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
          const token = useAuthStore.getState().token;
          if (!token) {
            throw new Error('No authentication token found');
          }

          const response = await axios.get('http://localhost:5000/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token in Authorization header
            },
          });

          set({
            user: response.data.user, // Assuming API returns the user in `response.data.user`
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          console.error('Session fetch error:', error);
          set({
            user: null,
            token: null, // Clear the token from memory
            isAuthenticated: false,
            loading: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage', // Key for localStorage
      getStorage: () => localStorage, // Use localStorage to persist the store
    }
  )
);

export default useAuthStore;
