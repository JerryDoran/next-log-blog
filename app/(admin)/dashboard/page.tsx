import Charts from '@/components/dashboard/dashboard-chart';
import DashboardCard from '@/components/dashboard/dashboard-card';
import { authIsRequired, authSession } from '@/lib/auth-utils';
import { Rocket } from 'lucide-react';
import Link from 'next/link';
import DashboardChart from '@/components/dashboard/dashboard-chart';
import { getPostsByUser } from '@/actions/posts';
import { getCategories } from '@/actions/categories';

export default async function DashboardPage() {
  await authIsRequired();
  const session = await authSession();
  const posts = await getPostsByUser();
  const categories = await getCategories();
  const totalViews = posts.reduce((acc, post) => acc + post.views, 0);

  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex flex-col gap-6 p-14 px-6'>
        <Link
          href='/'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 w-fit bg-zinc-800 px-4 py-2 rounded-md hover:bg-zinc-700 transition-colors'
        >
          <span>Visit public site</span>
          <Rocket />
        </Link>
        <h1 className='font-semibold text-2xl'>Hi, {session?.user?.name}</h1>
      </div>
      <div className='container flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <DashboardCard
            totalCategories={categories.length}
            totalPosts={posts.length}
            totalViews={totalViews}
          />
        </div>
        <div className='px-4 md:px-6'>
          <DashboardChart data={posts} categories={categories} />
        </div>
      </div>
    </div>
  );
}
