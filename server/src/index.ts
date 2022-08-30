import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import express from "express";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(cors());

app.use(express.json());

app.post(`/login`, async (req, res) => {
  const { email } = req.body;

  try {
    const result = await prisma.user.findFirst({
      where: { email: email },
    });
    res.json(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
});

app.post(`/signup`, async (req, res) => {
  const { name, email, posts } = req.body;

  const avatar = `https://ui-avatars.com/api/?background=random&name=${String(
    name,
  )
    .split(" ")
    .join("+")}`;
  const postData = posts?.map((post: Prisma.PostCreateInput) => {
    return { title: post?.title, content: post?.content };
  });

  try {
    const result = await prisma.user.create({
      data: {
        name,
        email,
        avatar,
        posts: {
          create: postData,
        },
      },
    });
    res.json(result);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(400)
          .json({ message: "Epost eksisterer allerede", code: e.code });
      }
    }
    res.status(400).json({ message: "En ukjent feil oppstod" });
  }
});

app.post(`/post`, async (req, res) => {
  const { title, intro, content, authorEmail, published } =
    req.body as Prisma.PostCreateWithoutAuthorInput & { authorEmail: string };
  try {
    const result = await prisma.post.create({
      data: {
        title,
        content,
        intro,
        published,
        author: { connect: { email: authorEmail } },
      },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ message: "En ukjent feil oppstod" });
  }
});

app.put("/post/:id/views", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.update({
      where: { id: id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    res.json(post);
  } catch (error) {
    res.status(400).json({ message: `Post med ID ${id} eksiterer ikke` });
  }
});

app.put("/publish/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postData = await prisma.post.findUnique({
      where: { id: id },
      select: {
        published: true,
      },
    });

    const updatedPost = await prisma.post.update({
      where: { id: id || undefined },
      data: { published: !postData?.published },
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: `Post med ID ${id} eksiterer ikke` });
  }
});

app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: {
      id: id,
    },
  });
  res.json(post);
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/user/:id/drafts", async (req, res) => {
  const { id } = req.params;

  const drafts = await prisma.user
    .findUnique({
      where: {
        id: id,
      },
    })
    .posts({
      where: { published: false },
    });

  res.json(drafts);
});

app.get(`/post/:id`, async (req, res) => {
  const { id }: { id?: string } = req.params;

  const post = await prisma.post.findUnique({
    where: { id: id },
  });
  res.json(post);
});

app.get("/feed", async (req, res) => {
  const { searchString, skip, take, orderBy } = req.query;

  const searchOr: Prisma.PostWhereInput = searchString
    ? {
        OR: [
          { title: { contains: searchString as string } },
          { content: { contains: searchString as string } },
          { intro: { contains: searchString as string } },
          { author: { email: { contains: searchString as string } } },
        ],
      }
    : {};

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...searchOr,
    },

    include: { author: true },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      updatedAt: orderBy as Prisma.SortOrder,
    },
  });

  res.json(posts);
});

app.get("/private-feed", async (req, res) => {
  const { searchString, skip, take, orderBy, viewerId } = req.query;
  console.log("viewerId", viewerId);

  const searchOr: Prisma.PostWhereInput = searchString
    ? {
        OR: [
          { title: { contains: searchString as string } },
          { content: { contains: searchString as string } },
          { intro: { contains: searchString as string } },
          { author: { email: { contains: searchString as string } } },
        ],
      }
    : {};

  const posts = await prisma.post.findMany({
    where: {
      ...searchOr,
      published: false,
      authorId: { equals: viewerId as string },
    },

    include: { author: true },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      updatedAt: orderBy as Prisma.SortOrder,
    },
  });

  res.json(posts);
});

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
);
