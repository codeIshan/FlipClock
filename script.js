function updateClock() {
    const now = new Date();
    let hour = now.getHours();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hour = hour % 12 || 12;

    const hourString = hour.toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');

    updateCard('hourTens', hourString.charAt(0));
    updateCard('hourUnits', hourString.charAt(1));
    updateBlinkingColon();
    updateCard('ampm', ampm);
    updateCard('minuteTens', minute.charAt(0));
    updateCard('minuteUnits', minute.charAt(1));

    const folder = document.querySelector('.folder');
    folder.style.animation = `glow ${1}s infinite alternate`;

    setTimeout(() => resetCards(), 1000); // Reset cards after 1 second

}

// Reset the cards to position after 1 sec
function resetCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {card.style.transform = 'rotateY(0deg)';});
}

function updateCard(cardId, value) {
    const card = document.getElementById(cardId);
    const front = card.querySelector('.front');
    const back = card.querySelector('.back');

    front.textContent = value;
    back.textContent = getNextNumber(cardId, value);
}

function getNextNumber(cardId, currentValue) {
    const num = parseInt(currentValue);

    if (cardId === 'ampm') {
        return currentValue === 'AM' ? 'PM' : 'AM'; // Flip between AM and PM
    } else if (cardId !== 'ampm' && num === 9) {
        return 0; // All other cards go back to 0 when the current value is 9
    } else if (cardId == 'hourTens' && num === 1) {
        return 0; // Special case for hours: If it's 12, go back to 1
    } else if (cardId == 'minuteTens' && num === 5) {
        return 0;
    } else {
        return num + 1; // Regular successor calculation for other cases
    }
}

function updateBlinkingColon() {
    const colon = document.getElementById('colon');
    const isVisible = colon.style.visibility === 'visible' ? 'hidden' : 'visible';
    colon.style.visibility = isVisible;
}

function initClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

document.addEventListener('DOMContentLoaded', initClock);
