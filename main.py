#%%
import pandas as pd
from gradient_descent import GradientDescent

data = pd.read_csv('Car_Price_Prediction.csv')

labels = ('Mileage', 'Price')

x_train = data[[labels[0]]].to_numpy()
y_train = data[[labels[1]]].to_numpy()

w_init, b_init = 0, 0

iterations = 10000
alpha = 0.0001

GradientDescent(x_train, y_train, w_init, b_init, iterations, alpha, labels).gradient_descent_plot()