import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding database...");

  await prisma.note.deleteMany();
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();

  const categories = await prisma.category.createMany({
    data: [
      { title: "Vefforrit" },
      { title: "Skipulag" },
      { title: "Vefþjónustur" }
    ]
  });
  console.log("Categories added.");

  const categoryMap = await prisma.category.findMany();

  function getCategoryId(title: string) {
    return categoryMap.find((c) => c.title === title)?.id || null;
  }

  await prisma.item.createMany({
    data: [
      {
        title: "Útfæra prótótýpu viðmót fyrir v1 af vefforriti",
        description: "",
        categoryId: getCategoryId("Vefforrit"),
        tags: ["framendi", "html"],
        priority: false,
        modified: 1635638400000,
        due: 1638648500000,
        deleted: false,
        completed: false,
      },
      {
        title: "Bóka planning fyrir sprett #4",
        description: "Eftir retro fyrir sprett #3",
        categoryId: getCategoryId("Skipulag"),
        tags: ["fundir"],
        priority: false,
        modified: 1635638400000,
        due: 1636648500000,
        deleted: false,
        completed: false,
      },
      {
        title: "Test task fyrir deleted",
        description: "vefþjónustur",
        categoryId: null,
        tags: [],
        priority: false,
        modified: 1635638400000,
        due: null,
        deleted: true,
        completed: false,
      },
      {
        title: "Test task sem er lokið",
        description: "",
        categoryId: getCategoryId("Vefforrit"),
        tags: [],
        priority: false,
        modified: 1635638400000,
        due: 1635638500000,
        deleted: false,
        completed: true,
      },
      {
        title: "Hönnun á útliti",
        description: "Við verðum að fá alvöru hönnun, þetta gengur ekki lengur",
        categoryId: getCategoryId("Vefforrit"),
        tags: ["framendi", "hönnun"],
        priority: false,
        modified: 1635638400000,
        due: null,
        deleted: false,
        completed: false,
      },
      {
        title: "Útfæra nýtt gagnagrunnsskema",
        description: "Samræma við nýjustu hönnunarskjöl",
        categoryId: getCategoryId("Vefþjónustur"),
        tags: ["bakendi", "gagnagrunnur"],
        priority: false,
        modified: 1635638400000,
        due: 1636848500000,
        deleted: false,
        completed: false,
      },
      {
        title: "v1.5 af vefþjónustuskilum",
        description: "Farið að blokka næsta sprett",
        categoryId: getCategoryId("Vefþjónustur"),
        tags: ["bakendi"],
        priority: false,
        modified: 1635638400000,
        due: 1636498500000,
        deleted: false,
        completed: false,
      },
      {
        title: "Ráða verkefnastjóra",
        description: "Við erum mjög óskipulögð, sem er mjög kaldhæðið miðað við verkefnið sem við erum að vinna",
        categoryId: getCategoryId("Skipulag"),
        tags: ["ráðning"],
        priority: false,
        modified: 1635638400000,
        due: 1635498500000,
        deleted: false,
        completed: false,
      },
      {
        title: "Velja framendaframework til að vinna í",
        description: "Vanilla JS er fínt, en við vinnum þetta hraðar ef við veljum gott framework",
        categoryId: getCategoryId("Vefforrit"),
        tags: ["framendi", "framework"],
        priority: false,
        modified: 1635638400000,
        due: null,
        deleted: false,
        completed: false,
      }
    ],
  });

  console.log("Items added.");
}

seed()
  .catch((e) => console.error("Seeding failed:", e))
  .finally(() => prisma.$disconnect());
