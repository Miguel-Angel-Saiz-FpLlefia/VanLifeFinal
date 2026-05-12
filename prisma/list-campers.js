const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const campers = await prisma.camper.findMany();
  console.log('--- CAMPERS IN DB ---');
  campers.forEach(c => console.log(`ID: ${c.id} | Name: ${c.name}`));
  console.log('---------------------');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
