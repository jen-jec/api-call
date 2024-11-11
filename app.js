const apiKey = '8ca8065b5cbeee12f7a1ee50ee07a841fa1eb243';
const baseUrl = 'https://emoji-api.com/emojis';
const emojisPerPage = 12; 
let currentEmojis = [];
let currentPage = 1;

//Forda errors :)
function displayError(message) {
    const emojiDisplay = document.getElementById('emoji-display');
    emojiDisplay.innerHTML = `<p class="error">${message}</p>`;
}

async function searchEmojis() {
    const query = document.getElementById('search-input').value;
    const url = `${baseUrl}?search=${query}&access_key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch emojis.');

        const data = await response.json();
    
        currentEmojis = Array.isArray(data) ? data : [];

        if (currentEmojis.length === 0) { 
            displayError('No emojis found for this search.');
            return; 
        }

        currentPage = 1;
        displayPaginatedEmojis();  
    } catch (error) {
        displayError(error.message);  
    }
}

async function fetchRandomEmojis() {
    const url = `${baseUrl}?access_key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch random emojis.');
        
        const data = await response.json();

        currentEmojis = Array.isArray(data) ? data : [];

        if (!currentEmojis || currentEmojis.length === 0) throw new Error('No emojis available.');

        currentEmojis = currentEmojis.sort(() => 0.5 - Math.random()).slice(0, 50); 
        currentPage = 1;
        displayPaginatedEmojis();
    } catch (error) {
        displayError(error.message); 
    }
}

//Forda Pagination <_>
function displayPaginatedEmojis() {
    const emojiDisplay = document.getElementById('emoji-display');
    
    if (currentEmojis.length === 0) {
        emojiDisplay.innerHTML = '<p class="error">No emojis to display.</p>';
        return;
    }

    const start = (currentPage - 1) * emojisPerPage;
    const end = start + emojisPerPage;
    const emojisToDisplay = currentEmojis.slice(start, end);

    emojiDisplay.innerHTML = emojisToDisplay
        .map(emoji => `<div class="emoji-card"><span>${emoji.character}</span><p>${emoji.slug}</p></div>`)
        .join('');

    updatePaginationControls();
}

function updatePaginationControls() {
    const totalPages = Math.ceil(currentEmojis.length / emojisPerPage);
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === totalPages;
}

function goToNextPage() {
    if (currentPage < Math.ceil(currentEmojis.length / emojisPerPage)) {
        currentPage++;
        displayPaginatedEmojis();
    }
}

function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayPaginatedEmojis();
    }
}
//Forda Background ;.
function generateRandomEmojis() {
    const emojiContainer = document.getElementById('emoji-bg');
    const emojis = ["😀", "😍", "😉", "😊", "😎", "😂", "😇", "🥳", "😜", "🤩"]; 
    const numberOfEmojis = 30;

    for (let i = 0; i < numberOfEmojis; i++) {
        const emojiElement = document.createElement('div');
        emojiElement.classList.add('emoji');
        emojiElement.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        emojiElement.style.left = `${Math.random() * 100}%`;
        emojiElement.style.top = `${Math.random() * 100}%`;
        emojiElement.style.fontSize = `${1 + Math.random() * 3}rem`; 

        emojiContainer.appendChild(emojiElement);
    }
}

window.onload = generateRandomEmojis;
