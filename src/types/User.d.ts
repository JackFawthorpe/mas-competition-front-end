type User = {
    id: string; // UUID identifier
    email: string;
    teamid?: string;
};

type UserLogin = {
  email?: string
  password?: string
}