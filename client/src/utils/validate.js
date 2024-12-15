// utils/validate.js

/**
 * Validates login inputs.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Object} errors - An object containing error messages for invalid fields.
 */
export const validateLogin = (email, password) => {
    const errors = {};
  
    // Email validation
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Email address is invalid.";
    }
  
    // Password validation
    if (!password) {
      errors.password = "Password is required.";
    }
  
    return errors;
  };
  
  /**
   * Validates registration inputs.
   * @param {Object} formData - The user's registration form data.
   * @param {string} formData.name - The user's full name.
   * @param {string} formData.username - The user's username.
   * @param {string} formData.email - The user's email address.
   * @param {string} formData.password - The user's password.
   * @param {string} formData.confirmPassword - The user's password confirmation.
   * @returns {Object} errors - An object containing error messages for invalid fields.
   */
  export const validateRegister = ({ name, username, email, password, confirmPassword }) => {
    const errors = {};
  
    // Name validation
    if (!name) {
      errors.name = "Name is required.";
    } else if (name.length < 2) {
      errors.name = "Name must be at least 2 characters long.";
    }
  
    // Username validation
    if (!username) {
      errors.username = "Username is required.";
    } else if (username.length < 3) {
      errors.username = "Username must be at least 3 characters long.";
    }
  
    // Email validation
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Email address is invalid.";
    }
  
    // Password validation
    if (!password) {
      errors.password = "Password is required.";
    } else {
      if (password.length < 6) {
        errors.password = "Password must be at least 6 characters long.";
      }
      if (!/\d/.test(password)) {
        errors.password = "Password must contain at least one number.";
      }
    }
  
    // Confirm Password validation
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }
  
    return errors;
  };
  