document.addEventListener('DOMContentLoaded', () => {
    const bonsaiOutput = document.getElementById('bonsai-output');
    const output = document.getElementById('output');
    const command = document.getElementById('command');

    // --- Bonsai Generator (Simplified version) --- //
    function generateBonsai() {
        const maxDepth = 7;
        let tree = '';

        function grow(depth, prefix) {
            if (depth > maxDepth) return;

            const isBranch = Math.random() < 0.8;
            const branchChar = Math.random() < 0.5 ? '/' : '\\';
            const trunk = ' '.repeat(prefix.length) + (isBranch ? branchChar : '|');
            tree += trunk + '\n';

            if (isBranch) {
                grow(depth + 1, prefix + '  ');
                if (Math.random() < 0.5) {
                    grow(depth + 1, prefix + '  ');
                }
            }
        }

        grow(0, '');
        bonsaiOutput.textContent = tree;
    }

    // --- Terminal Typing Effect --- //
    const commands = [
        { cmd: 'cat about.txt', delay: 100, output: 
`# About Me
I am a dedicated and aspiring scientist with a strong foundation in genetics and plant biology from UC Berkeley. My experience spans from biodegradation research to developing interactive web applications, showcasing a unique blend of scientific inquiry and technical skill. I thrive in collaborative, lab-like settings where I can apply my knowledge to troubleshoot problems and communicate complex scientific concepts. I am passionate about leveraging technology to solve real-world challenges, whether in a laboratory or through code.`
        },
        { cmd: 'ls projects/', delay: 150, output: 
`# Projects
- Interactive Fractals (HTML/CSS/JS)
- Streamer Activity Ranker (React/Supabase)
- Plant Growth Optimization (Python/TensorFlow)`
        },
        { cmd: 'cat contact.txt', delay: 120, output: 
`# Get In Touch
- Email: magnetowasright325@gmail.com
- Location: San Francisco, CA
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [Your GitHub Profile]`
        },
        { cmd: 'echo "Thanks for visiting!"', delay: 80, output: 'Thanks for visiting!' }
    ];

    let commandIndex = 0;

    function typeCommand() {
        if (commandIndex >= commands.length) return;

        const current = commands[commandIndex];
        let i = 0;
        const interval = setInterval(() => {
            command.textContent += current.cmd[i];
            i++;
            if (i >= current.cmd.length) {
                clearInterval(interval);
                printOutput(current.output, () => {
                    command.textContent = '';
                    commandIndex++;
                    setTimeout(typeCommand, 1000);
                });
            }
        }, current.delay);
    }

    function printOutput(text, callback) {
        const line = document.createElement('div');
        line.className = 'line';
        const promptSpan = document.createElement('span');
        promptSpan.className = 'prompt';
        const commandSpan = document.createElement('span');
        commandSpan.textContent = commands[commandIndex].cmd;
        line.appendChild(promptSpan);
        line.appendChild(commandSpan);
        output.appendChild(line);

        const outputDiv = document.createElement('div');
        outputDiv.className = 'output';
        outputDiv.innerHTML = text.replace(/\n/g, '<br>');
        output.appendChild(outputDiv);

        // Scroll to bottom
        terminal.scrollTop = terminal.scrollHeight;

        callback();
    }

    // --- Initial Load --- //
    generateBonsai();
    setTimeout(typeCommand, 1000);
});