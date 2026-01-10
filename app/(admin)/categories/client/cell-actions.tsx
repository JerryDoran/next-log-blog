'use client';

import { useState } from 'react';
import { CategoryProps, useCategories } from '@/hooks/use-categories';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CellActions({ id, name }: CategoryProps) {
  const { setCategory, setOpen } = useCategories();

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const router = useRouter();

  function onCopy() {
    navigator.clipboard.writeText(id);
    toast.success(`Category ${name} copied to clipboard!`);
  }

  async function onRemoveCategory() {
    try {
      setIsLoading(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Something went wrong! ${errorMessage}`);
    } finally {
      router.refresh();
      toast.success(`Category ${name} deleted successfully!`);
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
            setOpen(true);
            setCategory({ id, name });
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
                Are you sure you want to delete {name}?
              </span>
              <span>This action cannot be undone</span>
            </DialogDescription>
          </DialogHeader>
          <Button
            variant='destructive'
            disabled={isLoading}
            onClick={onRemoveCategory}
            className='max-w-40 self-end cursor-pointer'
          >
            Delete
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
