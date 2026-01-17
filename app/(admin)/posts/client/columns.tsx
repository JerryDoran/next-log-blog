'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Category, Post } from '@/generated/prisma/client';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import CellActions from './cell-actions';
import Image from 'next/image';

type PostWithCategory = Post & { category: Category | null };

export const columns: ColumnDef<PostWithCategory>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => (
      <div className='h-10 w-15 relative'>
        {row.original.imageUrl && (
          <Image
            src={row.original.imageUrl}
            alt={row.original.title}
            fill
            className='rounded-sm'
          />
        )}
      </div>
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('title')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      row.getValue('status');
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      row.getValue('category');
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return <CellActions name={row.original.id} id={row.original.id} />;
    },
  },
];
