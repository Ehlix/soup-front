type Card = {
  id: string;
  userId: string;
  title: string;
  description: string;
  urls: string[];
  createdAt?: string;
  updatedAt?: string;
};

type UserProfile = {
  id: string;
  userId: string;
  name: string;
  headline: string;
  avatar: string;
  site: string;
  bio: string;
}

type User = {
  id: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

type Res = Card & { user: User; userProfile: UserProfile };

type SignInParams = {
  email: string;
  password: string;
}

type AuthResponse = {
  accessToken: string;
  user: User;
};
