
import { passwordAuthService } from './password';
import { emailAuthService } from './email';

export const authService = {
  // Password-related methods
  updatePasswordWithToken: passwordAuthService.updatePasswordWithToken,
  requestPasswordReset: passwordAuthService.requestPasswordReset,
  
  // Email-related methods
  resendConfirmationEmail: emailAuthService.resendConfirmationEmail,
  sendCustomConfirmationEmail: emailAuthService.sendCustomConfirmationEmail,
};
