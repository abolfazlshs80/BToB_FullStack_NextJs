import prisma from "@/lib/prisma";


async function main() {
  const roles = [
    "Admin",
    "User",
    "Manager",
  ];

  for (const name of roles) {
    await prisma.role.upsert({
      where: {
        name,
      },
      update: {},
      create: {
        name,
      },
    });
  }

  console.log("Roles seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });