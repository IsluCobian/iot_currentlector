"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { LectorEntry } from "@prisma/client";
import { getAllData } from "@/lib/actions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  entries?: LectorEntry[];
}

const ChartComponent: React.FC<ChartProps> = ({ entries: initialEntries }) => {
  const [entries, setEntries] = useState<LectorEntry[]>(initialEntries || []);

  const fetchData = async () => {
    try {
      const data = await getAllData();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data on component mount and set up a periodic polling
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 4500); // Adjust the polling interval as needed

    return () => clearInterval(intervalId);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
  };

  const data = {
    labels: entries.map(
      (entry) =>
        entry.submitAt.getHours() +
        ":" +
        entry.submitAt.getMinutes() +
        ":" +
        entry.submitAt.getSeconds()
    ),
    datasets: [
      {
        label: "Current",
        data: entries.map((entry) => entry.current),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Energy",
        data: entries.map((entry) => entry.energy),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const power = {
    labels: entries.map(
      (entry) =>
        entry.submitAt.getHours() +
        ":" +
        entry.submitAt.getMinutes() +
        ":" +
        entry.submitAt.getSeconds()
    ),
    datasets: [
      {
        label: "Power",
        data: entries.map((entry) => entry.power),
        borderColor: "rgba(192,75,192,1)",
        fill: false,
      },
    ],
  };

  return (
    <div className="flex w-full flex-col space-y-4 items-center">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {entries.length > 0 &&
          new Date(entries[entries.length - 1].submitAt).toLocaleDateString(
            "es-ES",
            { weekday: "long" }
          )}
      </h2>
      <Line height={"40%"} options={options} data={power} />
      <Line height={"40%"} options={options} data={data} />
    </div>
  );
};

export default ChartComponent;
