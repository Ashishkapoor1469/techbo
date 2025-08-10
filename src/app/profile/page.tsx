"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Edit3Icon,
  MapPinIcon,
  LinkIcon,
  CalendarDaysIcon,
  Verified,
} from "lucide-react";
import type { UserProfile } from "@/types";
import { PostCard } from "@/components/home/post-card"; // Re-use PostCard for user posts
import { ItemCard } from "@/components/shared/item-card"; // Re-use ItemCard for user frameworks/packages
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import Createpost from "@/components/home/createpost";

// // const [data, setdata] = useState({});
//  const mockUserProfile: UserProfile = {
//   id: "user123",
//   name: "Ashish kapoor",
//   username: "ashishkapoor123",
//   avatarUrl: "https://wallpapershome.com/images/pages/ico_h/16173.jpg",
//   dataAiHint: "profile picture",
//   bio: "Full-stack developer passionate about open-source and building modern web applications. Exploring GenAI.",
//   postsCount: 4,
//   followersCount: 1200,
//   followingCount: 250,
//   joinedDate: "Joined March 2025",
//   location: "Himachal perdesh, Chamba",
//   websiteUrl: "https://portfolio-phi-ivory-91.vercel.app/",
//   userPosts: [
//     {
//       id: "p1",
//       type: "article",
//       title: "My Top 3 Dev Tools",
//       excerpt: "Sharing tools I use daily.",
//       author: {
//         name: "Alex Johnson",
//         avatarUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD3uyGC8BAZpeOpAnLAyHHz0xeNQlNup1v9A&s",
//         profileUrl: "/profile",
//       },
//       timestamp: "3 days ago",
//       likes: 15,
//       comments: 2,
//       imageUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD3uyGC8BAZpeOpAnLAyHHz0xeNQlNup1v9A&s",
//       dataAiHint: "desk setup",
//     },
//   ],
//   userFrameworks: [
//     {
//       id: "nextjs-fav",
//       name: "Next.js",
//       description: "Primary framework for web apps.",
//       logoUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMZD7gtOg-aRXiYZ_ZkmYGch46UxHAygL-Pw&s",
//       dataAiHint: "nextjs logo",
//       tags: ["React"],
//       websiteUrl: "#",
//       rating: 4.9,

//     },
//   ],
//   userPackages: [
//     {
//       id: "zod-fav",
//       name: "Zod",
//       description: "For schema validation.",
//       logoUrl: "https://zod.dev/?id=basic-usage",
//       dataAiHint: "zod logo",
//       version: "3.23",
//       tags: ["Validation"],
//       repositoryUrl: "#",
//     },
//   ],
// };

// useEffect(()=>{
// axios.get("/api/userdetails")
// .then((response) => {
//   setdata(response.data);
// }
// ).catch((error) => {
//   console.error("Error fetching user details:", error);
// });
// },[])

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if(!user) return <div className="flex flex-col w-full h-full gap-4">
    <div className="w-full h-full bg-neutral-300 animate-pulse shadow-sm rounded-xl"></div>
    <div className="w-full h-full flex gap-4">
      <div className="w-full h-full bg-neutral-300 animate-pulse shadow-xl rounded-xl"></div>
      <div className="w-full h-full bg-neutral-300 animate-pulse shadow-xl rounded-xl"></div>
    </div>
  </div>;
  return (
    <div className="space-y-8">
      <Card className="overflow-hidden shadow-lg rounded-xl">
        <CardHeader className="bg-muted/30 p-6 border-b">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background shadow-md">
              <AvatarImage
                src={user?.avatarUrl}
                alt={user?.name}
                className="object-cover"
              />
              <AvatarFallback>
                {(user?.name ?? "").substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold flex gap-2 items-center justify-center">
                    {user?.name}{" "}
                    {user?.isVerified ? <div><Verified/></div> : <div></div>}{" "}
                  </h1>
                  <p className="text-muted-foreground">@{user?.username}</p>
                </div>
                <Link href={"/profile/edit"}>
                  <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                    <Edit3Icon className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
                </Link>
              </div>
              <p className="mt-3 text-sm text-foreground max-w-prose">
                {user?.bio}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                {user?.location && (
                  <span className="flex items-center">
                    <MapPinIcon className="mr-1.5 h-4 w-4" /> {user.location}
                  </span>
                )}
                {user?.websiteUrl && (
                  <a
                    href={user.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-primary"
                  >
                    <LinkIcon className="mr-1.5 h-4 w-4" />{" "}
                    {user.websiteUrl.replace(/^https?:\/\//, "")}
                  </a>
                )}
                <span className="flex items-center">
                  <CalendarDaysIcon className="mr-1.5 h-4 w-4" />{" "}
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "No date"}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{user?.postsCount}</p>
              <p className="text-sm text-muted-foreground">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {user?.followersCount.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{user?.followingCount}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          {user?.Post && user?.Post.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {user?.Post.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No posts yet.
            </p>
          )}
        </TabsContent>
        <TabsContent value="frameworks" className="mt-6">
          {user?.frameworks && user?.frameworks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user?.frameworks.map((fw) => (
                <ItemCard key={fw.id} item={fw} type="framework" />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No frameworks added yet.
            </p>
          )}
        </TabsContent>
        <TabsContent value="packages" className="mt-6">
          {user?.packages && user?.packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user?.packages.map((pkg) => (
                <ItemCard key={pkg.id} item={pkg} type="package" />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No packages added yet.
            </p>
          )}
        </TabsContent>
      </Tabs>
      <Createpost />
    </div>
  );
}
