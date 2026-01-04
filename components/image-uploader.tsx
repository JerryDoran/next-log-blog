'use client';

import { useState } from 'react';
import { UploadDropzone } from '@/lib/uploadthing';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { toast } from 'sonner';

type ImageUploaderProps = {
  defaultUrl?: string | null;
  onChangeAction?: (url: string | null) => void;
  endpoint: keyof OurFileRouter;
};

export default function ImageUploader({
  defaultUrl,
  onChangeAction,
  endpoint,
}: ImageUploaderProps) {
  const [value, setValue] = useState<string | null>(defaultUrl ?? null);
  const [showDropzone, setShowDropzone] = useState<boolean>(!defaultUrl);

  function handleSetImage(url: string | null) {
    setValue(url);
    onChangeAction?.(url);
  }

  if (!showDropzone && value) {
    return (
      <div className='relative'>
        <div className='relative w-full min-w-150 min-h-50 shadow-lg overflow-hidden '>
          <Image
            src={value ?? ''}
            alt='Thumbnail Image'
            className='object-cover'
            fill
          />
        </div>
        <div className='mt-3 flex gap-2'>
          <Button
            type='button'
            className='absolute rounded-full right-0 top-0 text-zinc-200 bg-black opacity-60 p-2 m-2 cursor-pointer hover:opacity-100 shadow-md transition-colors'
          >
            <X className='size-4' />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='relative'>
      <UploadDropzone
        endpoint={endpoint}
        content={{
          label: value
            ? 'Drop or click to replace image'
            : 'Drop or click to upload an image',
          allowedContent: 'PNG, JPG, JPEG, GIF up to 4MB',
        }}
        appearance={{
          button: 'rounded-lg',
          container: 'rounded-lg border border-zinc-600',
        }}
        onUploadBegin={() => console.log('upload started')}
        onUploadError={(err) => {
          toast.error(`Upload failed: ${err.message}`);
        }}
        onClientUploadComplete={(res) => {
          const url = res?.[0]?.ufsUrl;

          if (url) {
            handleSetImage(url);
            setShowDropzone(false);
          }
        }}
      />
    </div>
  );
}
