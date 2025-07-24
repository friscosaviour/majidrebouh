document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const commandInput = document.getElementById('command');
    const terminal = document.getElementById('terminal');

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
    setTimeout(typeCommand, 1000);
});