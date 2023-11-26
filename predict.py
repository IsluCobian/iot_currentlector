# model_script.py
import pandas as pd
import numpy as np
from joblib import load
import sys

# Function to make predictions
def estimate_energy_consumption(month):
    model = load('energy_model.joblib')
    data = pd.DataFrame({
        'month': month,
        'day': range(1, pd.Timestamp.now().days_in_month + 1)
    })

    prediction = model.predict(data)
    total_energy_consumption = round(np.sum(prediction),3)
    
    return total_energy_consumption

if __name__ == "__main__":
    # Read input data from command line arguments
    input_data = [float(arg) for arg in sys.argv[1:]]
    
    month = int(input_data[0])

    # Make predictions and print the result
    prediction = estimate_energy_consumption(month)
    print(prediction)