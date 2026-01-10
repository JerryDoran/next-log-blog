'use server';

import { CategoryProps } from '@/hooks/use-categories';
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
    throw new Error('Something went wrong!');
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
    throw new Error('Something went wrong!');
  }
}

export async function updateCategory(category: CategoryProps) {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User not found!');
    }

    const categoryItem = await prisma.category.update({
      where: {
        id: category.id,
      },
      data: {
        name: category.name,
      },
    });

    return categoryItem;
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong!');
  }
}

export async function deleteCategory(id: string) {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User not found!');
    }

    await prisma.category.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong!');
  }
}
