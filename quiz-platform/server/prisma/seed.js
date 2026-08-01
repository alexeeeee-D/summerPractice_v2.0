import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    const categories = [
        { name: "Java" },
        { name: "JavaScript" },
        { name: "Python" },
        { name: "SQL" },
        { name: "HTML & CSS" },
        { name: "Алгоритмы" },
        { name: "Общие знания" },
        { name: "История" },
        { name: "География" },
        { name: "Спорт" },
        { name: "Кино" },
        { name: "Музыка" }
    ];

    for (const category of categories) {

        await prisma.category.upsert({
            where: {
                name: category.name
            },
            update: {},
            create: category
        });

    }

    console.log("✅ Categories successfully created");
}

main()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
