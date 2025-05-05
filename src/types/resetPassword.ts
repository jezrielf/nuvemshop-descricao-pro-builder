
// Define types for password reset
export type ResetPasswordStatus = 'verifying' | 'ready' | 'submitting' | 'success' | 'error';

export interface ResetPasswordFormProps {
  onSubmit: (password: string) => Promise<void>;
  errorMessage: string;
  isSubmitting: boolean;
}

export interface ResetSuccessProps {
  countdown: number;
  onRedirect: () => void;
}

export interface ResetErrorProps {
  errorMessage: string;
  onRedirect: () => void;
}
