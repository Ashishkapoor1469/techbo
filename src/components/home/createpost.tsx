import { Plus } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

const Createpost = () => {
  return (
   <Button
        className=" md:hidden block fixed bottom-32  right-4 z-50 bg-primary text-white hover:bg-primary/90 transition-colors"
        asChild
      >
        {/* Using Link to navigate to recommendations page */}
        <Link href={"/createposts"} className="flex items-center gap-2">
          <Plus className="h-4 w-4 text-primary-foreground" />
        </Link>
      </Button>
  );
}

export default Createpost;
