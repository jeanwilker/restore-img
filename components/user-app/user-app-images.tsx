'use client';
import Image from 'next/image';
import { PlusCircleIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { RestoredImage } from '@/types';
import { downloadImage } from '@/functions/downloadImage';

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  image: RestoredImage;
  aspectRatio?: 'portrait' | 'square';
  width?: number;
  height?: number;
  publicUrl: string;
}

export function UserAppImages({
  image,
  aspectRatio = 'portrait',
  width,
  height,
  publicUrl,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <Image
              src={publicUrl + '/' + image.name}
              alt={image.name}
              width={width}
              height={height}
              className={cn(
                'h-auto w-auto object-cover transition-all hover:scale-105',
                aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Adicione sua coleção</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Adicionar à lista</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Nova Coleção
              </ContextMenuItem>
              <ContextMenuSeparator />
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Delete</ContextMenuItem>
          <ContextMenuItem>Duplicar</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={() => downloadImage(image.name)}>
            Download
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{image.name}</h3>
      </div>
    </div>
  );
}
