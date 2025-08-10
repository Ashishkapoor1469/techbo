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

export interface Message {
  id: string; // MongoDB _id as string
  senderId: string; // User ID of the sender
  receiverId: string; // User ID of the receiver
  content: string; // The actual message text
  createdAt: string; // ISO date string
  updatedAt?: string; // Optional if message is edited
  isRead: boolean; // Whether the receiver has read it
}
export interface UserProfile {
  name: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  email: string;
  password: string;
  location?: string;
  websiteUrl?: string;
  createdAt?: Date;
  updatedAt?: Date ;
  isAdmin?: boolean;
  isAcceptingMessage?: boolean;
  isVerified: boolean;
  forgotPasswordToken?: string;
  forgotPasswordExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  Post: Post[]; // user posts
  Messages: Message[]; // user messages
  frameworks:Framework[];
  packages:Package[];
}


// Simplified versions for profile lists, if needed, to avoid deeply nested full objects.
// For now, UserProfile uses the full types.
