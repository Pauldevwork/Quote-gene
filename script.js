const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Hides the quote container and shows a loading icon if there is a delay to the user
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hiding loading from the user when a quote is generated
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new quote function making each quote random
function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check the quote length to dertermine styling
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set quote, hide the loader
    quoteText.textContent = quote.text;
    complete();
    
}

// Getting random quotes from an API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catching any errors and returning an alert to the user so they know whats happening
        alert('opppsss....not working :(')
    }
}

// Tweet/X quote/ automactily populates a tweet/x template with a quote on this site
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// // Event listeners 
window.onload = function () {
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
}

// On loading
getQuotes();
