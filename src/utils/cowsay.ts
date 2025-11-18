// Cowsay implementation

export function cowsay(message: string): string {
    const lines = wrapText(message, 40);
    const maxLength = Math.max(...lines.map(l => l.length));
    
    let result = ' ' + '_'.repeat(maxLength + 2) + '\n';
    
    if (lines.length === 1) {
        result += `< ${lines[0].padEnd(maxLength)} >\n`;
    } else {
        lines.forEach((line, i) => {
            const paddedLine = line.padEnd(maxLength);
            if (i === 0) {
                result += `/ ${paddedLine} \\\n`;
            } else if (i === lines.length - 1) {
                result += `\\ ${paddedLine} /\n`;
            } else {
                result += `| ${paddedLine} |\n`;
            }
        });
    }
    
    result += ' ' + '-'.repeat(maxLength + 2) + '\n';
    result += '        \\   ^__^\n';
    result += '         \\  (oo)\\_______\n';
    result += '            (__)\\       )\\/\\\n';
    result += '                ||----w |\n';
    result += '                ||     ||\n';
    
    return result;
}

function wrapText(text: string, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    
    for (const word of words) {
        if (currentLine.length + word.length + 1 <= maxWidth) {
            currentLine += (currentLine ? ' ' : '') + word;
        } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
        }
    }
    
    if (currentLine) lines.push(currentLine);
    
    return lines.length > 0 ? lines : [''];
}
