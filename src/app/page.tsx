
import Link from 'next/link';
import { SettingsIcon } from 'lucide-react';
import { PostFeed } from '@/components/home/post-feed';
import { Logo } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import Airoute from '@/components/shared/airoute';
export default function HomePage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <Logo />
        <Button variant="ghost" size="icon" asChild className="lg:hidden">
          <Link href="/settings" aria-label="Settings">
            <SettingsIcon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
        </Button>
      </header>
      
      <section aria-labelledby="feed-title">
        <h1 id="feed-title" className="text-3xl font-bold tracking-tight mb-6">
          Discover
        </h1>
        <PostFeed />
      </section>
      <Airoute />
    </div>
  );
}
