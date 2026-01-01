import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth-client';

export default function SignInSocial({
  provider,
  children,
}: {
  provider: 'github' | 'google';
  children: React.ReactNode;
}) {
  return (
    <Button
      onClick={async () =>
        await signIn.social({ provider, callbackURL: '/dashboard' })
      }
      type='button'
      variant='outline'
      className='cursor-pointer'
    >
      {children}
    </Button>
  );
}
