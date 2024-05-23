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
    data = request.form['message']

    # Predefined responses for common questions
    if "hello" in data.lower():
        return jsonify(result={"label": "POSITIVE", "score": 1, "response": "Hello! How can I assist you today?"})
    elif "how are you" in data.lower():
        return jsonify(result={"label": "POSITIVE", "score": 1, "response": "I'm just a bot, but I'm here to help!"})
    elif "what is your name" in data.lower():
        return jsonify(result={"label": "POSITIVE", "score": 1, "response": "I'm the Sentiment Analysis Bot!"})
    else:
        result = sentiment_analysis(data)[0]
        if result['label'] == 'NEGATIVE':
            result['score'] = -result['score']
        result['response'] = f"Sentiment: {result['label']} (Score: {result['score']})"
        return jsonify(result=result)


if __name__ == '__main__':
    app.run(debug=True)
