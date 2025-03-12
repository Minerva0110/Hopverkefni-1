import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.item.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const password1 = await bcrypt.hash("password123", 10);
  const password2 = await bcrypt.hash("securepass", 10);

  const testUser1 = await prisma.user.upsert({
    where: { email: "test1@example.com" },
    update: {},
    create: {
      email: "test1@example.com",
      username: "test1",
      password: password1,
      role: "user",
    },
  });

  const testUser2 = await prisma.user.upsert({
    where: { email: "test2@example.com" },
    update: {},
    create: {
      email: "test2@example.com",
      username: "test2",
      password: password2,
      role: "user",
    },
  });

  const category1 = await prisma.category.create({
    data: { title: "Þróun" },
  });

  const category2 = await prisma.category.create({
    data: { title: "Hönnun" }, 
  });

  const category3 = await prisma.category.create({
    data: { title: "Verkefnastjórnun" }, 
  });
  const categories = [
    "Framendi",      
    "Bakendi",        
  ];

  for (const title of categories) {
    await prisma.category.upsert({
      where: { title },
      update: {},
      create: { title },
    });
  }

  await prisma.item.createMany({
    data: [
      {
        title: "Laga auðkenningarvillu",
        description: "Leysa innskráningarvandamál í API",
        categoryId: category1.id, 
        priority: true,
        due: new Date("2025-06-01"),
      },
      {
        title: "Endurhanna forsíðu",
        description: "Gera forsíðuna meira sjónrænt aðlaðandi",
        categoryId: category2.id, 
        priority: false,
        due: new Date("2025-07-15"),
      },
      {
        title: "Skipuleggja næsta sprint",
        description: "Ákveða hvaða verkefni fara í næsta þróunartímabil",
        categoryId: category3.id, 
        priority: true,
        due: new Date("2025-06-10"),
      },
      {
        title: "Bæta við dökkum ham",
        description: "Gera vefinn betri fyrir notendur í myrkri",
        categoryId: category2.id,
        priority: false,
        due: new Date("2025-08-01"),
      },
      {
        title: "Innleiða JWT auðkenningu",
        description: "Nota JSON Web Tokens fyrir öruggari auðkenningu",
        categoryId: category1.id,
        priority: true,
        due: new Date("2025-06-20"),
      },
      {
        title: "Laga brotna tengla á vefnum",
        description: "Skanna og laga allar 404 síður",
        categoryId: category3.id,
        priority: false,
        due: new Date("2025-07-05"),
      },
      {
        title: "Bóka viðskiptavinaviðtal",
        description: "Fá endurgjöf um nýju hönnunina",
        categoryId: category3.id,
        priority: true,
        due: new Date("2025-06-15"),
      },
      {
        title: "Gera einingaprófanir á bakenda API",
        description: "Nota Jest til að prófa endapunkta",
        categoryId: category1.id,
        priority: true,
        due: new Date("2025-06-25"),
      },
      {
        title: "Skipuleggja vinnuferli",
        description: "Koma á betri ferlum fyrir forritara",
        categoryId: category3.id, 
        priority: false,
        due: new Date("2025-06-30"),
      },
    ],
  });
  

  console.log("successful!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
