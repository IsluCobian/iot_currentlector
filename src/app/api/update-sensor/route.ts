import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let storedData: string | null = null;

export async function POST(req: any) {
  const data = await req.json();
  const savedEntry = await prisma.lectorEntry.create({
    data: data,
  });
  storedData = data;
  return NextResponse.json({ data });
}

export async function GET(req: any) {
  return NextResponse.json({ data: storedData });
}
