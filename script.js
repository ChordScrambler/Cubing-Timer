let startTime, updatedTime, difference, tInterval;
let running = false;

const timerDisplay = document.getElementById('timer');
const historyDisplay = document.getElementById('history');

document.getElementById('reset').addEventListener('click', resetTimer);
document.addEventListener('keydown', handleKeyRelease0);
document.addEventListener('keyup', handleKeyRelease);

function handleKeyRelease0(event) {
    timerDisplay.style.color = "red";
}

function handleKeyRelease(event) {
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent default spacebar scrolling
        if (!running) {
            timerDisplay.style.color = "orange";
            startTimer();
        } else {
            timerDisplay.style.color = "green";
            stopTimer();
        }
    }
}

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
    }
}

function stopTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        recordTime();
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    timerDisplay.innerHTML = '0.00';
    difference = 0;
    historyDisplay.innerHTML = ''; // Optional: Clear history on reset
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    // Correct formatting to show two digits for milliseconds
    const formattedMilliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;
    timerDisplay.innerHTML = `${seconds}.${formattedMilliseconds}`;
}

function recordTime() {
    const timeEntry = document.createElement('div');
    timeEntry.textContent = timerDisplay.innerHTML;
    historyDisplay.appendChild(timeEntry);
}
