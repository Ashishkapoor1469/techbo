
import type { LucideIcon } from 'lucide-react';
import { HomeIcon, PackageIcon, Layers3Icon, UserCircle2Icon, SearchIcon, Wand2Icon } from 'lucide-react';

export interface NavItemConfig {
  href: string;
  label: string;
  icon: LucideIcon;
  exactMatch?: boolean;
}

// For SideNav (typically more items are fine)
export const sideNavItems: NavItemConfig[] = [
  { href: '/', label: 'Home', icon: HomeIcon, exactMatch: true },
  { href: '/search', label: 'Search', icon: SearchIcon },
  { href: '/frameworks', label: 'Frameworks', icon: Layers3Icon },
  { href: '/packages', label: 'Packages', icon: PackageIcon },
  { href: '/recommendations', label: 'AI Recs', icon: Wand2Icon },
  { href: '/profile', label: 'Profile', icon: UserCircle2Icon },
];

// For BottomNav (limited items, specific order for Home icon in center)
export const bottomNavItems: NavItemConfig[] = [
  { href: '/search', label: 'Search', icon: SearchIcon },
  { href: '/packages', label: 'Packages', icon: PackageIcon },
  { href: '/', label: 'Home', icon: HomeIcon, exactMatch: true }, // Central item
  { href: '/frameworks', label: 'Frameworks', icon: Layers3Icon },
  { href: '/profile', label: 'Profile', icon: UserCircle2Icon },
];
