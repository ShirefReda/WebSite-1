// sendMessage.js
document.getElementById('sendMessageBtn').addEventListener('click', function () {
    const token = '6954121412:AAH5S6-QUV12UUDCi3bmyHfOdos_8BMwOJA'; // You should keep your bot token secret!
    const chatId = '1277730313';
    const text = 'HI';

    // Telegram Bot API URL to send the message
    const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    fetch(apiUrl, {
        method: 'POST', // Telegram Bot API requires POST request to send messages.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: text
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message sent:', data);
        alert('Message sent!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to send the message.');
    });
});
