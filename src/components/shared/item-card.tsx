import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarIcon, ArrowUpRightIcon, DownloadIcon, GitForkIcon, ExternalLinkIcon } from 'lucide-react';
import type { Framework, Package } from '@/types';

interface ItemCardProps {
  item: Framework | Package;
  type: 'framework' | 'package';
}

export function ItemCard({ item, type }: ItemCardProps) {
  const { id, name, description, logoUrl, dataAiHint, tags } = item;
  const version = 'version' in item ? item.version : undefined;
  const websiteUrl = 'websiteUrl' in item ? item.websiteUrl : undefined;
  const repositoryUrl = 'repositoryUrl' in item ? item.repositoryUrl : undefined;
  const downloadUrl = 'downloadUrl' in item ? item.downloadUrl : undefined;
  const rating = 'rating' in item ? item.rating : undefined;

  const detailUrl = `/${type}s/${id}`;

  return (
    <Card className="overflow-hidden flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        {logoUrl && (
          <Link href={detailUrl} passHref>
            <div className="relative h-16 w-16 shrink-0 cursor-pointer">
              <Image
                src={logoUrl}
                alt={`${name} logo`}
                fill={true}
                style={{objectFit: 'contain'}}
                className="rounded-md"
                data-ai-hint={dataAiHint}
              />
            </div>
          </Link>
        )}
        <div className="flex-1">
          <CardTitle className="text-xl mb-1">
            <Link href={detailUrl} className="hover:text-primary transition-colors">
              {name}
            </Link>
          </CardTitle>
          {version && <CardDescription className="text-xs">Version {version}</CardDescription>}
          {typeof rating === 'number' && (
            <div className="flex items-center gap-1 mt-1">
              <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-muted-foreground">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{description}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 flex flex-wrap gap-2 justify-start">
        <Button variant="default" size="sm" asChild>
          <Link href={detailUrl}>
            View Details <ArrowUpRightIcon className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </Button>
        {websiteUrl && (
          <Button variant="outline" size="sm" asChild>
            <Link href={websiteUrl} target="_blank" rel="noopener noreferrer">
              Website <ExternalLinkIcon className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
        {repositoryUrl && (
          <Button variant="ghost" size="sm" asChild>
            <Link href={repositoryUrl} target="_blank" rel="noopener noreferrer">
              <GitForkIcon className="mr-1.5 h-3.5 w-3.5" /> Repository
            </Link>
          </Button>
        )}
        {downloadUrl && (
          <Button variant="secondary" size="sm" asChild>
            <Link href={downloadUrl} target="_blank" rel="noopener noreferrer">
             <DownloadIcon className="mr-1.5 h-3.5 w-3.5" /> Download
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
