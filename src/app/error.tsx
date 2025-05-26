
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangleIcon } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service or console
    console.error("Global Error Boundary Caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6 bg-background">
      <div className="bg-card p-8 rounded-xl shadow-2xl max-w-md w-full">
        <AlertTriangleIcon className="h-16 w-16 text-destructive mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-card-foreground mb-3">Oops! Something went wrong.</h1>
        <p className="text-muted-foreground mb-6">
          We encountered an unexpected issue trying to load this page. Please try again, or contact support if the problem persists.
        </p>
        {error?.message && (
          <details className="mb-6 text-left bg-muted/50 p-3 rounded-md text-xs">
            <summary className="cursor-pointer font-medium text-muted-foreground hover:text-foreground">Error Details</summary>
            <pre className="mt-2 whitespace-pre-wrap break-all text-destructive-foreground/80 p-2 bg-destructive/10 rounded">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}
        <Button
          onClick={() => reset()}
          size="lg"
          className="w-full"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
