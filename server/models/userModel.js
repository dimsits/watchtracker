const prisma = require("../db/prisma");

async function getAllUsers() {
  return await prisma.user.findMany();
}

async function getUserById(userId) {
  return await prisma.user.findUnique({
    where: { user_id: userId },
  });
}

async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email: email },
  });
}

async function getUserbyUsername(username) {
  return await prisma.user.findUnique({
    where: { username: username },
  });
}
 
async function createUser(data) {
  return await prisma.user.create({ data });
}

async function updateUser(userId, data) {
  return prisma.user.update({
    where: { user_id: userId },
    data,
  });
}

async function deleteUser(userId) {
  return prisma.user.delete({
    where: { user_id: userId },
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};