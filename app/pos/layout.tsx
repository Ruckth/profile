'use client';

import TopNav from '../ui/pos/top-nav';

export default function PosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      <TopNav />
      {/* Main Content */}
      <main className="py-2 sm:px-2 lg:px-2">
        {children}
      </main>
    </div>
  );
}