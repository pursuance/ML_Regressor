import pandas as pd
import numpy as np
from pathlib import Path
from app.gradient_descent import GradientDescent

def readDataFromCSV(csv, features, label):

    module_path = Path(__file__).parent

    filepath = module_path / csv

    data = pd.read_csv(filepath)

    x_train = data[features].to_numpy()
    y_train = data[[label]].to_numpy().flatten()

    return(x_train, y_train)

if (__name__) == '__main__':

    print('hi')
     
    features = [
        'Mileage',
        'Engine Size',
    ]

    label = 'Price'

    csv = 'Car_Price_Prediction.csv'

    x_train, y_train = readDataFromCSV(csv, features, label)

    w_init = np.zeros(x_train.shape[1])
    b_init = 0

    iterations = 100000
    alpha = 0.0001

    GradientDescent(x_train, y_train, w_init, b_init, iterations, alpha, features, label)
