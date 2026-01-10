'use client';

import Link from 'next/link';
import { signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import SignInSocial from '@/components/auth/sign-in-social';
import { Icons } from '@/components/icons';
import { Separator } from '@/components/ui/separator';

const signUpFormSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: SignUpFormValues) {
    try {
      await signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
          callbackURL: '/dashboard',
        },
        {
          onSuccess: async () => {
            toast.success('Signed up successfully!');
            router.push('/dashboard');
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong!');
    }
  }

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Sign Up</CardTitle>
        <CardDescription>Create your account to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id='signup-form' onSubmit={form.handleSubmit(onSubmit)}>
          {/* Social buttons */}
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
              name='name'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='name'>Name</FieldLabel>
                  <Input
                    {...field}
                    id='name'
                    aria-invalid={fieldState.invalid}
                    placeholder='John Doe'
                    autoComplete='off'
                    type='name'
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
            <Controller
              name='confirmPassword'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='confirmPassword'>
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id='confirmPassword'
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
          <div className='mt-6'>
            <Button
              disabled={form.formState.isSubmitting}
              className='cursor-pointer w-full'
            >
              {form.formState.isSubmitting ? (
                <>
                  <Spinner className='size-6' />
                  Signing up...
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </div>
          <p className='text-sm mt-4'>
            Already have an account?{' '}
            <Link href='/sign-in' className='text-blue-400'>
              Sign In
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
