
'use client';

import { useState, useEffect } from 'react';
import { ItemCard } from '@/components/shared/item-card';
import { FilterToolbar } from '@/components/shared/filter-toolbar';
import type { Package } from '@/types';

const mockPackagesData: Package[] = [
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.',
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'tailwind logo',
    version: '3.4',
    tags: ['CSS', 'Utility-first', 'Styling'],
    repositoryUrl: 'https://github.com/tailwindlabs/tailwindcss',
    downloadUrl: 'https://www.npmjs.com/package/tailwindcss',
  },
  {
    id: 'shadcn-ui',
    name: 'ShadCN UI',
    description: 'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'shadcn logo',
    version: 'Latest',
    tags: ['React', 'Components', 'UI Library'],
    repositoryUrl: 'https://github.com/shadcn-ui/ui',
    downloadUrl: 'https://ui.shadcn.com/',
  },
  {
    id: 'zod',
    name: 'Zod',
    description: 'TypeScript-first schema validation with static type inference. The AIO Zod Object Description Language.',
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'zod logo',
    version: '3.23',
    tags: ['TypeScript', 'Validation', 'Schema'],
    repositoryUrl: 'https://github.com/colinhacks/zod',
  },
  {
    id: 'lucide-react',
    name: 'Lucide React',
    description: 'A simply beautiful open-source icon set. Optimized for React applications.',
    logoUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'icon library',
    version: '0.300+',
    tags: ['Icons', 'React', 'SVG'],
    repositoryUrl: 'https://github.com/lucide-icons/lucide',
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
