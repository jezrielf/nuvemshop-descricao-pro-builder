
import { planService } from './planService';
import { userService } from './userService';
import templateService from './templateService';
import { analyticsService } from './analyticsService';

// Export all admin services under one object
export const adminService = {
  plans: planService,
  users: userService,
  templates: templateService,
  analytics: analyticsService
};

export { planService, userService, templateService, analyticsService };
