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

export function encodeData(data: string): string {
    return _btoa(data).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '@');
}

export function decodeData(binary: string): string {
    return _atob(binary.replaceAll('-', '+').replaceAll('_', '/').replaceAll('@', '='));
}