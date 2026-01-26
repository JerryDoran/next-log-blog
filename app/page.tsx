import { getPosts } from '@/actions/posts';
import Header from '@/components/header';
import PostCard from '@/components/posts/post-card';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const { posts, totalPages, currentPage } = await getPosts(page);

  return (
    <>
      <Header />
      <div className='flex flex-col gap-6 justify-center'>
        <div className='container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6'>
          {posts
            .filter((post) => post.category !== null)
            .map((post) => (
              <PostCard
                key={post.id}
                post={
                  post as typeof post & {
                    category: NonNullable<typeof post.category>;
                  }
                }
              />
            ))}
        </div>
      </div>
    </>
  );
}
