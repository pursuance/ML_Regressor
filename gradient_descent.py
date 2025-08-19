import math
import numpy.typing as npt
from graphing import LinearRegressionPlot

def compute_cost(x: npt.NDArray , y: npt.NDArray, w, b):
    cost = 0
    m = x.shape[0]

    for i in range(m):
        f_wb = w*x[i] + b
        cost = cost + (f_wb - y[i])**2

    cost = cost / (2*m)

    return cost

def compute_gradient(x: npt.NDArray , y: npt.NDArray, w, b):

    m = x.shape[0]
    dj_dw = 0
    dj_db = 0

    for i in range(m):
        f_wb = w*x[i] + b
        dj_dw = dj_dw + (f_wb - y[i]) * x[i]
        dj_db = dj_db + (f_wb - y[i])
    
    dj_dw = dj_dw / m
    dj_db = dj_db / m

    return dj_dw, dj_db

def gradient_descent(x: npt.NDArray , y: npt.NDArray, w, b, num_iterations, alpha, labels):

    J_history = []
    p_history = []

    for i in range(num_iterations):
        dj_dw, dj_db = compute_gradient(x, y, w, b)

        w = w - alpha * dj_dw
        b = b - alpha * dj_db

        if i < 100001:
            J_history.append(compute_cost(x, y, w, b))
            p_history.append([w,b])

        if i% math.ceil(num_iterations/10) == 0:
            print(f"Iteration {i}: Cost {J_history[-1]} ",
                  f"dj_dw: {dj_dw}, dj_db: {dj_db}  ",
                  f"w: {w}, b:{b}")
            LinearRegressionPlot(x, y, labels, w, b).plot()
 
    return w, b, J_history, p_history