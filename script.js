// Simple NLP functions
function preprocessText(text) {
    return text.toLowerCase().trim();
}

function getResponse(userInput) {
    const input = preprocessText(userInput);
    
    // Enhanced response patterns with more variety
    const patterns = {
        greeting: {
            regex: /^(hi|hello|hey|greetings|yo|sup|what's up)/,
            responses: [
                "👋 Hello! I'm your colorful AI friend! How can I brighten your day? 🌈",
                "🌟 Hi there! Ready for an amazing conversation? ✨",
                "🌈 Greetings! I'm here to chat and make your day more colorful! 🎨"
            ]
        },
        farewell: {
            regex: /^(bye|goodbye|see you|farewell|cya|take care)/,
            responses: [
                "👋 Goodbye! Hope to chat with you again soon! 💫",
                "✨ Take care! Come back anytime for more colorful conversations! 🌟",
                "🌟 See you later! Have a wonderful day! 🌈"
            ]
        },
        thanks: {
            regex: /^(thanks|thank you|thx|appreciate it)/,
            responses: [
                "💫 You're welcome! Happy to help! 😊",
                "🌟 My pleasure! Always here to assist! ✨",
                "✨ No problem at all! That's what I'm here for! 💖"
            ]
        },
        howAreYou: {
            regex: /^(how are you|how's it going|how do you do|what's up|how's your day)/,
            responses: [
                "🌟 I'm feeling fantastic! How about you? 😊",
                "✨ I'm great! Ready to make your day more colorful! 🎨",
                "💫 I'm doing wonderful! How's your day going? 🌈"
            ]
        },
        name: {
            regex: /^(what is your name|who are you|what should i call you|your name)/,
            responses: [
                "🌈 I'm ColorBot, your friendly and colorful AI assistant! ✨",
                "✨ You can call me ColorBot! I love making conversations more vibrant! 🎨",
                "🌟 I'm ColorBot, and I'm here to add some color to your day! 💫"
            ]
        },
        weather: {
            regex: /(weather|temperature|raining|sunny|cloudy)/,
            responses: [
                "🌤️ I wish I could check the weather for you, but I'm just a chat bot! 😊",
                "🌈 Whether it's sunny or rainy, I hope you have a colorful day! ✨",
                "✨ I can't check the weather, but I can make our chat bright and sunny! 🌟"
            ]
        },
        joke: {
            regex: /(joke|funny|humor|laugh)/,
            responses: [
                "😄 Why don't scientists trust atoms? Because they make up everything! 🤣",
                "🌈 What do you call a fake noodle? An impasta! 😂",
                "✨ Why did the scarecrow win an award? Because he was outstanding in his field! 🌟"
            ]
        },
        love: {
            regex: /(love|like|adore|heart)/,
            responses: [
                "💖 Aww, that's so sweet! I love our conversations too! 🥰",
                "💫 You're making me blush! I enjoy chatting with you! 😊",
                "✨ That's so kind of you! You're making my circuits warm! 💝"
            ]
        },
        help: {
            regex: /(help|assist|support|what can you do)/,
            responses: [
                "🌟 I can chat with you about various topics, tell jokes, and make your day more colorful! ✨",
                "✨ I'm here to be your friendly companion and add some fun to your day! 🎨",
                "🌈 I can help you with conversation, entertainment, and spreading positivity! 💫"
            ]
        }
    };

    // Check for matches in patterns
    for (const [key, pattern] of Object.entries(patterns)) {
        if (pattern.regex.test(input)) {
            const responses = pattern.responses;
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }

    // Enhanced default responses
    const defaultResponses = [
        "🌟 That's interesting! Tell me more about that!",
        "✨ I'm still learning, but I'd love to hear more!",
        "🌈 That's a fascinating topic! Could you elaborate?",
        "💫 I'm curious to know more about what you're saying!",
        "🌟 That's a great point! Let's explore that further!",
        "✨ I'm here to chat and learn from you!",
        "🌈 Every conversation with you is a new adventure!",
        "💫 You always bring such interesting topics to our chat!"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Chat interface functions
function sendMessage() {
    const inputElement = document.getElementById('user-input');
    const message = inputElement.value;
    
    if (message.trim() === '') return;

    // Add user message
    addMessage(message, 'user');
    inputElement.value = '';

    // Simulate thinking delay with typing indicator
    const messagesDiv = document.getElementById('chat-messages');
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('message', 'bot-message', 'typing');
    typingIndicator.textContent = '...';
    messagesDiv.appendChild(typingIndicator);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Remove typing indicator and add response after delay
    setTimeout(() => {
        messagesDiv.removeChild(typingIndicator);
        const response = getResponse(message);
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
}

function addMessage(text, sender) {
    const messagesDiv = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.textContent = text;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Add event listener for Enter key
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Emoji picker functionality
function toggleEmojiPicker() {
    const picker = document.getElementById('emoji-picker');
    picker.classList.toggle('show');
}

function addEmoji(emoji) {
    const input = document.getElementById('user-input');
    input.value += emoji;
    input.focus();
}

// Add click event listeners to emojis
document.querySelectorAll('.emoji-category span').forEach(emoji => {
    emoji.addEventListener('click', () => {
        addEmoji(emoji.textContent);
    });
});

// Close emoji picker when clicking outside
document.addEventListener('click', (e) => {
    const picker = document.getElementById('emoji-picker');
    const emojiButton = document.querySelector('.emoji-button');
    if (!picker.contains(e.target) && !emojiButton.contains(e.target)) {
        picker.classList.remove('show');
    }
}); 