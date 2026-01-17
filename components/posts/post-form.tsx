'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { object, z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import ImageUploader from '@/components/image-uploader';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Spinner } from '../ui/spinner';
import { generateSlug } from '@/lib/utils';
import RichTextEditor from '@/components/toolbars/editor';
import { createPost, updatePost } from '@/actions/posts';

const CreatableSelect = dynamic(() => import('react-select/creatable'), {
  ssr: false,
});

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string('Image URL must be a valid URL'),
  categoryId: z.string(),
  tags: z.array(object({ label: z.string(), value: z.string() })),
  status: z.string(),
  categories: z.array(object({ id: z.string(), name: z.string() })).optional(),
  slug: z.string().min(2, 'Slug is required'),
});

export type PostFormValues = z.infer<typeof formSchema>;

export default function PostForm({
  id,
  title,
  content,
  imageUrl,
  categoryId,
  tags,
  status,
  categories,
  slug,
}: PostFormValues) {
  const router = useRouter();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id,
      title,
      content,
      imageUrl,
      categoryId,
      tags,
      categories,
      status,
      slug,
    },
    mode: 'onBlur',
  });

  async function onSubmit(values: PostFormValues) {
    if (id) {
      await updatePost(values);
      toast.success('Post updated successfully!');
    } else {
      await createPost(values);
      toast.success('Post created successfully!');
      form.reset();
      router.push('/posts');
    }
  }

  return (
    <Form {...form}>
      <form
        className='grid lg:grid-cols-3 w-full max-w-6xl gap-10 p-4 mx-auto'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='flex flex-col gap-6 col-span-2'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Post Title'
                    {...field}
                    onBlur={(e) => {
                      field.onBlur();
                      if (!form.getValues('slug')) {
                        form.setValue('slug', generateSlug(e.target.value), {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='slug'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='-mb-2'>Image URL</FormLabel>
                <FormControl>
                  <ImageUploader
                    endpoint='imageUploader'
                    defaultUrl={field.value}
                    onChangeAction={(url) => field.onChange(url)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <CreatableSelect
                    styles={{
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: '#1a1a1a',
                        color: '#f0f0f0',
                      }),
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: '#1a1a1a',
                        borderColor: '#444444',
                        color: '#f0f0f0',
                      }),
                      input: (provided) => ({
                        ...provided,
                        color: '#f0f0f0',
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: '#f0f0f0',
                      }),
                      multiValue: (provided) => ({
                        ...provided,
                        backgroundColor: '#333333',
                      }),
                      multiValueLabel: (provided) => ({
                        ...provided,
                        color: '#f0f0f0',
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused
                          ? '#555555'
                          : '#1a1a1a',
                        color: '#f0f0f0',
                      }),
                    }}
                    isMulti
                    isClearable
                    {...field}
                    onCreateOption={(value) => {
                      const newOption = {
                        label: value,
                        value: value.toLowerCase(),
                      };
                      field.onChange([...field.value, newOption]);
                    }}
                    components={{ IndicatorSeparator: null }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-6 w-full col-span-3 lg:col-span-1'>
          <Card className='w-full  lg:max-w-sm'>
            <CardHeader>
              <CardTitle className=''>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-6'>
              <FormField
                control={form.control}
                name='categoryId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={categoryId}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select a category' />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={status}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select a status' />
                        </SelectTrigger>
                        <SelectContent>
                          {['DRAFT', 'PUBLISHED'].map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>
        <Button
          variant='default'
          type='submit'
          className='mt-6 md:max-w-40 cursor-pointer'
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Spinner className='size-6' />
              Saving post...
            </>
          ) : (
            'Save Post'
          )}
        </Button>
      </form>
    </Form>
  );
}
