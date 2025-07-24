"use client";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded shadow">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          {post.excerpt && <p>{post.excerpt}</p>}
          <p className="text-sm text-gray-600">By {post.author.name}</p>
          {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="mt-2 w-full h-auto rounded" />}
        </div>
      ))}
    </div>
  );
}
