from flask import Flask
from flask import request
import numpy as np
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import SGDClassifier
from sklearn.pipeline import Pipeline
import json

app = Flask(__name__)
loaded_model = 0

@app.route('/categories', methods=['POST'])
def index():
	queries = request.get_json(force=True)
	result = loaded_model.predict(queries['queries'])
	return  json.dumps(np.array2string(result, separator=', ')[1:-1])

if __name__ == '__main__':
    loaded_model = pickle.load(open("model_big.pkl", 'rb'))
    app.run(debug=True)
