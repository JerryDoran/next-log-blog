'use server';

import { PostFormValues } from '@/components/posts/post-form';
import { PostStatus } from '@/generated/prisma/enums';
import { authSession } from '@/lib/auth-utils';
import prisma from '@/lib/db';

export async function getPosts() {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User not found!');
    }

    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });
    return posts;
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong!');
  }
}

export async function getPostsByUser() {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User not found!');
    }

    const posts = await prisma.post.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return posts;
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong!');
  }
}

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

export async function createPost(postParams: PostFormValues) {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User not found!');
    }

    const { categories, tags, id, ...rest } = postParams;
    const data = { ...rest, tags: tags.map((tag) => tag.value) };

    const post = await prisma.post.create({
      data: {
        userId: session.user.id,
        ...data,
        status: data.status as PostStatus,
      },
    });

    return post;
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong!');
  }
}

export async function updatePost(postParams: PostFormValues) {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User not found!');
    }

    const { categories, tags, id, ...rest } = postParams;
    const data = { ...rest, tags: tags.map((tag) => tag.value) };

    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        ...data,
        userId: session.user.id,
        status: data.status as PostStatus,
      },
    });

    return post;
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong!');
  }
}

export async function deletePost(postId: string) {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User not found!');
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong!');
  }
}
