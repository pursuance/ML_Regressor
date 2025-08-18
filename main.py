#%%
import pandas as pd
from gradient_descent import gradient_descent
import matplotlib.pyplot as plt
import numpy as np

data = pd.read_csv('Car_Price_Prediction.csv')
x_train = data[['Mileage']].to_numpy()
y_train = data[['Price']].to_numpy()

x_train = (x_train - x_train.mean()) / x_train.std()
y_train = (y_train - y_train.mean()) / y_train.std()

w_init = 0
b_init = 0

iterations = 10000
alpha = 0.0001

x_vals = np.linspace(x_train.min(), x_train.max(), 100)
y_vals = w_init * x_vals + b_init

plt.scatter(x_train, y_train, color='blue', marker='o')
plt.plot(x_vals, y_vals, color='red', label=f'w = {w_init}, b = {b_init}')

plt.xlabel('Milage')
plt.ylabel('Price')

plt.show()

w_final, b_final, J_hist, p_hist = gradient_descent(x_train, y_train, w_init, b_init, iterations, alpha)

y_vals = w_final * x_vals + b_final

plt.scatter(x_train, y_train, color='blue', marker='o')
plt.plot(x_vals, y_vals, color='red', label=f'w = {w_init}, b = {b_init}')

plt.xlabel('Milage')
plt.ylabel('Price')

plt.show()