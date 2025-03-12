import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.resolve(__dirname, '../data/data.json');
const rawData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(rawData);

const prisma = new PrismaClient();

async function main() {
 
  for (const category of jsonData.categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: { title: category.title },
      create: { id: category.id, title: category.title },
    });
  }

  for (const item of jsonData.items) {
    await prisma.item.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        description: item.description,
        categoryId: item.category,
      },
      create: {
        id: item.id,
        title: item.title,
        description: item.description,
        categoryId: item.category,
      },
    });
  }
}

const hönnunarFlokkur = await prisma.category.upsert({
  where: { title: 'Hönnun' },
  update: {},
  create: { title: 'Hönnun' },
});

const þróunarFlokkur = await prisma.category.upsert({
  where: { title: 'Þróun' },
  update: {},
  create: { title: 'Þróun' },
});

const stjórnunFlokkur = await prisma.category.upsert({
  where: { title: 'Stjórnun' },
  update: {},
  create: { title: 'Stjórnun' },
});


const notandi = await prisma.user.create({
  data: {
    username: 'Rafael',
    email: 'Rafael@example.com',
    password: 'öruggtlykilorð111',
    role: 'superadmin2',
    notes: {
      create: [
        { title: 'Uppfæra Prisma', content: 'Laga seed.ts', isPublic: true },
        { title: 'Meta tól', content: 'Kanna hentugar lausnir', isPublic: false },
      ],
    },
  },
});

await prisma.item.createMany({
  data: [
    {
      title: 'Endurnýja viðmótshönnun',
      description: 'Ný hönnun fyrir notendaupplifun',
      categoryId: hönnunarFlokkur.id,
      tags: ['UI', 'Hönnun'],
      priority: true,
      due: new Date('2025-07-01'),
    },
    {
      title: 'Innleiða OAuth auðkenningu',
      description: 'Nota OAuth fyrir öruggari innskráningar',
      categoryId: þróunarFlokkur.id,
      tags: ['Öryggi', 'Auth'],
      priority: true,
      due: new Date('2025-06-01'),
    },
    {
      title: 'Skipuleggja helgarhóp fund',
      description: 'Skipuleggja markmið og verkefni fyrir næstu mánuði',
      categoryId: stjórnunFlokkur.id,
      tags: ['Stjórnun', 'Fundur'],
      priority: false,
      due: new Date('2025-05-15'),
    },
    {
      title: 'Bæta við nýrri eiginleika á skráningarsíðu',
      description: 'Bæta við valmöguleikum fyrir félagsaðild',
      categoryId: hönnunarFlokkur.id,
      tags: ['UX', 'Hönnun'],
      priority: false,
      due: null,
    },
    {
      title: 'Einingaprófanir á bakenda-API',
      description: 'Nota Jest fyrir einingaprófanir á nýjum endapunktum',
      categoryId: þróunarFlokkur.id,
      tags: ['Testing', 'Jest'],
      priority: true,
      due: new Date('2025-06-15'),
    },
  ],
});

console.log('Gögn hafa verið skráð í gagnagrunn.');

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
