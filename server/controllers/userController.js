const bcrypt = require('bcryptjs');
const { getUserById, getUserByEmail, updateUser } = require('../models/userModel');

// This function allows a user to update their profile info
// The request must be authenticated and user_id should come from req.user (from the auth middleware)
async function editUserProfile(req, res) {
  const { user_id } = req.user; // This is set by authMiddleware
  const { username, name, email, currentPassword, newPassword } = req.body;

  try {
    // Fetch current user from DB to compare passwords if needed
    const currentUser = await getUserById(user_id);
    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prepare an object to hold updates
    const updates = {};

    // Optional fields to update
    if (username) updates.username = username;
    if (name) updates.name = name;
    if (email) {
      // Check if the email is already taken by someone else
      const existingUser = await getUserByEmail(email);
      if (existingUser && existingUser.user_id !== user_id) {
        return res.status(400).json({ error: 'Email is already in use by another user' });
      }
      updates.email = email;
    }

    // Handle password change if requested
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ error: 'Current password is required to change password' });
      }
      
      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, currentUser.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }

      // Hash new password before saving
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updates.password = hashedPassword;
    }

    // If no updates were provided
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No updates provided' });
    }

    // Perform update
    const updatedUser = await updateUser(user_id, updates);

    // Return the updated user info without the password field
    const { password, ...userDataWithoutPassword } = updatedUser;

    return res.status(200).json({
      message: 'User updated successfully',
      user: userDataWithoutPassword
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update user profile' });
  }
}

module.exports = { editUserProfile };
