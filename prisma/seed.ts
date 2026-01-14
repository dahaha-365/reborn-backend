import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';

// 不添加任何类型注解，让 TypeScript 自动推断
const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: pool });

async function main() {
  console.log(`Begin seeding ...`);
  const superAdminRole = await prisma.adminUserRole.upsert({
    where: { slug: 'super_admin' },
    update: {},
    create: {
      slug: 'super_admin',
      role: 'Super Admin',
      summary: 'Super administrator has full access to the system.',
    },
  });
  await prisma.adminUser.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      username: 'admin',
      displayName: 'Administrator',
      password: bcrypt.hashSync('123456', 10),
      isSuperAdmin: true,
      canLogin: true,
      roles: {
        create: {
          roleId: superAdminRole.id,
          assignedBy: 'interactive-seed',
        },
      },
    },
  });
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
