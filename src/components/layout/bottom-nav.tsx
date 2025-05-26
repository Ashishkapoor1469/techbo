
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { bottomNavItems, type NavItemConfig } from '@/config/nav'; // Use new config

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border shadow-t-md lg:hidden"> {/* Changed md:hidden to lg:hidden */}
      <div className="container mx-auto h-full">
        <ul className="flex justify-around items-center h-full">
          {bottomNavItems.map((item: NavItemConfig) => { // Use NavItemConfig
            const isActive = item.exactMatch ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <li key={item.href} className="flex-1">
                <Link href={item.href} className="flex flex-col items-center justify-center h-full p-1">
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
