from flask import Flask, request, jsonify, Blueprint
from app.gradient_descent import GradientDescent
import numpy as np
from app.test import generateTestData

bp = Blueprint('main', __name__)

@bp.route('/api/train', methods=['POST'])
def train_model():
    try:
        data = request.json

        # x = np.array(data['x'])
        # y = np.array(data['y'])
        w_init = data['w_init']
        b_init = data['b_init']
        iterations = data['num_iterations']
        alpha = data['alpha']
        # features = data['features']
        # label = data['label']

        x, y, features, label = generateTestData()
        
        gd = GradientDescent(x, y, w_init, b_init, iterations, alpha, features, label, verbose=False)
        return jsonify({
            "message": "Training complete!",
            "final_w": gd.w_final.tolist(),
            "final_b": gd.b_final
        })

    except Exception as e:
        return jsonify({"sucess": False, "error": str(e)}), 400