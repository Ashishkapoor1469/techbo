import type { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen pb-16 md:pb-4"> 
      {/* pb-16 for bottom nav height, adjust if nav is hidden on larger screens */}
      <div className="container mx-auto px-4 py-4">
        {children}
      </div>
    </main>
  );
}
