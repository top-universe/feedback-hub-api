const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const argon2 = require("argon2");

async function main() {
  try {
    // Define your sample data
    const users = [
      {
        username: "MagicMarv",
        email: "MagicMarv@feedback.com",
        password: await argon2.hash(12345678),
      },
      {
        username: "Zeddic",
        email: "Zeddic@feedback.com",
        password: await argon2.hash(12345678),
      },
    ];

    // Use Prisma to create records
    for (const userData of users) {
      await prisma.user.create({
        data: userData,
      });
    }

    console.log("Seed script completed successfully");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
