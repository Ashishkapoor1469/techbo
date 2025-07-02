
'use client'; // Needs to be client for params and mock data access

import Image from 'next/image';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DownloadIcon, ExternalLinkIcon, GitForkIcon, InfoIcon, Code2Icon, TerminalIcon, BookOpenIcon, CalendarDaysIcon } from 'lucide-react';
import type { Package } from '@/types';

// Temporary: Import mock data directly. In a real app, you'd fetch by ID.
const mockPackagesData: Package[] = [
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework for rapid UI development.',
    detailedDescription: 'Tailwind CSS is a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override. It works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.',
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'tailwind logo',
    version: '3.4',
    tags: ['CSS', 'Utility-first', 'Styling', 'Frontend'],
    repositoryUrl: 'https://github.com/tailwindlabs/tailwindcss',
    downloadUrl: 'https://www.npmjs.com/package/tailwindcss',
    lastPublished: '2 days ago',
    installation: 'npm install -D tailwindcss\nnpx tailwindcss init',
    usage: 'Apply utility classes directly in your HTML: `<div class="bg-blue-500 text-white p-4">Hello</div>`',
    exampleCode: `// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
    exampleUrl: 'https://tailwindcss.com/docs/utility-first',
  },
  {
    id: 'shadcn-ui',
    name: 'ShadCN UI',
    description: 'Beautifully designed components that you can copy and paste into your apps.',
    detailedDescription: 'ShadCN UI is not a component library. It\'s a collection of re-usable components that you can copy and paste into your apps. This means you have full control over the code and can customize them to your needs. Built with Radix UI and Tailwind CSS.',
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'shadcn logo',
    version: 'Latest',
    tags: ['React', 'Components', 'UI Library', 'TailwindCSS', 'Radix UI'],
    repositoryUrl: 'https://github.com/shadcn-ui/ui',
    downloadUrl: 'https://ui.shadcn.com/', // This is more of a docs link but acts as primary
    lastPublished: 'Frequently updated',
    installation: 'npx shadcn-ui@latest add button (for example)',
    usage: 'Import components into your React project: `import { Button } from "@/components/ui/button";`',
    exampleCode: `import { Button } from "@/components/ui/button";

function MyComponent() {
  return <Button variant="outline">Click me</Button>;
}`,
    exampleUrl: 'https://ui.shadcn.com/docs/components/button',
  },
  {
    id: 'zod',
    name: 'Zod',
    description: 'TypeScript-first schema validation with static type inference.',
    detailedDescription: 'Zod is a TypeScript-first schema declaration and validation library. It\'s designed to be as developer-friendly as possible. Define your schema once, and Zod will validate your data and infer the static TypeScript type. It\'s great for validating API inputs, form data, and more.',
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'zod logo',
    version: '3.23',
    tags: ['TypeScript', 'Validation', 'Schema', 'Data Integrity'],
    repositoryUrl: 'https://github.com/colinhacks/zod',
    downloadUrl: 'https://www.npmjs.com/package/zod',
    lastPublished: '1 week ago',
    installation: 'npm install zod',
    usage: 'Define schemas and parse data: `const mySchema = z.string(); mySchema.parse("hello");`',
    exampleCode: `import { z } from "zod";

const UserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
});

try {
  const user = UserSchema.parse({ username: "usr", email: "test@example.com" });
  console.log(user);
} catch (e) {
  console.error(e.errors);
}`,
    exampleUrl: 'https://zod.dev/?id=basic-usage',
  },
  {
    id: 'lucide-react',
    name: 'Lucide React',
    description: 'A simply beautiful open-source icon set, optimized for React applications.',
    detailedDescription: 'Lucide is a community-maintained fork of Feather Icons, offering a comprehensive and consistent set of SVG icons. Lucide React provides easy-to-use React components for these icons, making it simple to integrate them into your projects.',
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'icon library',
    version: '0.300+',
    tags: ['Icons', 'React', 'SVG', 'UI'],
    repositoryUrl: 'https://github.com/lucide-icons/lucide',
    downloadUrl: 'https://www.npmjs.com/package/lucide-react',
    lastPublished: '3 days ago',
    installation: 'npm install lucide-react',
    usage: 'Import and use icons as components: `import { HomeIcon } from "lucide-react";`',
    exampleCode: `import { HomeIcon, SettingsIcon } from "lucide-react";

function MyComponent() {
  return (
    <div>
      <HomeIcon size={24} />
      <SettingsIcon className="text-blue-500" />
    </div>
  );
}`,
    exampleUrl: 'https://lucide.dev/guide/packages/lucide-react',
  },
];

export default function PackageDetailPage() {
  const params = useParams();
  const packageId = params.id as string;

  const pkg = mockPackagesData.find(p => p.id === packageId);

  if (!pkg) {
    notFound();
  }

  const { 
    name, logoUrl, dataAiHint, version, detailedDescription, tags, repositoryUrl, downloadUrl, 
    installation, usage, exampleCode, exampleUrl, lastPublished, author 
  } = pkg;

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
              <p className="text-lg text-muted-foreground mt-1">Version {version}</p>
              {lastPublished && (
                 <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                  <CalendarDaysIcon className="h-4 w-4" />
                  <span>Last published: {lastPublished}</span>
                </div>
              )}
              {author && (
                <p className="text-sm text-muted-foreground mt-1">By: {author.name}</p>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center"><InfoIcon className="mr-2 h-5 w-5 text-primary" />About {name}</h2>
            <p className="text-foreground/90 leading-relaxed">{detailedDescription}</p>
          </section>

          {installation && (
            <section>
              <Separator className="my-6" />
              <h2 className="text-xl font-semibold mb-3 flex items-center"><TerminalIcon className="mr-2 h-5 w-5 text-primary" />Installation</h2>
              <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                <pre><code className="text-sm font-mono text-foreground/90">{installation}</code></pre>
              </div>
            </section>
          )}

          {usage && (
            <section>
              <Separator className="my-6" />
              <h2 className="text-xl font-semibold mb-3 flex items-center"><BookOpenIcon className="mr-2 h-5 w-5 text-primary" />Usage</h2>
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
          {downloadUrl && (
            <Button asChild size="lg">
              <Link href={downloadUrl} target="_blank" rel="noopener noreferrer">
                <DownloadIcon className="mr-2 h-4 w-4" /> Download/Docs
              </Link>
            </Button>
          )}
          {repositoryUrl && (
            <Button variant="outline" asChild size="lg">
              <Link href={repositoryUrl} target="_blank" rel="noopener noreferrer">
                <GitForkIcon className="mr-2 h-4 w-4" /> Repository
              </Link>
            </Button>
          )}
           {exampleUrl && pkg.id !== 'shadcn-ui' && pkg.id !== 'tailwindcss' && pkg.id !== 'zod' && pkg.id !== 'lucide-react' && ( // Avoid duplicating docs link for some
            <Button variant="secondary" asChild size="lg">
              <Link href={exampleUrl} target="_blank" rel="noopener noreferrer">
                More Examples <ExternalLinkIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
