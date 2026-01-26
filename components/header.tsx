export default function Header({ about }: { about?: string }) {
  return (
    <header className='w-full flex flex-col p-16 justify-center text-white container mx-auto rounded-md items-center text-center bg-linear-to-r from-blue-500 to-purple-500 shadow-lg mb-12'>
      <h1 className='text-xl md:text-4xl font-bold mb-4'>
        Latest news, tips and insights <br />{' '}
        {about ? `about ${about}` : 'from our team of experts'}
      </h1>
      <p className='text-sm max-w-2xl'>
        Here, you will always find the latest news, tips and insights as well as
        AI trends from our team of experts
      </p>
    </header>
  );
}
