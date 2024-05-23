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
        resultDiv.textContent = `Sentiment: ${data.result.label} (Score: ${data.result.score.toFixed(2)})`;
        resultDiv.style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
