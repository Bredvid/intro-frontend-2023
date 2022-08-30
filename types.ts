import { Prisma } from "@prisma/client";
const postWithAuthor = Prisma.validator<Prisma.PostArgs>()({
  include: { author: true },
});

export type PostWithAuthor = Prisma.PostGetPayload<typeof postWithAuthor>;

export type PostsWithAuthor = PostWithAuthor[];
