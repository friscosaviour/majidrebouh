const asciiArtContainer = document.getElementById('ascii-art');
const asciiArt = asciiArtContainer.textContent;
const clickableOverlay = document.querySelector('.clickable-overlay');

function adjustFontSize() {
    const lines = asciiArt.split('\n');
    const lineCount = lines.length;
    const containerHeight = window.innerHeight;
    const fontSize = Math.floor(containerHeight / lineCount);
    asciiArtContainer.style.fontSize = `${fontSize}px`;

    const buttonStartLine = 44;
    const buttonEndLine = 45;
    const top = (buttonStartLine / lineCount) * 100;
    const height = ((buttonEndLine - buttonStartLine + 1) / lineCount) * 100;

    clickableOverlay.style.top = `${top}%`;
    clickableOverlay.style.height = `${height}%`;
}

window.addEventListener('resize', adjustFontSize);
adjustFontSize();
