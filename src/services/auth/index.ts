
import { basicAuthService } from './basic';
import { adminAuthService } from './admin';
import { emailAuthService } from './email';
import { passwordAuthService } from './password';

// Combine all the auth services into a single export
export const authService = {
  // Basic auth functions
  signIn: basicAuthService.signIn,
  signUp: basicAuthService.signUp,
  signOut: basicAuthService.signOut,
  verifyEmail: basicAuthService.verifyEmail,
  
  // Admin functions
  adminCreateUser: adminAuthService.createUser,
  updateUserRole: adminAuthService.updateUserRole,
  
  // Email functions
  sendCustomConfirmationEmail: emailAuthService.sendCustomConfirmationEmail,
  resendConfirmationEmail: emailAuthService.resendConfirmationEmail,
  
  // Password functions
  requestPasswordReset: passwordAuthService.requestPasswordReset,
  updatePasswordWithToken: passwordAuthService.updatePasswordWithToken,
};
