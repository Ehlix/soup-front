type Card = {
  id: string;
  userId: string;
  title: string;
  description: string;
  urls: string[];
  createdAt?: string;
  updatedAt?: string;
};

type User = {
  id: string;
  email: string;
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
  city: string;
  country: string;
  social?: {
    email?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

type UserWithProfile = User & { userProfile: UserProfile };

type Artwork = {
  id: string;
  userId: string;
  title: string;
  description: string;
  thumbnail: string;
  files: string[];
  medium: string[];
  subjects: string[];
  createdAt?: string;
  updatedAt?: string;
};

type AuthResponse = User & {
  accessToken: string;
  userProfile: UserProfile | null;
};

type ArtworkResponse = Artwork & {
  user: {
    id: string;
    userProfile: UserProfile;
  };
};

type ProfileResponse = UserProfile;

type Res = Card & { user: User; userProfile: UserProfile };

type SignInParams = {
  email: string;
  password: string;
};

type GetAllArtworksParams = {
  offset?: number;
  limit?: number;
  order?: 'trending' | 'popular' | 'newest';
  userId?: string;
  medium?: string;
  subject?: string;
};

type GetUserArtworksParams = {
  userId: string;
};

type CreateArtworkParams = {
  title: string;
  description: string;
  thumbnail: string;
  files: string[];
  folders: string[];
  medium: string[];
  subject: string[];
};

type UpdateArtworkParams = {
  title?: string;
  description?: string;
  folders?: string[];
  medium?: string[];
  subject?: string[];
};
