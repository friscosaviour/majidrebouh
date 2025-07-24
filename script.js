document.addEventListener('DOMContentLoaded', () => {
    const bonsaiOutput = document.getElementById('bonsai-output');
    const output = document.getElementById('output');
    const commandInput = document.getElementById('command');
    const terminal = document.getElementById('terminal');

    // --- Bonsai Generator (Inspired by cbonsai.cpp) --- //
    class Bonsai {
        constructor(options) {
            this.life = options.life || 35;
            this.multiplier = options.multiplier || 8;
            this.leaves = options.leaves || ['&', '*', '+', '.'];
            this.width = options.width || 80;
            this.height = options.height || 24;
            this.grid = Array(this.height).fill(null).map(() => Array(this.width).fill(' '));
        }

        put(y, x, char) {
            if (y >= 0 && y < this.height && x >= 0 && x < this.width) {
                this.grid[y][x] = char;
            }
        }

        grow(y, x, type, life, depth = 0) {
            if (life <= 0 || depth > this.life * 2) return;

            let dx = 0;
            let dy = 0;
            const age = this.life - life;

            // Determine growth direction based on type
            if (type === 'trunk') {
                dy = Math.random() > 0.3 ? -1 : 0;
                dx = Math.floor(Math.random() * 3) - 1;
            } else { // Shoots
                dy = Math.floor(Math.random() * 3) - 1;
                dx = type === 'left-shoot' ? Math.floor(Math.random() * 2) - 1 : Math.floor(Math.random() * 2);
            }

            const nextY = y + dy;
            const nextX = x + dx;

            if (nextY >= this.height -1) return; // Stop if it hits the ground

            // Choose character
            let char = '|';
            if (life < 4) {
                char = this.leaves[Math.floor(Math.random() * this.leaves.length)];
            } else if (type === 'trunk') {
                char = Math.random() < 0.8 ? '|' : 'Y';
            } else {
                char = dx < 0 ? '\\' : '/';
            }
            this.put(y, x, char);

            // Recursive branching
            if (type === 'trunk' && (age > 2 && age % Math.floor(this.multiplier / 2) === 0)) {
                const shootLife = life * 0.8;
                this.grow(nextY, nextX, 'left-shoot', shootLife, depth + 1);
                this.grow(nextY, nextX, 'right-shoot', shootLife, depth + 1);
            }

            this.grow(nextY, nextX, type, life - 1, depth + 1);
        }

        generate() {
            const startX = Math.floor(this.width / 2);
            const startY = this.height - 1;
            this.grow(startY, startX, 'trunk', this.life);
            return this.grid.map(row => row.join('')).join('\n');
        }
    }

    function displayBonsai() {
        const bonsai = new Bonsai({ width: 60, height: 20, life: 30, multiplier: 6 });
        bonsaiOutput.textContent = bonsai.generate();
    }

    // --- Terminal Typing Effect --- //
    const commands = [
        {
            cmd: 'cat about.txt',
            delay: 80,
            output: `# About Me\nI am a dedicated and aspiring scientist with a strong foundation in genetics and plant biology from UC Berkeley. My experience spans from biodegradation research to developing interactive web applications, showcasing a unique blend of scientific inquiry and technical skill. I thrive in collaborative, lab-like settings where I can apply my knowledge to troubleshoot problems and communicate complex scientific concepts. I am passionate about leveraging technology to solve real-world challenges, whether in a laboratory or through code.`
        },
        {
            cmd: 'ls projects/',
            delay: 100,
            output: `# Projects\n- <a href="#" target="_blank">Interactive Fractals</a> (HTML/CSS/JS)\n- <a href="#" target="_blank">Streamer Activity Ranker</a> (React/Supabase)\n- <a href="#" target="_blank">Plant Growth Optimization</a> (Python/TensorFlow)`
        },
        {
            cmd: 'cat contact.txt',
            delay: 90,
            output: `# Get In Touch\n- Email: <a href="mailto:magnetowasright325@gmail.com">magnetowasright325@gmail.com</a>\n- Location: San Francisco, CA\n- LinkedIn: <a href="#" target="_blank">[LinkedIn Profile]</a>\n- GitHub: <a href="#" target="_blank">[GitHub Profile]</a>`
        },
        {
            cmd: 'echo "Thanks for visiting!"',
            delay: 70,
            output: 'Thanks for visiting!'
        }
    ];

    let commandIndex = 0;

    function typeCommand() {
        if (commandIndex >= commands.length) {
            commandInput.parentElement.style.display = 'none'; // Hide prompt when done
            return;
        }

        const current = commands[commandIndex];
        let i = 0;
        commandInput.textContent = '';
        const interval = setInterval(() => {
            commandInput.textContent += current.cmd[i];
            i++;
            if (i >= current.cmd.length) {
                clearInterval(interval);
                printOutput(current, () => {
                    commandIndex++;
                    setTimeout(typeCommand, 1200);
                });
            } 
        }, current.delay);
    }

    function printOutput(commandObj, callback) {
        // Create a new line for the past command
        const historyLine = document.createElement('div');
        historyLine.className = 'line';
        historyLine.innerHTML = `<span class="prompt"></span><span>${commandObj.cmd}</span>`;
        output.appendChild(historyLine);

        // Create the output div
        const outputDiv = document.createElement('div');
        outputDiv.className = 'output';
        outputDiv.innerHTML = commandObj.output.replace(/\n/g, '<br>');
        output.appendChild(outputDiv);

        terminal.scrollTop = terminal.scrollHeight;

        callback();
    }

    // --- Initial Load --- //
    displayBonsai();
    setTimeout(typeCommand, 1000);
});