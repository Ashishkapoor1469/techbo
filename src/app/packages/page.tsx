
'use client';

import { useState, useEffect } from 'react';
import { ItemCard } from '@/components/shared/item-card';
import { FilterToolbar } from '@/components/shared/filter-toolbar';
import type { Package } from '@/types';

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
    downloadUrl: 'https://ui.shadcn.com/',
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

export default function PackagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPackages, setFilteredPackages] = useState<Package[]>(mockPackagesData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = mockPackagesData.filter(pkg =>
      pkg.name.toLowerCase().includes(lowerCaseQuery) ||
      pkg.description.toLowerCase().includes(lowerCaseQuery) ||
      pkg.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredPackages(filtered);
  }, [searchQuery]);

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Packages</h1>
        <p className="text-muted-foreground">Find and explore useful NPM packages and libraries.</p>
      </header>
      
      <FilterToolbar 
        onSearchChange={handleSearch}
        searchPlaceholder="Search packages..."
      />

      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <ItemCard key={pkg.id} item={pkg} type="package" />
          ))}
        </div>
      ) : (
         <p className="text-center text-muted-foreground py-8">
          No packages found matching &quot;{searchQuery}&quot;.
        </p>
      )}
    </section>
  );
}

