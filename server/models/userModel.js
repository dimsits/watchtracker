const prisma = require("../db/prisma");

async function getAllUsers() {
  return await prisma.user.findMany();
}

async function getUserById(id) {
  return await prisma.user.findUnique({
    where: { id: Number(id) },
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
    where: { id: userId },
    data,
  });
}

async function deleteUser(userId) {
  return prisma.user.delete({
    where: { id: userId },
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