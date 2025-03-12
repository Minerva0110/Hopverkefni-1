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

const vefforritCategory = await prisma.category.upsert({
  where: { title: 'vefforrit' },
  update: {},
  create: { title: 'vefforrit' },
});

const skipulagCategory = await prisma.category.upsert({
  where: { title: 'skipulag' },
  update: {},
  create: { title: 'skipulag' },
});

const vefthjonusturCategory = await prisma.category.upsert({
  where: { title: 'vefþjónustur' },
  update: {},
  create: { title: 'vefþjónustur' },
});

const notandi = await prisma.user.create({
  data: {
    username: 'Pétur',
    email: 'Minerva@example.com',
    password: 'öruggtlykilorð1111',
    role: 'superadmin3',
    notes: {
      create: [
        { title: 'Muna að uppfæra TypeScript', content: 'Laga seed.ts', isPublic: true },
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
    {
      title: 'Útfæra prótótýpu viðmót fyrir v1 af vefforriti',
      description: '',
      categoryId: vefforritCategory.id,
      tags: ['framendi', 'html'],
      priority: false,
      modified: new Date(1635638400000),
      due: new Date(1638648500000),
      deleted: false,
      completed: false,
    },
    {
      title: 'Bóka planning fyrir sprett #4',
      description: 'Eftir retro fyrir sprett #3',
      categoryId: skipulagCategory.id,
      tags: ['fundir'],
      priority: false,
      modified: new Date(1635638400000),
      due: new Date(1636648500000),
      deleted: false,
      completed: false,
    },
    {
      title: 'Test task fyrir deleted',
      description: 'vefþjónustur',
      categoryId: null,
      tags: [],
      priority: false,
      modified: new Date(1635638400000),
      due: null,
      deleted: true,
      completed: false,
    },
    {
      title: 'Test task sem er lokið',
      description: '',
      categoryId: vefforritCategory.id,
      tags: [],
      priority: false,
      modified: new Date(1635638400000),
      due: new Date(1635638500000),
      deleted: false,
      completed: true,
    },
    {
      title: 'Hönnun á útliti',
      description: 'Við verðum að fá alvöru hönnun, þetta gengur ekki lengur',
      categoryId: vefforritCategory.id,
      tags: ['framendi', 'hönnun'],
      priority: false,
      modified: new Date(1635638400000),
      due: null,
      deleted: false,
      completed: false,
    },
    {
      title: 'Útfæra nýtt gagnagrunnsskema',
      description: 'Samræma við nýjustu hönnunarskjöl',
      categoryId: vefthjonusturCategory.id,
      tags: ['bakendi', 'gagnagrunnur'],
      priority: false,
      modified: new Date(1635638400000),
      due: new Date(1636848500000),
      deleted: false,
      completed: false,
    },
    {
      title: 'v1.5 af vefþjónustuskilum',
      description: 'Farið að blokka næsta sprett',
      categoryId: vefthjonusturCategory.id,
      tags: ['bakendi'],
      priority: false,
      modified: new Date(1635638400000),
      due: new Date(1636498500000),
      deleted: false,
      completed: false,
    },
    {
      title: 'Ráða verkefnastjóra',
      description: 'Við erum mjög óskipulögð, sem er mjög kaldhæðið miðað við verkefnið sem við erum að vinna',
      categoryId: skipulagCategory.id,
      tags: ['ráðning'],
      priority: false,
      modified: new Date(1635638400000),
      due: new Date(1635498500000),
      deleted: false,
      completed: false,
    },
    {
      title: 'Velja framendaframework til að vinna í',
      description: 'Vanilla JS er fínt, en við vinnum þetta hraðar ef við veljum gott framework',
      categoryId: vefforritCategory.id,
      tags: ['framendi', 'framework'],
      priority: false,
      modified: new Date(1635638400000),
      due: null,
      deleted: false,
      completed: false,
    },
  ]
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
