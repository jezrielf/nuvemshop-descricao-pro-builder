
import planService from './planService';
import userService from './userService';
import templateService from './templateService';
import analyticsService from './analyticsService';

// Export all admin services under one object
export const adminService = {
  ...planService,
  ...userService,
  ...templateService,
  ...analyticsService
};
