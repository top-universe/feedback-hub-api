const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const argon2 = require("argon2");

async function main() {
  try {
    const userLists = [
      {
        username: "MagicMarv",
        email: "MagicMarv@feedback.com",
        status: "active",
        pass: await argon2.hash("12345"),
      },
      {
        username: "Zeddic",
        email: "Zeddic@feedback.com",
        status: "active",
        pass: await argon2.hash("12345"),
      },
    ];

    for (let user of userLists) {
      let createdUser = await prisma.user.create({ data: user });
      console.log(`Created User with id: ${createdUser.id}`);
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
