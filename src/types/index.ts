export interface Author {
  name: string;
  avatarUrl: string;
  profileUrl: string;
}

export interface Post {
  id: string;
  type: 'framework' | 'package' | 'user_update' | 'article';
  title: string;
  excerpt: string;
  author: Author;
  imageUrl?: string;
  dataAiHint?: string;
  timestamp: string; 
  likes: number;
  comments: number;
  tags?: string[];
  link?: string;
}

export interface Framework {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  dataAiHint?: string;
  version?: string;
  tags: string[];
  websiteUrl: string;
  rating?: number;
  releaseDate?: string;
}

export interface Package {
  id:string;
  name: string;
  description: string;
  logoUrl?: string;
  dataAiHint?: string;
  version: string;
  tags: string[];
  downloadUrl?: string;
  repositoryUrl: string;
  author?: Author;
  lastPublished?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  dataAiHint?: string;
  bio: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  joinedDate: string;
  location?: string;
  websiteUrl?: string;
  userPosts?: Post[];
  userFrameworks?: Framework[];
  userPackages?: Package[];
}
