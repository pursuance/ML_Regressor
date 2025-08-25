import matplotlib.pyplot as plt
import numpy as np

class LinearRegressionPlot:
    def __init__(self, x_values, y_values, labels, w, b):
        self.x_values = x_values
        self.y_values = y_values
        self.x_label = labels[0]
        self.y_label = labels[1]
        self.w = w
        self.b = b
        self.line_values = self.generate_line_values()

    def generate_line_values(self):
        x_vals = np.linspace(self.x_values.min(), self.x_values.max(), 100)
        y_vals = self.w * x_vals + self.b
        y_vals = y_vals.flatten()

        return (x_vals, y_vals)

    def plot(self):
        plt.scatter(self.x_values, self.y_values, color='blue', marker='o')
        plt.plot(self.line_values[0], self.line_values[1], color='red', label=f'w = {self.w}, b = {self.b}')

        plt.xlabel(self.x_label)
        plt.ylabel(self.y_label)

        plt.show()
            