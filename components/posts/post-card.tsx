'use client';

import { format } from 'date-fns';
import { Category, Post } from '@/generated/prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { MoveRight } from 'lucide-react';
import RichTextViewer from './rich-text-viewer';
import { stripHtml } from '@/lib/utils';

type PostCardProps = {
  post: Post & { category: Category } & {
    user: {
      id: string;
      name: string;
      image: string | null;
      favorites: string[];
    };
  };
};

export default function PostCard({ post }: PostCardProps) {
  const excerpt = stripHtml(post.content);
  return (
    <Card className='w-full p-0 pb-4 border-0 gap-1 relative flex flex-col justify-between'>
      <div className='relative h-60'>
        <Image
          src={post.imageUrl ?? ''}
          alt={post.title}
          fill
          className='object-cover rounded-sm shadow-lg'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      <CardHeader className='gap-0 mt-2'>
        <CardTitle className='line-clamp-3 font-semibold'>
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-sm line-clamp-3'>{excerpt}</p>
        {/* <RichTextViewer content={post.content} /> */}
        <div className='flex gap-2 flex-wrap py-6'>
          {post.tags?.map((tag) => (
            <Link
              href={`/blog/tags/${tag}`}
              key={tag}
              className='px-2 py-1 text-xs'
            >
              <Badge variant='secondary'>{tag}</Badge>
            </Link>
          ))}
        </div>
        <div className='flex justify-between w-full gap-2 items-center'>
          <div className='flex gap-1'>
            <div className='relative size-8 rounded-full shadow-lg'>
              <Image
                src={post.user.image!}
                alt={post.user.name ?? 'User Avatar'}
                fill
                className='rounded-full object-cover shadow-lg'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-xs font-semibold'>{post.user.name}</span>
              <span className='text-[11px] text-neutral-300'>
                {format(post.createdAt, 'MM/dd/yyyy')}
              </span>
            </div>
          </div>
          <Link
            href={`/blog/posts/${post.slug}`}
            className='flex gap-1 text-xs items-center font-medium bg-zinc-800 px-3 py-2 rounded-full hover:bg-zinc-900 transition-colors duration-200'
          >
            Read more <MoveRight className='size-4' />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
