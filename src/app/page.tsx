import { PostFeed } from '@/components/home/post-feed';
import { Logo } from '@/components/shared/logo';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <Logo />
        {/* Add any header actions here if needed */}
      </header>
      
      <section aria-labelledby="feed-title">
        <h1 id="feed-title" className="text-3xl font-bold tracking-tight mb-6">
          Discover
        </h1>
        <PostFeed />
      </section>
    </div>
  );
}
