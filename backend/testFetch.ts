import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fetchNotes() {
  const usersWithNotes = await prisma.user.findMany({
    include: {
      notes: true, // Nær í allar tengdar "notes" fyrir hvern notanda
    },
  });

  console.log(JSON.stringify(usersWithNotes, null, 2));
}

fetchNotes()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
