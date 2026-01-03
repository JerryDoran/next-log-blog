import { VerificationEmail } from '@/components/emails/verification-email';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailProps = {
  to: string;
  verificationUrl: string;
  userName: string;
};

export const sendVerificationEmail = async ({
  to,
  verificationUrl,
  userName,
}: EmailProps) => {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject: 'Welcome to NextLog! Please verify your email address',
    react: (
      <VerificationEmail
        verificationUrl={verificationUrl}
        userName={userName}
      />
    ),
  });
};
