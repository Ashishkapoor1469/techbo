
import type { ReactNode } from 'react';
import SideNav from './side-nav';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <SideNav /> {/* SideNav is part of the main layout flow now */}
      {/* Main content area needs padding on the left for lg screens due to fixed SideNav */}
      {/* pb-20 for mobile to account for BottomNav (h-16) + some content padding */}
      {/* lg:pb-6 for desktop content padding at the bottom */}
      <main className="flex-1 pt-4 pb-20 lg:pb-6 lg:pl-64"> 
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
