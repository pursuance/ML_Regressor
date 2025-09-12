import pandas as pd
from pathlib import Path

def readDataFromCSV(csv, features, label):

    module_path = Path(__file__).parent

    filepath = module_path / csv

    data = pd.read_csv(filepath)

    x_train = data[features].to_numpy()
    y_train = data[[label]].to_numpy().flatten()

    return(x_train, y_train)

