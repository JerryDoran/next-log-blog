import Link from 'next/link';

export default function Home() {
  return (
    <div className='p-8'>
      <Link
        href='/dashboard'
        className='bg-white px-4 py-2 text-black rounded-md hover:bg-gray-100'
      >
        Go to dashboard
      </Link>
    </div>
  );
}
