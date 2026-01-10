/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { Category } from '@/generated/prisma/client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategories } from '@/hooks/use-categories';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { createCategory, updateCategory } from '@/actions/categories';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function CategoriesClient({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const { open, setOpen, category, setCategory } = useCategories();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
    mode: 'onBlur',
  });

  async function onSubmit(values: FormValues) {
    try {
      if (category?.id) {
        await updateCategory({ id: category.id, name: values.name });
        toast.success('Category updated successfully!');
      } else {
        await createCategory(values.name);
        toast.success('Category created successfully!');
      }
      router.refresh();
      form.reset();
      setCategory({ id: '', name: '' });
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  }

  useEffect(() => {
    if (category) {
      form.setValue('name', category.name);
    }
  }, [category]);

  return (
    <>
      <div className='flex flex-col p-8'>
        <div className='flex w-full justify-between'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>categories</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button className='cursor-pointer' onClick={() => setOpen(true)}>
            Create new category
          </Button>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id='category-form'>
            <DialogContent className='sm:max-w-106.25'>
              <DialogHeader>
                <DialogTitle>Create/Edit Category</DialogTitle>
              </DialogHeader>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                disabled={form.formState.isSubmitting}
                className='cursor-pointer w-full'
                form='category-form'
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Spinner className='size-6' />
                    Saving category...
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </DialogContent>
          </form>
        </Form>
      </Dialog>
      <div className='p-8 flex flex-col'>
        <DataTable columns={columns} data={categories} />
      </div>
    </>
  );
}
