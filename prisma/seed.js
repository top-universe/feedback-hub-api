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
        pass: "$argon2id$v=19$m=65536,t=3,p=4$L/7ey1k6PnzKAspbopwsLA$qnA6hFgR7VG9Q7nJ8G4IF/vygKJrwgGjL/bW6FKzzxM",
      },
      {
        username: "Zeddic",
        email: "Zeddic@feedback.com",
        status: "active",
        pass: "$argon2id$v=19$m=65536,t=3,p=4$L/7ey1k6PnzKAspbopwsLA$qnA6hFgR7VG9Q7nJ8G4IF/vygKJrwgGjL/bW6FKzzxM",
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
