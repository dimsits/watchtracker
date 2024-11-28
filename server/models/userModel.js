const prisma = require("../db/prisma");

async function getAllUsers() {
  return await prisma.user.findMany();
}

async function getUserById(id) {
  return await prisma.user.findUnique({
    where: { id: Number(id) },
  });
}
 
async function createUser(data) {
  return await prisma.user.create({ data });
}
// Update a user by ID
async function updateUser(userId, data) {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
}

// Delete a user by ID
async function deleteUser(userId) {
  return prisma.user.delete({
    where: { id: userId },
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};