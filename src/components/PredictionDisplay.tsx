"use client";

import { prediction } from "@/lib/actions";
import { useEffect, useState } from "react";

export default function PredictionDisplay() {
  const [predictedConsumption, setPredictedConsumption] = useState<
    number | null
  >(null);

  useEffect(() => {
    // Obtener el mes actual
    const currentMonth = new Date().getMonth() + 1;

    // Llamar a la función prediction con el mes actual
    prediction(currentMonth)
      .then((result) => {
        setPredictedConsumption(result.energyConsumption);
      })
      .catch((error) => {
        console.error("Error fetching prediction:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-5 mt-5">
      <h3 className="text-sm text-muted-foreground">
        Prevision de consumo mensual
      </h3>
      <div className="flex items-center justify-center text-center w-36 h-36 text-xl rounded-full p-4 border-8 border-teal-400 text-teal-400 font-semibold">
        {predictedConsumption !== null && (
          <p>
            {predictedConsumption}
            <br />
            kWh
          </p>
        )}
      </div>
    </div>
  );
}
