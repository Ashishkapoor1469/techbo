"use client";
import { Logo } from "@/components/shared/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRightIcon, HeartIcon, MessageCircleIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";


type Post = {
  id: string;
  title: string;
  excerpt?: string;
  author: {
    name: string;
    avatarUrl?: string;
    profileUrl?: string;
  };
  imageUrl?: string;
  timestamp?: string;
  tags?: string[];
  likes?: number;
  comments?: number;
  link?:string;
};

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchPost = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/posts?skip=${skip}&limit=10`);
      const data: Post[] = await res.json();
      
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...data]);
        setSkip((prev) => prev + 10);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

useEffect(()=>{
const observer = new IntersectionObserver((entries)=>{
  if(entries[0].isIntersecting&& hasMore && !loading){
    fetchPost();
  }
},{
rootMargin:"200px"
}
);
if(observerRef.current){
  observer.observe(observerRef.current);
}
return()=>{
  if(observerRef.current){
    observer.unobserve(observerRef.current);
  }
}

},[observerRef.current,hasMore,loading])




  return (
    <div className="flex flex-col gap-4 w-full h-full">  
     <header className="flex items-center justify-between w-full">
        <Logo />
        <Button variant="ghost" size="icon" asChild className="lg:hidden">
          <Link href="/settings" aria-label="Settings">
            <SettingsIcon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
        </Button>
      </header>
     <h1 id="feed-title" className="text-3xl font-bold tracking-tight">
          Discover
        </h1>
    <div className=" w-auto h-auto grid grid-cols-1 md:grid-cols-2 gap-5 mx-auto md:p-4">
      {posts.map((post) => (
        <Card className="overflow-hidden flex flex-col w-full h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
      {post.imageUrl && (
        <Link href={post.imageUrl || '#'} passHref legacyBehavior>
        <a className="block aspect-video relative overflow-hidden">
            <img
              src={post.imageUrl}
              alt={post.title}
            
              style={{objectFit: 'cover'}}
              className="hover:scale-105 transition-transform duration-300 object-fill w-full h-full"
              data-ai-hint={post.timestamp}
            />
          </a>
        </Link>
      )}
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <Link href={''} passHref legacyBehavior>
            <a className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatarUrl} alt={post.author.avatarUrl} />
                <AvatarFallback>{post.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg hover:text-primary transition-colors">{post.author.name}</CardTitle>
                <p className="text-xs text-muted-foreground">Date:{post.timestamp?.slice(0, 16).replace("T", " Time:")}</p>
              </div>
            </a>
          </Link>
        </div>
         <Link href={post.title|| '#'} passHref legacyBehavior>
          <a className="block">
            <h3 className="text-xl font-semibold hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
          </a>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3 text-sm">{post.excerpt}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="flex gap-4 text-muted-foreground">
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 group">
            <HeartIcon className="h-4 w-4 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
            <span className="text-xs">{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 group">
            <MessageCircleIcon className="h-4 w-4 group-hover:text-primary transition-colors" />
            <span className="text-xs">{post.comments}</span>
          </Button>
        </div>
        {post.link && (
          <Button variant="outline" size="sm" asChild>
            <Link href={post.link}>
              Read More <ArrowUpRightIcon className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
      ))}

    </div>
    
      {loading && (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-2">
          <div className="rounded-lg animate-pulse duration-800 flex justify-center items-center w-full h-full bg-neutral-300"></div>
          <div className="rounded-lg animate-pulse duration-800 flex justify-center items-center w-full h-full bg-neutral-300"></div>
        </div>

      )}

      {hasMore && <div ref={observerRef} className="h-10" />}
      {!hasMore && (
        <p className="text-center w-full text-gray-500 py-4">
          You’ve reached the end.
        </p>
      )}
    </div>  
  );
}
