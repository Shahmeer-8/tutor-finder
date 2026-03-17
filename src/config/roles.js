const allRoles = {
  student: [],
  tutor: ['manageSessions'],
  admin: ['getUsers', 'manageUsers', 'manageSessions', 'manageSystem'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
