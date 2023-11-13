import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let storedData: string | null = null;

export async function POST(req: any) {
  // Parse the incoming JSON data from the request body
  const data = await req.json();
  const savedEntry = await prisma.lectorEntry.create({
    data: data,
  });
  storedData = data;
  // Send a response back to the ESP32
  return NextResponse.json({ data });
}

export async function GET(req: any) {
  // Parse the incoming JSON data from the request body
  // Send a response back to the ESP32
  return NextResponse.json({ data: storedData });
}
