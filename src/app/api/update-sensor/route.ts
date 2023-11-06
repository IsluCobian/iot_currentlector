import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import EventSource from "eventsource";
export const dynamic = "force-dynamic";

const sensorData: any[] = [];

let storedData: string | null = null;

export async function POST(req: any) {
  // Parse the incoming JSON data from the request body
  const data = await req.json();
  storedData = data;
  // Send a response back to the ESP32
  return NextResponse.json({ data });
}

export async function GET(req: any) {
  // Parse the incoming JSON data from the request body
  // Send a response back to the ESP32
  return NextResponse.json({ data: storedData });
}
