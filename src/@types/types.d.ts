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
  description?: string;
  folders?: string[];
  social?: {
    publicEmail?: string;
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

type UserProfileResponse = UserProfile;

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
  subjects: string[];
};

type UpdateArtworkParams = {
  title?: string;
  description?: string;
  folders?: string[];
  medium?: string[];
  subject?: string[];
};

type CreateUserProfileParams = {
  name: string;
  city: string;
  country: string;
  headline: string;
  description?: string;
  avatar?: string;
  folders?: string[];
  social?: string | JSON;
};

type UploadImageResponse = {
  file: string;
};

type UploadImageParams = {
  file: File;
};

type UserFollow = {
  id: string;
  userId: string;
  followId: string;
  createdAt?: string;
  updatedAt?: string;
};

type FollowResponse = UserFollow & {
  user: {
    id: string;
    userProfile: UserProfile;
  };
};

type ArtworkLike = {
  id: string;
  artworkId: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
};

type UserArtworkLikeResponse = ArtworkLike & {
  artwork: Artwork;
};

type RejectData = {
  error: string;
  message: string;
  status: number;
};
