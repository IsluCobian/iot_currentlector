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
import { LectorEntry, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await prisma.lectorEntry.findMany({
          orderBy: {
            submitAt: "asc",
          },
        });
        setEntries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data when the component mounts
    fetchData();
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
    labels: entries.map((entry) => entry.submitAt.toString()),
    datasets: [
      {
        label: "Current",
        data: entries.map((entry) => entry.current),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Power",
        data: entries.map((entry) => entry.power),
        borderColor: "rgba(192,75,192,1)",
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

  return <Line options={options} data={data} />;
};

export default ChartComponent;
