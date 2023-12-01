"use client";

import { useEffect, useState } from "react";
import { ArcGauge } from "@progress/kendo-react-gauges";

export default function DataDisplay() {
  const [sensorData, setSensorData] = useState<any>(null);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/update-sensor"); // Adjust the API endpoint URL as needed
      const data = await response.json();
      setSensorData(data.data);
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

  return (
    <div className="flex w-full flex-col items-center">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl mb-12 font-semibold tracking-tight first:mt-0">
        Sensor Data
      </h2>
      {sensorData !== null ? (
        <div className="flex w-full text-center items-center">
          <div className="basis-1/3">
            <ArcGauge
              value={sensorData.current}
              color="#C70039"
              scale={{ min: 0, max: 3 }}
            />
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              {sensorData.current} Amps
            </p>
          </div>
          <div className="basis-1/3">
            <ArcGauge
              value={sensorData.power}
              color="#FFC300"
              scale={{ min: 0, max: 100 }}
            />
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              {sensorData.power} Watts
            </p>
          </div>
          <div className="basis-1/3">
            <ArcGauge
              value={sensorData.energy}
              color="#0C5690"
              scale={{ min: 0, max: 50 }}
            />
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              {sensorData.energy} Energy
            </p>
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
