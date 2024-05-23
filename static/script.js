document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let feedback = document.getElementById('feedback').value;

    fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `feedback=${encodeURIComponent(feedback)}`
    })
    .then(response => response.json())
    .then(data => {
        let resultDiv = document.getElementById('result');
        let sentiment = data.result.label;
        let score = data.result.score.toFixed(2);
        let scoreText = `Sentiment: ${sentiment} (Score: ${score})`;

        resultDiv.textContent = scoreText;
        resultDiv.className = 'alert';

        if (sentiment === 'POSITIVE') {
            resultDiv.classList.add('alert-success');
        } else {
            resultDiv.classList.add('alert-danger');
        }

        resultDiv.style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
