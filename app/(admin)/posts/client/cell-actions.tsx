'use client';

import { useState } from 'react';
import { Copy, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deletePost } from '@/actions/posts';
import { Spinner } from '@/components/ui/spinner';

export default function CellActions({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const router = useRouter();

  function onCopy() {
    navigator.clipboard.writeText(id);
    toast.success(`Post copied to clipboard!`);
  }

  async function onRemovePost() {
    try {
      setIsLoading(true);

      await deletePost(id);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Something went wrong! ${errorMessage}`);
    } finally {
      router.refresh();
      toast.success(`Post deleted successfully!`);
      setIsLoading(false);
      setIsDeleteModalOpen(false);
    }
  }

  return (
    <>
      <div className='flex justify-end gap-6'>
        <div
          className='cursor-pointer'
          title='Copy Category Id'
          onClick={onCopy}
        >
          <Copy className='size-4' />
        </div>
        <div
          className='cursor-pointer'
          title='Edit'
          onClick={() => {
            router.push(`/posts/${id}`);
          }}
        >
          <Edit className='size-4' />
        </div>
        <div
          className='cursor-pointer'
          title='Delete'
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <Trash className='size-4 text-red-500' />
        </div>
      </div>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent
          className='sm:max-w-lg flex flex-col gap-6'
          aria-describedby='category'
          aria-description='delete category'
        >
          <DialogHeader className='gap-6'>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription className='flex flex-col'>
              <span className='text-md'>
                Are you sure you want to delete post?
              </span>
              <span>This action cannot be undone</span>
            </DialogDescription>
          </DialogHeader>
          <Button
            variant='destructive'
            disabled={isLoading}
            onClick={onRemovePost}
            className='max-w-full self-end cursor-pointer'
          >
            {isLoading ? (
              <div className='flex items-center gap-2'>
                <Spinner className='size-6' />
                Deleting post...
              </div>
            ) : (
              'Delete'
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
