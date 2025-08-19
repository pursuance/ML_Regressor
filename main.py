#%%
import pandas as pd
from gradient_descent import gradient_descent

data = pd.read_csv('Car_Price_Prediction.csv')

labels = ('Mileage', 'Price')

x_train = data[[labels[0]]].to_numpy()
y_train = data[[labels[1]]].to_numpy()


x_train = (x_train - x_train.mean()) / x_train.std()
y_train = (y_train - y_train.mean()) / y_train.std()

w_init, b_init = 0, 0

iterations = 20000
alpha = 0.0001

w_final, b_final, J_hist, p_hist = gradient_descent(x_train, y_train, w_init, b_init, iterations, alpha, labels)