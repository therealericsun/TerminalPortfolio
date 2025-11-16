import { commands } from '../data/commands';

const output = document.getElementById('output');
const input = document.getElementById('command-input') as HTMLInputElement;
const commandHistory: string[] = [];
let historyIndex = -1;
let autocompleteElement: HTMLElement | null = null;

async function executeCommand(cmd: string) {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === '') return;

    // Remove autocomplete hint if present
    removeAutocomplete();

    // Add command to history
    commandHistory.unshift(cmd);
    historyIndex = -1;

    // Display command with colored prompt (command in white text)
    const commandLine = document.createElement('div');
    commandLine.className = 'output-line';
    const promptSpan = document.createElement('span');
    promptSpan.className = 'prompt';
    promptSpan.textContent = 'visitor@portfolio:~$';
    promptSpan.style.marginRight = '8px';
    commandLine.appendChild(promptSpan);
    commandLine.appendChild(document.createTextNode(cmd));
    output?.appendChild(commandLine);

    // Execute command
    if (commands[trimmedCmd]) {
        const result = await commands[trimmedCmd].execute();
        if (result !== null) {
            addOutput(result);
        }
    } else {
        addOutput(`<span class="error">Command not found: ${cmd}</span>`);
    }
    
    // Scroll to bottom
    window.scrollTo(0, document.body.scrollHeight);
}

function addOutput(text: string) {
    const line = document.createElement('div');
    line.className = 'output-line';
    line.innerHTML = text;
    output?.appendChild(line);
    
    // Scroll to bottom
    window.scrollTo(0, document.body.scrollHeight);
}

function removeAutocomplete() {
    if (autocompleteElement) {
        autocompleteElement.remove();
        autocompleteElement = null;
    }
}

function showAutocomplete(matches: string[]) {
    removeAutocomplete();
    
    autocompleteElement = document.createElement('div');
    autocompleteElement.className = 'autocomplete-hint';
    autocompleteElement.textContent = matches.join('  ');
    
    const inputLine = document.querySelector('.input-line');
    inputLine?.insertAdjacentElement('afterend', autocompleteElement);
}

// Handle input
input?.addEventListener('keydown', async (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const cmd = input.value;
        input.value = '';
        await executeCommand(cmd);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        removeAutocomplete();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        removeAutocomplete();
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        } else {
            historyIndex = -1;
            input.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const partial = input.value.toLowerCase();
        const matches = Object.keys(commands).filter(cmd => cmd.startsWith(partial));
        if (matches.length === 1) {
            input.value = matches[0];
            removeAutocomplete();
        } else if (matches.length > 1) {
            showAutocomplete(matches);
        }
    } else {
        // Remove autocomplete on any other key
        removeAutocomplete();
    }
});

// Keep focus on input (but allow text selection)
document.addEventListener('click', (e) => {
    // Only focus input if user isn't selecting text
    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0) {
        input?.focus();
    }
});

// Initial focus
input?.focus();
