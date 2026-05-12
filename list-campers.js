// list-campers.js
const prisma = require('./app/lib/prisma').default;

async function main() {
  try {
    const campers = await prisma.camper.findMany();
    console.log('--- CAMPERS IN DB ---');
    campers.forEach(c => console.log(`ID: ${c.id} | Name: ${c.name}`));
    console.log('---------------------');
  } catch (err) {
    console.error("Error fetching campers:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
