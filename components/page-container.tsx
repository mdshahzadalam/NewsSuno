import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("container mx-auto px-4 py-12 max-w-4xl", className)}>
      {children}
    </div>
  );
}
