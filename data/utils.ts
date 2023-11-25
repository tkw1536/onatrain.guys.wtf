export function groupBy<T>(data: Array<T>, group: (obj: T) => string): Array<Array<T>> {
    const indexes: Record<string, number> = {};
    
    const result: Array<Array<T>> = [];
    data.forEach(item => {
        const gid = group(item);

        // group already exists
        if (gid in indexes) {
            result[indexes[gid]].push(item);
            return;
        }

        // create new group
        indexes[gid] = result.length;
        result.push([item]);
    });

    return result;
}

/* calls btoa() when available, otherwise falls back to Buffer.from */
function _btoa(input: string): string {
    if(typeof btoa === 'function') return btoa(input);
    return Buffer.from(input).toString('base64');
}

/** calls atob when available, otherwise falls back to Buffer.from */
function _atob(input: string): string {
    if (typeof atob === 'function') return atob(input);
    return Buffer.from(input, 'base64').toString();
}

function replaceAll(input: string, original: string, replacement: string) {
    if (typeof String.prototype.replaceAll === 'function') return input.replaceAll(original, replacement);
    return input.split(original).join(replacement);
}

function mapAll(input: string, mapping: Record<string, string>): string {
    return Object.entries(mapping).reduce((acc, [key, value]) => replaceAll(acc, key, value), input);
}

export function encodeData(data: string): string {
    return mapAll(_btoa(data), {'+': '-', '/': '_', '=': '@'});
}

export function decodeData(binary: string): string {
    return _atob(mapAll(binary, {'-': '+', '_': '/', '@': '='}));
}

export function normalizeName(name: string): string {
    return name.replace(/[^a-zA-Z-]/g, "").replace(/\s+/, " ").trim();
}