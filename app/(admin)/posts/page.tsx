import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { DataTable } from '@/components/data-table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getPosts } from '@/actions/posts';

export default async function PostsPage() {
  const posts = await getPosts();
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
                <BreadcrumbPage>posts</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Link href='/posts/new'>
            <Button className='cursor-pointer'>Create new post</Button>
          </Link>
        </div>
      </div>
      <DataTable columns={columns} data={posts} />
    </>
  );
}
