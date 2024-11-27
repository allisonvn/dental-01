// Role-Based Access Control (RBAC) configuration
const roles = {
  superAdmin: 'superAdmin',
  userPro: 'userPro',
  userBasic: 'userBasic',
  dentist: 'dentist',
  receptionist: 'receptionist',
};

const permissions = {
  // User Management
  manageUsers: 'manageUsers',
  viewUsers: 'viewUsers',
  
  // Patient Management
  managePatients: 'managePatients',
  viewPatients: 'viewPatients',
  
  // Appointment Management
  manageAppointments: 'manageAppointments',
  viewAppointments: 'viewAppointments',
  
  // Financial Management
  manageFinances: 'manageFinances',
  viewFinances: 'viewFinances',
  
  // Inventory Management
  manageInventory: 'manageInventory',
  viewInventory: 'viewInventory',
  
  // Reports
  generateReports: 'generateReports',
  viewReports: 'viewReports',
  
  // Settings
  manageSettings: 'manageSettings',
  viewSettings: 'viewSettings',
};

const rolePermissions = {
  [roles.superAdmin]: Object.values(permissions),
  [roles.userPro]: [
    permissions.managePatients,
    permissions.viewPatients,
    permissions.manageAppointments,
    permissions.viewAppointments,
    permissions.manageFinances,
    permissions.viewFinances,
    permissions.manageInventory,
    permissions.viewInventory,
    permissions.generateReports,
    permissions.viewReports,
    permissions.viewSettings,
  ],
  [roles.userBasic]: [
    permissions.viewPatients,
    permissions.manageAppointments,
    permissions.viewAppointments,
    permissions.viewFinances,
    permissions.viewInventory,
    permissions.viewReports,
  ],
  [roles.dentist]: [
    permissions.viewPatients,
    permissions.manageAppointments,
    permissions.viewAppointments,
    permissions.viewInventory,
    permissions.generateReports,
  ],
  [roles.receptionist]: [
    permissions.viewPatients,
    permissions.manageAppointments,
    permissions.viewAppointments,
    permissions.viewFinances,
  ],
};

export function hasPermission(userRole, permission) {
  if (!userRole || !permission) return false;
  return rolePermissions[userRole]?.includes(permission) || false;
}

export function getUserPermissions(userRole) {
  return rolePermissions[userRole] || [];
}

export { roles, permissions };