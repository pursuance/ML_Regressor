from flask import Flask, request, jsonify
from gradient_descent import GradientDescent

app = Flask(__name__)

@app.route('/api/train', methods=['POST'])
def train_model():
    data = request.json
    x = data['x']
    y = data['y']
    w_init = data['w_init']
    b_init = data['b_init']
    iterations = data['iterations']
    alpha = data['alpha']
    features = data['features']
    label = data['label']
    
    gd = GradientDescent(x, y, w_init, b_init, iterations, alpha, features, label, verbose=False)
    return jsonify({"message": "Training complete!"})