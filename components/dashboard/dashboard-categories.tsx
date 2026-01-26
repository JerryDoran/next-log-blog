'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Category, User } from '@/generated/prisma/client';
import Image from 'next/image';

type CategoryProps = {
  categories: (Category & { user: User })[];
};

export default function DashboardCategories({ categories }: CategoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Categories</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-6'>
        {categories.map((category) => (
          <div
            key={category.id}
            className='p-4 rounded-lg gap-6 shadow-sm flex items-center'
          >
            <h3 className='text-lg font-semibold'>{category.name}</h3>
            <div className='flex items-center gap-1'>
              <div className='relative size-8 rounded-full shadow-lg'>
                <Image
                  src={category.user?.image ?? ''}
                  alt={category.user?.name}
                  fill
                  className='object-cover rounded-full'
                />
              </div>
              <p className='font-medium'>{category.user?.name}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
