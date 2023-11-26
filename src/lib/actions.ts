"use server";

import { PrismaClient } from "@prisma/client";
import { exec } from "child_process";

const prisma = new PrismaClient();

export async function getAllData() {
  const data = await prisma.lectorEntry.findMany({
    take: 60,
    orderBy: {
      submitAt: "desc",
    },
  });
  return data.reverse();
}

export async function prediction(
  month: number
): Promise<{ energyConsumption: number }> {
  return new Promise((resolve, reject) => {
    exec(`py predict.py ${month}`, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        const result = stdout.trim();
        const energyConsumption = +result;
        resolve({ energyConsumption });
      }
    });
  });
}
