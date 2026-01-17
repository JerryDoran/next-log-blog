import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import PostForm from '@/components/posts/post-form';
import { getPost } from '@/actions/posts';
import { getCategories } from '@/actions/categories';

type PostDetailsPageProps = {
  params: Promise<{ postId: string }>;
};

export default async function PostDetailsPage({
  params,
}: PostDetailsPageProps) {
  const { postId } = await params;

  const post = await getPost(postId);
  const categories = await getCategories();
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
                <BreadcrumbLink href='/posts'>posts</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {postId === 'new' ? 'New' : post?.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className='p-8 flex flex-col'>
        {post ? (
          <PostForm
            id={post.id}
            title={post.title}
            content={post.content}
            imageUrl={post.imageUrl!}
            categoryId={post.categoryId!}
            tags={post.tags.map((tag) => ({ label: tag, value: tag }))}
            status={post.status}
            categories={categories}
            slug={post.slug}
          />
        ) : (
          <PostForm
            id=''
            title=''
            content=''
            imageUrl=''
            categoryId=''
            tags={[]}
            status=''
            categories={categories}
            slug=''
          />
        )}
      </div>
    </>
  );
}
