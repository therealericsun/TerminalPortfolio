// Command parser utility with support for chaining and piping

export interface ParsedCommand {
    command: string;
    args: string[];
    flags: Record<string, string | boolean>;
}

export type ChainOperator = '|' | ';' | '&&' | '||';

export interface CommandChain {
    command: ParsedCommand;
    operator?: ChainOperator;
}

export interface ParsedCommandLine {
    chains: CommandChain[];
}

/**
 * Parse a single command string into command, args, and flags
 */
export function parseCommand(input: string): ParsedCommand {
    const trimmed = input.trim();
    const parts = trimmed.split(/\s+/);
    
    const command = parts[0]?.toLowerCase() || '';
    const args: string[] = [];
    const flags: Record<string, string | boolean> = {};
    
    for (let i = 1; i < parts.length; i++) {
        const part = parts[i];
        
        if (part.startsWith('-')) {
            // Handle flags
            const flagName = part.replace(/^-+/, '');
            
            // Check if next part is a value (not another flag)
            if (i + 1 < parts.length && !parts[i + 1].startsWith('-')) {
                flags[flagName] = parts[i + 1];
                i++; // Skip next part since we used it as value
            } else {
                flags[flagName] = true;
            }
        } else {
            args.push(part);
        }
    }
    
    return { command, args, flags };
}

/**
 * Parse a complete command line with support for chaining operators
 * Supports: | (pipe), ; (sequence), && (and), || (or)
 */
export function parseCommandLine(input: string): ParsedCommandLine {
    const trimmed = input.trim();
    const chains: CommandChain[] = [];
    
    // Regular expression to match operators
    // We need to be careful with order: || and && before | and ;
    const operatorRegex = /(\|\||&&|;|\|)/g;
    
    let currentPos = 0;
    let match: RegExpExecArray | null;
    const matches: { operator: ChainOperator; index: number }[] = [];
    
    // Find all operators and their positions
    while ((match = operatorRegex.exec(trimmed)) !== null) {
        matches.push({
            operator: match[1] as ChainOperator,
            index: match.index
        });
    }
    
    // If no operators found, just parse as single command
    if (matches.length === 0) {
        const parsed = parseCommand(trimmed);
        chains.push({ command: parsed });
        return { chains };
    }
    
    // Extract commands between operators
    for (let i = 0; i < matches.length; i++) {
        const cmdStr = trimmed.substring(currentPos, matches[i].index).trim();
        const parsed = parseCommand(cmdStr);
        
        chains.push({
            command: parsed,
            operator: matches[i].operator
        });
        
        currentPos = matches[i].index + matches[i].operator.length;
    }
    
    // Parse the last command (after the last operator)
    const lastCmdStr = trimmed.substring(currentPos).trim();
    const lastParsed = parseCommand(lastCmdStr);
    chains.push({ command: lastParsed });
    
    return { chains };
}

/**
 * Extract the current command being typed for autocomplete purposes
 * This handles cases like "command1 | command2 | com..." where we want to autocomplete "com..."
 */
export function extractCurrentCommand(input: string): string {
    const trimmed = input.trim();
    
    // Find the last occurrence of any operator
    const operatorRegex = /(\|\||&&|;|\|)/g;
    let lastOperatorEnd = 0;
    let match: RegExpExecArray | null;
    
    while ((match = operatorRegex.exec(trimmed)) !== null) {
        lastOperatorEnd = match.index + match[0].length;
    }
    
    // Return everything after the last operator (or the whole string if no operator)
    return trimmed.substring(lastOperatorEnd).trim();
}
