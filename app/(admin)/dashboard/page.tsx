import { authIsRequired } from '@/lib/auth-utils';

export default async function DashboardPage() {
  await authIsRequired();

  return <div>DashboardPage</div>;
}
