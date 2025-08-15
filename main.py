#%%
import pandas as pd

data = pd.read_csv('boston.csv')
x_train = data[['RM']]
y_train = data[['MEDV']]

m = len(x_train)

def compute_cost(x, y, w, b, m):
    cost = 0

    for i in range(m):
        f_wb = w*x[i] + b
        cost = cost + (f_wb + y[i])**2

    cost = cost / (2*m)

    return cost
