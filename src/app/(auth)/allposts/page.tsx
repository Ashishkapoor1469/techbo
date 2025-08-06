"use client";
import { Loader2 } from "lucide-react";
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
        <div className="max-w-4xl mx-auto p-4 space-y-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg"
        >
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-60 object-contain"
            />
          )}

          <div className="p-6">
            <div className="flex items-center mb-2">
              {post.author?.avatarUrl ? (
                <img
                  src={post.author.avatarUrl}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-2" />
              )}
              <span className="text-sm text-gray-700 font-medium">
                {post.author?.name || "Unknown Author"}
              </span>
              <span className="ml-auto text-xs text-gray-500">
                {post.timestamp
                  ? new Date(post.timestamp).toLocaleDateString()
                  : ""}
              </span>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {post.title}
            </h2>

            {post.excerpt && (
              <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
            )}

            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag,id) => (
                  <span
                    key={id}
                    className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>👍 {post.likes ?? 0}</span>
              <span>💬 {post.comments ?? 0}</span>
            </div>
          </div>
        </div>
      ))}

      {loading && (
        <div className="text-gray-500 flex justify-center py-4"><Loader2 className="animate-spin h-7 w-7"/></div>
      )}

      {hasMore && <div ref={observerRef} className="h-10" />}
      {!hasMore && (
        <p className="text-center text-gray-500 py-4">
          You’ve reached the end.
        </p>
      )}
    </div>
  );
}
