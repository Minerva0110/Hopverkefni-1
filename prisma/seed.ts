import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding database...");

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
    users.push(user);
  }

  for (let i = 0; i < 5; i++) {
    const category = await prisma.category.create({
      data: {
        name: faker.word.noun(),
      },
    });
    categories.push(category);
  }

  for (let i = 0; i < 40; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    if (!randomUser) continue;

    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    const note = await prisma.note.create({
      data: {
        userId: randomUser.id,
        title: faker.lorem.words(3),
        content: faker.lorem.sentence(),
        isPublic: faker.datatype.boolean(),
        createdAt: new Date(),
        categoryId: randomCategory ? randomCategory.id : null,
      },
    });
  }

  console.log("Seeding complete!");
}

seed()
  .catch((e) => console.error("Seeding failed:", e))
  .finally(() => prisma.$disconnect());
