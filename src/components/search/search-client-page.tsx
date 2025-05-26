"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchIcon } from 'lucide-react';
import { PostCard } from '@/components/home/post-card';
import { ItemCard } from '@/components/shared/item-card';
import type { Post, Framework, Package } from '@/types';

// Mock data - replace with actual search results fetching
const mockPosts: Post[] = [ 
  { id: 'search-post-1', type: 'article', title: 'Advanced Tailwind Tricks', excerpt: 'Some cool tailwind tricks.', author: { name: 'CSS Master', avatarUrl: 'https://placehold.co/40x40.png', profileUrl: '#' }, timestamp: '1 day ago', likes: 10, comments: 1, imageUrl: 'https://placehold.co/600x300.png', dataAiHint: 'css code' },
];
const mockFrameworks: Framework[] = [ 
  { id: 'search-fw-1', name: 'SolidJS', description: 'A declarative JavaScript library for creating user interfaces.', logoUrl: 'https://placehold.co/64x64.png', dataAiHint: 'solidjs logo', tags: ['JavaScript', 'UI'], websiteUrl: '#' }
];
const mockPackages: Package[] = [ 
  { id: 'search-pkg-1', name: ' Zustand', description: 'Small, fast and scalable bearbones state-management solution.', logoUrl: 'https://placehold.co/64x64.png', dataAiHint: 'zustand logo', version: '4.0', tags: ['State Management'], repositoryUrl: '#' }
];

export function SearchClientPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('posts');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here based on searchTerm and activeTab
    console.log(`Searching for "${searchTerm}" in "${activeTab}"`);
  };

  const filteredPosts = mockPosts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredFrameworks = mockFrameworks.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.description.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredPackages = mockPackages.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex items-center gap-2 p-4 bg-card rounded-xl shadow">
        <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
            type="search"
            placeholder="Search for anything..."
            className="w-full text-base pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <Button type="submit" size="lg">Search</Button>
      </form>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Post Results</h2>
          {searchTerm && filteredPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {filteredPosts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
          ) : <p className="text-muted-foreground text-center py-8">{searchTerm ? `No posts found for "${searchTerm}".` : "Enter a term to search posts."}</p>}
        </TabsContent>
        
        <TabsContent value="frameworks" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Framework Results</h2>
          {searchTerm && filteredFrameworks.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFrameworks.map(fw => <ItemCard key={fw.id} item={fw} type="framework" />)}
            </div>
          ) : <p className="text-muted-foreground text-center py-8">{searchTerm ? `No frameworks found for "${searchTerm}".` : "Enter a term to search frameworks."}</p>}
        </TabsContent>
        
        <TabsContent value="packages" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Package Results</h2>
          {searchTerm && filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map(pkg => <ItemCard key={pkg.id} item={pkg} type="package" />)}
            </div>
          ) : <p className="text-muted-foreground text-center py-8">{searchTerm ? `No packages found for "${searchTerm}".` : "Enter a term to search packages."}</p>}
        </TabsContent>
      </Tabs>
    </div>
  );
}
