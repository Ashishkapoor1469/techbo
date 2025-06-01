import type { Post } from '@/types';
import { PostCard } from './post-card';

const mockPosts: Post[] = [
  {
    id: '1',
    type: 'framework',
    title: 'Next.js 15: The Future of Web Development',
    excerpt: 'Explore the latest features and improvements in Next.js 15, pushing the boundaries of React frameworks.',
    author: { name: 'Vercel Team', avatarUrl: 'https://miro.medium.com/v2/resize:fit:720/1*_bJ2z2NRfTncHAv5UjUxwA.jpeg', profileUrl: '#' },
    imageUrl: 'https://miro.medium.com/v2/resize:fit:720/1*_bJ2z2NRfTncHAv5UjUxwA.jpeg',
    dataAiHint: 'abstract code',
    timestamp: '2 days ago',
    likes: 1250,
    comments: 89,
    tags: ['Next.js', 'React', 'Web Dev'],
    link: '#',
  },
  {
    id: '2',
    type: 'package',
    title: 'ShadCN UI: Beautifully Designed Components',
    excerpt: 'A deep dive into ShadCN UI, the component library that is taking the React ecosystem by storm.',
    author: { name: 'Shad CN', avatarUrl: 'https://media.daily.dev/image/upload/f_auto,q_auto/v1/posts/ee358d91675104492e67ab441cb3898b?_a=AQAEuiZ', profileUrl: '#' },
    imageUrl: 'https://media.daily.dev/image/upload/f_auto,q_auto/v1/posts/ee358d91675104492e67ab441cb3898b?_a=AQAEuiZ',
    dataAiHint: 'ui components',
    timestamp: '5 days ago',
    likes: 980,
    comments: 45,
    tags: ['UI', 'React Components', 'TailwindCSS'],
    link: '#',
  },
  {
    id: '3',
    type: 'user_update',
    title: 'My Journey Learning GenAI for Dev Tools',
    excerpt: 'Sharing my experiences and insights building AI-powered developer tools. It has been a fascinating adventure!',
    author: { name: 'AI Enthusiast Dev', avatarUrl: '', profileUrl: '#' },
    timestamp: '1 week ago',
    likes: 300,
    comments: 15,
    tags: ['GenAI', 'Developer Tools', 'Learning'],
    link: '#',
  },
  {
    id: '4',
    type: 'article',
    title: 'Top 5 VS Code Extensions for Frontend Devs in 2024',
    excerpt: 'Boost your productivity with these must-have VS Code extensions tailored for frontend development.',
    author: { name: 'CodeTips Daily', avatarUrl: '', profileUrl: '#' },
    imageUrl: '',
    dataAiHint: 'code editor',
    timestamp: '3 days ago',
    likes: 720,
    comments: 33,
    tags: ['VSCode', 'Extensions', 'Frontend'],
    link: '#',
  }
];

export function PostFeed() {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
