
'use client';

import { useState, useEffect } from 'react';
import { ItemCard } from '@/components/shared/item-card';
import { FilterToolbar } from '@/components/shared/filter-toolbar';
import type { Framework } from '@/types';

const mockFrameworksData: Framework[] = [
  {
    id: 'nextjs',
    name: 'Next.js',
    description: 'The React Framework for Production. Best developer experience with features for production.',
    detailedDescription: 'Next.js enables you to create full-stack Web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds. It includes features like server-side rendering, static site generation, TypeScript support, smart bundling, route pre-fetching, and more, out of the box.',
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'framework logo',
    version: '14.2',
    tags: ['React', 'SSR', 'Full-stack', 'Vercel', 'Web Development'],
    websiteUrl: 'https://nextjs.org',
    rating: 4.9,
    releaseDate: 'October 25, 2016',
    usage: 'Ideal for building server-rendered applications, static websites, and APIs with React. Supports both Node.js and Edge runtimes.',
    exampleCode: `// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' });
}`,
    exampleUrl: 'https://nextjs.org/docs/getting-started',
  },
  {
    id: 'sveltekit',
    name: 'SvelteKit',
    description: 'A framework for building Svelte web applications of all sizes, with a beautiful development experience.',
    detailedDescription: 'SvelteKit is an application framework powered by Svelte. It provides a flexible filesystem-based router, server-side rendering (SSR), client-side hydration, and an adapter system for deploying to various platforms. Svelte itself is a compiler that turns your declarative components into efficient imperative code that surgically updates the DOM.',
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'svelte logo',
    version: '2.5',
    tags: ['Svelte', 'Compiler', 'Web Apps', 'SSR', 'Performance'],
    websiteUrl: 'https://kit.svelte.dev',
    rating: 4.7,
    releaseDate: 'March 2021 (public beta)',
    usage: 'Build highly performant web applications with less code. Suitable for projects ranging from small sites to complex apps.',
    exampleCode: `<script>
  let count = 0;
  function handleClick() {
    count += 1;
  }
</script>

<button on:click={handleClick}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>`,
    exampleUrl: 'https://learn.svelte.dev/tutorial/welcome-to-svelte',
  },
  {
    id: 'remix',
    name: 'Remix',
    description: 'A full stack web framework that focuses on web standards and modern web app UX.',
    detailedDescription: 'Remix is a full stack web framework that lets you focus on the user interface and work back through web standards to deliver a fast, slick, and resilient user experience. It leverages distributed systems and native browser features over custom client-side JavaScript. Remix supports server-side rendering, data loading, and mutations with a focus on web fundamentals.',
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'remix logo',
    version: '2.8',
    tags: ['React', 'Web Standards', 'Routing', 'SSR', 'Forms'],
    websiteUrl: 'https://remix.run',
    rating: 4.6,
    releaseDate: 'November 2021',
    usage: 'Great for building web applications that embrace web standards, with robust data handling and progressive enhancement.',
    exampleCode: `// app/routes/index.jsx
export async function loader() {
  return { message: "Hello from the loader!" };
}
export default function Index() {
  const data = useLoaderData();
  return <h1>{data.message}</h1>;
}`,
   exampleUrl: 'https://remix.run/docs/en/main/tutorials/blog',
  },
   {
    id: 'astro',
    name: 'Astro',
    description: 'Build fast websites, faster. Pull content from anywhere and deploy everywhere.',
    detailedDescription: 'Astro is a web framework for building content-driven websites like blogs, marketing, and e-commerce. Astro pioneers a new frontend architecture to reduce JavaScript overhead and complexity. It uses server-side rendering of UI components (React, Svelte, Vue, etc.) to HTML by default, shipping zero client-side JavaScript unless explicitly opted-in via Astro islands.',
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'astro logo',
    version: '4.5',
    tags: ['Static Site', 'MPA', 'Islands', 'Content Focused', 'Performance'],
    websiteUrl: 'https://astro.build',
    rating: 4.8,
    releaseDate: 'June 2021 (v0.18)',
    usage: 'Perfect for content-heavy sites where performance and SEO are critical. Allows using multiple UI frameworks on the same page.',
    exampleCode: `---
// src/pages/index.astro
const pageTitle = "My Astro Site";
---
<html lang="en">
<head>
  <title>{pageTitle}</title>
</head>
<body>
  <h1>Welcome to {pageTitle}!</h1>
</body>
</html>`,
    exampleUrl: 'https://docs.astro.build/en/tutorial/0-introduction/',
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
