type SignInParams = {
  email: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
};

type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
