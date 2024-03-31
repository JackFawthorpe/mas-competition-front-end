
type User = {
    id: string; // UUID identifier
    email: string;
    teamid?: string;
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