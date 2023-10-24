const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const argon2 = require("argon2");

async function main() {
  try {
    // user one
    await prisma.user.create({
      data: {
        username: "MagicMarv",
        email: "MagicMarv@feedback.com",
        password: {
          create: {
            hashed: await argon2.hash("12345678"),
          },
        },
      },
    });

    // user two
    await prisma.user.create({
      data: {
        username: "Zeddic",
        email: "Zeddic@feedback.com",
        password: {
          create: {
            hashed: await argon2.hash("12345678"),
          },
        },
      },
    });

    console.log("Seed script completed successfully");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
