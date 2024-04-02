
type User = {
    id: string; // UUID identifier
    email: string;
    teamId?: string; // UUID identifier
};

type UserLogin = {
  email?: string
  password?: string
}

type ChangePasswordForm = {
  currentPassword?: string
  newPassword?: string,
  confirmPassword?: string
}