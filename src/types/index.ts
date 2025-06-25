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
  description: string; // Short description for cards
  detailedDescription?: string; // Longer description for detail page
  logoUrl: string;
  dataAiHint?: string;
  version?: string;
  tags: string[];
  websiteUrl: string;
  rating?: number;
  releaseDate?: string;
  usage?: string; // General usage guidelines or key features
  exampleCode?: string; // A small code snippet
  exampleUrl?: string; // Link to a more comprehensive example or demo
}

export interface Package {
  id:string;
  name: string;
  description: string; // Short description for cards
  detailedDescription?: string; // Longer description for detail page
  logoUrl?: string;
  dataAiHint?: string;
  version: string;
  tags: string[];
  downloadUrl?: string;
  repositoryUrl: string;
  author?: Author;
  lastPublished?: string;
  installation?: string; // Installation instructions
  usage?: string; // Basic usage example
  exampleCode?: string; // A small code snippet
  exampleUrl?: string; // Link to a more comprehensive example or demo
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
  userFrameworks?: Framework[]; // Note: These would be simplified versions for profile display
  userPackages?: Package[]; // Note: These would be simplified versions for profile display
}

// Simplified versions for profile lists, if needed, to avoid deeply nested full objects.
// For now, UserProfile uses the full types.
