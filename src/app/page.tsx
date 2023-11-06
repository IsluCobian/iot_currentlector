import DataDisplay from "@/components/DataDisplay";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <DataDisplay />
    </main>
  );
}
