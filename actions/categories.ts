'use server';

import { authSession } from '@/lib/auth-utils';
import prisma from '@/lib/db';

export async function getCategories() {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User not found!');
    }

    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return categories;
  } catch (error) {
    console.error(error);
  }
}

export async function createCategory(name: string) {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User not found!');
    }

    const category = await prisma.category.create({
      data: {
        name: name,
        userId: session.user.id,
      },
    });

    return category;
  } catch (error) {
    console.error(error);
  }
}
