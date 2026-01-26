'use server';

import { PostFormValues } from '@/components/posts/post-form';
import { PostStatus } from '@/generated/prisma/enums';
import { authSession } from '@/lib/auth-utils';
import prisma from '@/lib/db';

const PAGE_SIZE = 10;

export async function getPosts(page: number) {
  const skip = (page - 1) * PAGE_SIZE;

  // Get the current user
  const session = await authSession();

  const currentUser = session?.user.id
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          favorites: true,
        },
      })
    : null;

  try {
    const [posts, totalCount] = await prisma.$transaction([
      prisma.post.findMany({
        skip: skip,
        take: PAGE_SIZE,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              favorites: true,
            },
          },
          category: true,
        },
      }),
      prisma.post.count(),
    ]);

    return {
      posts: posts.map((post) => ({
        ...post,
        favorite: currentUser?.favorites ?? [],
      })),
      totalPages: Math.ceil(totalCount / PAGE_SIZE),
      currentPage: page,
    };
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
