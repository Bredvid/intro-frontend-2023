import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Rita Drita",
    email: "r.d@gmail.com",
    posts: {
      create: [
        {
          title: "Solen skinner og her sitter vi",
          intro: "Intro , lorem ipsum dolor sit.dffladfk  dolor sit", //
          content:
            "lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum", //
          published: true,
        },
      ],
    },
  },
  {
    name: "Nils Nilsen",
    email: "n.n@gmail.com",
    posts: {
      create: [
        {
          title: "Dublin er gøy",
          intro: "Intro , lorem ipsum dolor sit.dffladfk  dolor sit", //
          content:
            "lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum", //
          published: true,
        },
      ],
    },
  },
  {
    name: "Ola Normann",
    email: "o.n@gmail.com",
    posts: {
      create: [
        {
          title: "Velkommen til deg",
          intro: "Intro , lorem ipsum dolor sit.dffladfk  dolor sit", //
          content:
            "lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum", //
          published: true,
        },
        {
          title: "Jeg er ikke published",
          intro: "Intro , lorem ipsum dolor sit.dffladfk  dolor sit", //
          content:
            "lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum", //
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const avatar = `https://ui-avatars.com/api/?background=random&name=${String(
      u.name,
    )
      .split(" ")
      .join("+")}`;
    const user = await prisma.user.create({
      data: { ...u, avatar },
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
