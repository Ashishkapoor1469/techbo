import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircleIcon, HeartIcon, ArrowUpRightIcon } from 'lucide-react';
import type { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { title, excerpt, author, imageUrl, dataAiHint, timestamp, likes, comments, tags, type, link } = post;

  return (
    <Card className="overflow-hidden flex flex-col h-full_ shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
      {imageUrl && (
        <Link href={link || '#'} passHref legacyBehavior>
        <a className="block aspect-video relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill={true}
              style={{objectFit: 'cover'}}
              className="hover:scale-105 transition-transform duration-300"
              data-ai-hint={dataAiHint}
            />
          </a>
        </Link>
      )}
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <Link href={author.profileUrl} passHref legacyBehavior>
            <a className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={author.avatarUrl} alt={author.name} />
                <AvatarFallback>{author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg hover:text-primary transition-colors">{author.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{timestamp}</p>
              </div>
            </a>
          </Link>
        </div>
         <Link href={link || '#'} passHref legacyBehavior>
          <a className="block">
            <h3 className="text-xl font-semibold hover:text-primary transition-colors line-clamp-2">{title}</h3>
          </a>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3 text-sm">{excerpt}</p>
        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="flex gap-4 text-muted-foreground">
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 group">
            <HeartIcon className="h-4 w-4 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
            <span className="text-xs">{likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 group">
            <MessageCircleIcon className="h-4 w-4 group-hover:text-primary transition-colors" />
            <span className="text-xs">{comments}</span>
          </Button>
        </div>
        {link && (
          <Button variant="outline" size="sm" asChild>
            <Link href={link}>
              Read More <ArrowUpRightIcon className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
