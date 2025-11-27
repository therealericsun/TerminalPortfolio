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
    // First, split by actual newlines to preserve intentional line breaks
    const paragraphs = text.split('\n');
    const allLines: string[] = [];
    
    // Process each paragraph separately
    for (const paragraph of paragraphs) {
        const trimmed = paragraph.trim();
        if (!trimmed) {
            // Empty line - add as is
            allLines.push('');
            continue;
        }
        
        // Wrap this paragraph
        const words = trimmed.split(' ');
        let currentLine = '';
        
        for (const word of words) {
            if (currentLine.length + word.length + 1 <= maxWidth) {
                currentLine += (currentLine ? ' ' : '') + word;
            } else {
                if (currentLine) allLines.push(currentLine);
                currentLine = word;
            }
        }
        
        if (currentLine) allLines.push(currentLine);
    }
    
    return allLines.length > 0 ? allLines : [''];
}
