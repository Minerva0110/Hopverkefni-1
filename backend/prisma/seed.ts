import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const designCategory = await prisma.category.create({
    data: { title: 'Hönnun' },
  });

  const developmentCategory = await prisma.category.create({
    data: { title: 'Forritun' },
  });

  const managementCategory = await prisma.category.create({
    data: { title: 'Stjórnun' },
  });

  const user = await prisma.user.create({
    data: {
      username: 'developer123',
      email: 'dev@example.com',
      password: 'hashedpassword123',
      role: 'admin',
      notes: {
        create: [
          { title: 'Muna að uppfæra TypeScript', content: 'Ný útgáfa kom út', isPublic: true },
          { title: 'Kanna React Server Components', content: 'Athuga hvort það hentar verkefninu okkar', isPublic: false },
        ],
      },
    },
  });

  await prisma.item.createMany({
    data: [
      {
        title: 'Endurbæta lógó og litapallettu',
        description: 'Nýtt branding fyrir vefsíðuna',
        categoryId: designCategory.id,
        tags: ['UI', 'Branding'],
        priority: true,
        due: new Date('2025-06-01'),
      },
      {
        title: 'Bæta við JWT auðkenningu',
        description: 'Til að bæta öryggi API þjónustunnar',
        categoryId: developmentCategory.id,
        tags: ['Öryggi', 'Auth'],
        priority: false,
        due: new Date('2025-05-20'),
      },
      {
        title: 'Skipuleggja næsta sprint',
        description: 'Ákveða markmið og verkefni fyrir næstu viku',
        categoryId: managementCategory.id,
        tags: ['Scrum', 'Skipulag'],
        priority: true,
        due: new Date('2025-04-10'),
      },
      {
        title: 'Hanna notendaskráningu',
        description: 'Bæta við nýjum skráningarflæði',
        categoryId: designCategory.id,
        tags: ['UI', 'UX'],
        priority: false,
        due: null,
      },
      {
        title: 'Gera prófanir á API',
        description: 'Nota Jest og Supertest fyrir einingaprófanir',
        categoryId: developmentCategory.id,
        tags: ['Testing', 'Jest'],
        priority: false,
        due: new Date('2025-05-25'),
      },
    ],
  });

  console.log('Gögn hafa verið sett í gagnagrunninn.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
