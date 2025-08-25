import math
import numpy as np
import numpy.typing as npt
from graphing import LinearRegressionPlot

class GradientDescent:

    def __init__(self, x: npt.NDArray, y: npt.NDArray, w, b, iterations, alpha, labels):
        self.x_train = x
        self.y_train = y
        self.w_init = w
        self.b_init = b
        self.num_iterations = iterations
        self.alpha = alpha
        self.labels = labels
        self.x_normalized = self.normalize_data(x)
        self.y_normalzied = self.normalize_data(y)

    def compute_cost(self, w, b):
        cost = 0
        m = self.x_train.shape[0]

        for i in range(m):
            f_wb = w*self.x_train[i] + b
            cost = cost + (f_wb - self.y_train[i])**2

        cost = cost / (2*m)

        return cost

    def compute_gradient(self, w, b):

        m = self.x_train.shape[0]
        dj_dw = 0
        dj_db = 0

        f_wb = w * self.x_normalized + b
        error = f_wb - self.y_normalzied

        dj_dw = np.dot(error.T, self.x_normalized) / m
        dj_db = np.sum(error) / m

        return dj_dw, dj_db

    def gradient_descent_plot(self):

        w = self.w_init
        b = self.b_init

        for i in range(self.num_iterations):
            dj_dw, dj_db = self.compute_gradient(w, b)

            w = w - self.alpha * dj_dw
            b = b - self.alpha * dj_db

            if i% math.ceil(self.num_iterations/10) == 0:
                print(f"Iteration {i}: ",
                    f"dj_dw: {dj_dw}, dj_db: {dj_db}  ",
                    f"w: {w}, b:{b}")
                denormalzied_w, denormalized_b = self.denormalize_parameters(w, b)
                LinearRegressionPlot(self.x_train, self.y_train, self.labels, denormalzied_w, denormalized_b).plot()

        denormalized_w, denormalized_b = self.denormalize_parameters(w, b)
        print(f"Final Parameters: w: {denormalized_w}, b: {denormalized_b}")
        LinearRegressionPlot(self.x_train, self.y_train, self.labels, denormalized_w, denormalized_b).plot()
        # return w, b, J_history, p_history

    def normalize_data(self, data: npt.NDArray):
        return (data - data.mean(axis=0)) / data.std(axis=0)
    
    def denormalize_parameters(self, w, b):
        x_mean = self.x_train.mean()
        x_std = self.x_train.std()
        y_mean = self.y_train.mean()
        y_std = self.y_train.std()

        w_denormalized = w * (y_std / x_std)
        b_denormalized = (b * y_std) + y_mean - (w_denormalized * x_mean)

        return w_denormalized, b_denormalized