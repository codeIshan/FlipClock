function updateClock() {
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    updateCard('hourTens', hour.charAt(0));
    updateCard('hourUnits', hour.charAt(1));
    updateBlinkingColon();
    updateCard('ampm', ampm); // Added for AM/PM
    updateCard('minuteTens', minute.charAt(0));
    updateCard('minuteUnits', minute.charAt(1));

    const folder = document.querySelector('.folder');
    folder.style.animation = `glow ${1}s infinite alternate`; // Add animation based on the second

}


function updateCard(cardId, value) {
    const card = document.getElementById(cardId);
    const front = card.querySelector('.front');
    const back = card.querySelector('.back');

    front.textContent = value;
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
