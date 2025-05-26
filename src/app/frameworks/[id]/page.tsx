
'use client'; // Needs to be client for params and mock data access

import Image from 'next/image';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation'; // use notFound for better DX
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CalendarDaysIcon, ExternalLinkIcon, StarIcon, InfoIcon, Code2Icon, BookOpenIcon, FileTextIcon } from 'lucide-react';
import type { Framework } from '@/types';

// Temporary: Import mock data directly. In a real app, you'd fetch by ID.
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


export default function FrameworkDetailPage() {
  const params = useParams();
  const frameworkId = params.id as string;
  
  const framework = mockFrameworksData.find(fw => fw.id === frameworkId);

  if (!framework) {
    notFound(); // This will render the nearest not-found.tsx or Next.js default
  }

  const { 
    name, logoUrl, dataAiHint, version, detailedDescription, tags, websiteUrl, rating, 
    releaseDate, usage, exampleCode, exampleUrl 
  } = framework;

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden shadow-xl rounded-2xl">
        <CardHeader className="bg-muted/30 p-6 sm:p-8 border-b">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {logoUrl && (
              <div className="relative h-24 w-24 sm:h-32 sm:w-32 shrink-0 border-4 border-background shadow-md rounded-lg overflow-hidden">
                <Image
                  src={logoUrl}
                  alt={`${name} logo`}
                  fill={true}
                  style={{objectFit: 'contain'}}
                  data-ai-hint={dataAiHint}
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{name}</h1>
              {version && <p className="text-lg text-muted-foreground mt-1">Version {version}</p>}
              {rating && (
                <div className="flex items-center gap-1.5 mt-2">
                  <StarIcon className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-md text-foreground font-semibold">{rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">(User Rating)</span>
                </div>
              )}
              {releaseDate && (
                <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                  <CalendarDaysIcon className="h-4 w-4" />
                  <span>Released: {releaseDate}</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center"><InfoIcon className="mr-2 h-5 w-5 text-primary" />About {name}</h2>
            <p className="text-foreground/90 leading-relaxed">{detailedDescription}</p>
          </section>

          {usage && (
            <section>
              <Separator className="my-6" />
              <h2 className="text-xl font-semibold mb-3 flex items-center"><BookOpenIcon className="mr-2 h-5 w-5 text-primary" />Key Features & Usage</h2>
              <p className="text-foreground/90 leading-relaxed whitespace-pre-line">{usage}</p>
            </section>
          )}

          {exampleCode && (
            <section>
              <Separator className="my-6" />
              <h2 className="text-xl font-semibold mb-3 flex items-center"><Code2Icon className="mr-2 h-5 w-5 text-primary" />Example Code</h2>
              <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                <pre><code className="text-sm font-mono text-foreground/90">{exampleCode}</code></pre>
              </div>
            </section>
          )}
          
          {tags && tags.length > 0 && (
            <section>
               <Separator className="my-6" />
              <h3 className="text-lg font-medium mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
            </section>
          )}
        </CardContent>

        <CardFooter className="bg-muted/20 p-6 sm:p-8 border-t flex flex-wrap gap-3">
          {websiteUrl && (
            <Button asChild size="lg">
              <Link href={websiteUrl} target="_blank" rel="noopener noreferrer">
                Official Website <ExternalLinkIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
          {exampleUrl && (
            <Button variant="outline" asChild size="lg">
              <Link href={exampleUrl} target="_blank" rel="noopener noreferrer">
                View Docs/Examples <FileTextIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
