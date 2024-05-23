from flask import Flask, render_template, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load pre-trained sentiment-analysis pipeline
sentiment_analysis = pipeline('sentiment-analysis')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.form['feedback']
    result = sentiment_analysis(data)[0]
    # Adjust score to be negative for negative feedback
    if result['label'] == 'NEGATIVE':
        result['score'] = -result['score']
    return jsonify(result=result)


if __name__ == '__main__':
    app.run(debug=True)
