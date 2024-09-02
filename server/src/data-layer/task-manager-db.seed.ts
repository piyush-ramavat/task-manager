import { PrismaClient } from "@prisma/client";
import { Users } from "./seed/users.seed";

const prisma = new PrismaClient();

async function seed() {
  await Promise.all(
    Users.map((entry) =>
      prisma.user.upsert({
        where: { id: entry.id },
        update: { name: entry.name, email: entry.email },
        create: entry,
      })
    )
  );
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
