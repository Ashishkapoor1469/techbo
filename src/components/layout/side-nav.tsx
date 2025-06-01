
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/shared/logo';
import { sideNavItems, type NavItemConfig } from '@/config/nav';

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border fixed inset-y-0 z-30">
      <div className="p-4 border-b border-border">
        <Logo />
      </div>
      <nav className="flex-grow p-4 space-y-2">
        <ul>
          {sideNavItems.map((item: NavItemConfig) => {
            const isActive = item.exactMatch ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className=''>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* You can add a footer to the sidebar here if needed */}
      {/* <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground">© 2024 DevSpot</p>
      </div> */}
    </aside>
  );
}
