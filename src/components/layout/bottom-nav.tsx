"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, PackageIcon, Layers3Icon, UserCircle2Icon, SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/search', label: 'Search', icon: SearchIcon },
  { href: '/packages', label: 'Packages', icon: PackageIcon },
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/frameworks', label: 'Frameworks', icon: Layers3Icon },
  { href: '/profile', label: 'Profile', icon: UserCircle2Icon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border shadow-t-md md:hidden">
      <div className="container mx-auto h-full">
        <ul className="flex justify-around items-center h-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className="flex-1">
                <Link href={item.href} className="flex flex-col items-center justify-center h-full">
                  <item.icon
                    className={cn(
                      'h-6 w-6 mb-0.5',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      'text-xs',
                      isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
