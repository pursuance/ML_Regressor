#%%
import pandas as pd
import numpy as np
from gradient_descent import GradientDescent

data = pd.read_csv('Car_Price_Prediction.csv')

features = [
    'Mileage',
    'Year',
]

label = 'Price'

x_train = data[features].to_numpy()
y_train = data[[label]].to_numpy().flatten()

w_init = np.zeros(x_train.shape[1])
b_init = 0

iterations = 10000
alpha = 0.0001

GradientDescent(x_train, y_train, w_init, b_init, iterations, alpha, features, label).gradient_descent_plot()