import { SignUpForm } from '@/components/auth/sign-up-form';
import { authIsNotRequired } from '@/lib/auth-utils';

export default async function SignUpPage() {
  await authIsNotRequired();
  return <SignUpForm />;
}
