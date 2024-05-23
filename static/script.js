document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let chatInput = document.getElementById('chat-input');
    let message = chatInput.value;

    if (message.trim() === '') return;

    // Add user message to chat
    addMessageToChat('user', message);

    // Clear input
    chatInput.value = '';

    fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `message=${encodeURIComponent(message)}`
    })
    .then(response => response.json())
    .then(data => {
        let sentiment = data.result.label;
        let responseMessage = data.result.response;

        addMessageToChat('bot', responseMessage, sentiment);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function addMessageToChat(sender, message, sentiment) {
    let chatBox = document.getElementById('chat-box');
    let messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);

    let messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message;

    if (sender === 'bot') {
        if (sentiment === 'POSITIVE') {
            messageContent.style.color = 'blue';
        } else if (sentiment === 'NEGATIVE') {
            messageContent.style.color = 'red';
        }
    }

    messageElement.appendChild(messageContent);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
