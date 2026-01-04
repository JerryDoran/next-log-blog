import { ThemeToggle } from '@/components/theme-toggle';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeToggle />
      <div className='mx-auto w-full min-h-dvh max-w-md flex flex-col items-center justify-center px-4'>
        {children}
      </div>
    </>
  );
}
