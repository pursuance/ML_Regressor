import numpy as np
from app.utils import readDataFromCSV
from app.gradient_descent import GradientDescent

def generateTestData(features, label):

    csv = 'Car_Price_Prediction.csv'

    x, y = readDataFromCSV(csv, features, label)

    return x, y

if (__name__) == '__main__':
     
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
