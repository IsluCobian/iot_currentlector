import DataDisplay from "@/components/DataDisplay";
import ChartComponent from "@/components/GraphDisplay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <Tabs
        defaultValue="lecture"
        className="flex w-full flex-col items-center"
      >
        <TabsList>
          <TabsTrigger value="lecture">Lectura</TabsTrigger>
          <TabsTrigger value="graphs">Grafica</TabsTrigger>
        </TabsList>
        <TabsContent value="lecture" className="w-full mt-4">
          <DataDisplay />
        </TabsContent>
        <TabsContent value="graphs" className="w-full mt-4">
          <ChartComponent />
        </TabsContent>
      </Tabs>
    </main>
  );
}
