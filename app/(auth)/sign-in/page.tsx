import { SignInForm } from '@/components/auth/sign-in-form';
import { authIsNotRequired } from '@/lib/auth-utils';

export default async function SignInPage() {
  await authIsNotRequired();
  return <SignInForm />;
}
