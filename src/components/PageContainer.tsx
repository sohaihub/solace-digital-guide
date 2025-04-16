
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <main className={`pt-20 min-h-screen pb-10 ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </main>
  );
}
