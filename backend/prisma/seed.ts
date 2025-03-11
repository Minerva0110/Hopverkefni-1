import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding database...");

  await prisma.note.deleteMany(); 
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();

  const users: { id: number }[] = [];
  const categories: { id: number }[] = [];

  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: "user",
      },
    });
    users.push({ id: Number(user.id) });
  }

  for (let i = 0; i < 5; i++) {
    const category = await prisma.category.create({
      data: { name: faker.word.noun() },
    });
    categories.push({ id: Number(category.id) }); 
  }

  for (let i = 0; i < 40; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    await prisma.note.create({
      data: {
        userId: Number(randomUser.id), 
        title: faker.lorem.words(3),
        content: faker.lorem.sentence(),
        isPublic: faker.datatype.boolean(),
        createdAt: new Date(),
        categoryId: randomCategory ? Number(randomCategory.id) : null,
      },
    });
  }

  console.log("Seeding complete!");
}

seed()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
