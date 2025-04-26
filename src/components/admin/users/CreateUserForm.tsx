
// Add onUserCreated to the props interface at the top of the file
export interface CreateUserFormProps {
  onUserCreated: () => Promise<void>;
}
