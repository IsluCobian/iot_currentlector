"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllData() {
  const data = await prisma.lectorEntry.findMany({
    orderBy: {
      submitAt: "asc",
    },
  });
  return data;
}
