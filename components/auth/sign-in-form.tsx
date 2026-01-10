'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Link from 'next/link';
import { signIn } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Separator } from '@/components/ui/separator';
import SignInSocial from '@/components/auth/sign-in-social';
import { Icons } from '@/components/icons';

const signInFormSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignInFormValues = z.infer<typeof signInFormSchema>;

export function SignInForm() {
  const router = useRouter();
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: SignInFormValues) {
    try {
      await signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: '/dashboard',
        },
        {
          onSuccess: async () => {
            form.reset();
            toast.success('Signed in successfully!');
            router.push('/dashboard');
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong!');
    }
  }

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Sign In</CardTitle>
        <CardDescription>Welcome back sign in to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id='signin-form' onSubmit={form.handleSubmit(onSubmit)}>
          {/* Social Sign In Buttons */}
          <div className='mt-2 grid grid-cols-2 gap-3'>
            <SignInSocial provider='google'>
              <Icons.google />
              <span>Google</span>
            </SignInSocial>
            <SignInSocial provider='github'>
              <Icons.gitHub />
              <span>GitHub</span>
            </SignInSocial>
          </div>

          <p className='text-sm text-center mt-2'>Or</p>
          <Separator className='my-4' />
          <FieldGroup className='gap-y-4'>
            <Controller
              name='email'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='email'>Email</FieldLabel>
                  <Input
                    {...field}
                    id='email'
                    aria-invalid={fieldState.invalid}
                    placeholder='john.doe@example.com'
                    autoComplete='off'
                    type='email'
                    value={field.value}
                    className='-mt-1'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='password'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='password'>Password</FieldLabel>
                  <Input
                    {...field}
                    id='password'
                    aria-invalid={fieldState.invalid}
                    placeholder='******'
                    autoComplete='off'
                    type='password'
                    value={field.value}
                    className='-mt-1'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <div className='mt-6 w-full'>
            <Button
              disabled={form.formState.isSubmitting}
              className='cursor-pointer w-full'
            >
              {form.formState.isSubmitting ? (
                <>
                  <Spinner className='size-6' />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </div>
          <p className='text-sm mt-4'>
            Don&apos;t have an account?{' '}
            <Link href='/sign-up' className='text-blue-400'>
              Sign Up
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
