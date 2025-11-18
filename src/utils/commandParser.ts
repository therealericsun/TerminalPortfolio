// Command parser utility

export interface ParsedCommand {
    command: string;
    args: string[];
    flags: Record<string, string | boolean>;
}

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
