
'use client';

import { useState, useEffect } from 'react';
import { ItemCard } from '@/components/shared/item-card';
import { FilterToolbar } from '@/components/shared/filter-toolbar';
import type { Framework } from '@/types';

const mockFrameworksData: Framework[] = [
  {
    id: 'nextjs',
    name: 'Next.js',
    description: 'The React Framework for Production. Next.js gives you the best developer experience with all the features you need for production.',
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'framework logo',
    version: '14.2',
    tags: ['React', 'SSR', 'Full-stack', 'Vercel'],
    websiteUrl: 'https://nextjs.org',
    rating: 4.9,
  },
  {
    id: 'sveltekit',
    name: 'SvelteKit',
    description: 'SvelteKit is a framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing.',
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'svelte logo',
    tags: ['Svelte', 'Compiler', 'Web Apps'],
    websiteUrl: 'https://kit.svelte.dev',
    rating: 4.7,
  },
  {
    id: 'remix',
    name: 'Remix',
    description: 'Remix is a full stack web framework that lets you focus on the user interface and work back through web standards to deliver a fast, slick, and resilient user experience.',
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'remix logo',
    tags: ['React', 'Web Standards', 'Routing'],
    websiteUrl: 'https://remix.run',
    rating: 4.6,
  },
   {
    id: 'astro',
    name: 'Astro',
    description: 'Build fast websites, faster. PulSll content from anywhere and deploy everywhere, with your favorite UI components and libraries.',
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'astro logo',
    tags: ['Static Site', 'MPA', 'Islands'],
    websiteUrl: 'https://astro.build',
    rating: 4.8,
  },
];

export default function FrameworksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFrameworks, setFilteredFrameworks] = useState<Framework[]>(mockFrameworksData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = mockFrameworksData.filter(framework =>
      framework.name.toLowerCase().includes(lowerCaseQuery) ||
      framework.description.toLowerCase().includes(lowerCaseQuery) ||
      framework.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredFrameworks(filtered);
  }, [searchQuery]);

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Frameworks</h1>
        <p className="text-muted-foreground">Discover and explore various web frameworks.</p>
      </header>
      
      <FilterToolbar 
        onSearchChange={handleSearch}
        searchPlaceholder="Search frameworks..." 
      />

      {filteredFrameworks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFrameworks.map((framework) => (
            <ItemCard key={framework.id} item={framework} type="framework" />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          No frameworks found matching &quot;{searchQuery}&quot;.
        </p>
      )}
    </section>
  );
}
