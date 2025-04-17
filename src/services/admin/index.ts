
// Export all admin services from this central file
import { userService } from './userService';
import { planService } from './planService';
import { templateService } from './templateService';
import { dashboardService } from './dashboardService';

// Re-export as a unified adminService object
export const adminService = {
  // User related operations
  ...userService,
  
  // Plans related operations
  ...planService,
  
  // Templates related operations
  ...templateService,
  
  // Dashboard related operations
  ...dashboardService
};
