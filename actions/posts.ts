import { authSession } from '@/lib/auth-utils';
import prisma from '@/lib/db';

export async function getPost(id: string) {
  console.log(id);
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User not found!');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return post;
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong!');
  }
}
