
import { basicAuthService } from './basic';
import { passwordAuthService } from './password';
import { emailAuthService } from './email';

export const authService = {
  // Basic auth methods
  signIn: basicAuthService.signIn,
  signUp: basicAuthService.signUp,
  signOut: basicAuthService.signOut,
  verifyEmail: basicAuthService.verifyEmail,
  checkEmailConfirmationStatus: basicAuthService.checkEmailConfirmationStatus,
  
  // Password-related methods
  updatePasswordWithToken: passwordAuthService.updatePasswordWithToken,
  requestPasswordReset: passwordAuthService.requestPasswordReset,
  
  // Email-related methods
  resendConfirmationEmail: emailAuthService.resendConfirmationEmail,
  sendCustomConfirmationEmail: emailAuthService.sendCustomConfirmationEmail,
};
