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
export function encodeData(data: string): string {
    return btoa(data).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '@');
}

export function decodeData(binary: string): string {
    return atob(binary.replaceAll('-', '+').replaceAll('_', '/').replaceAll('@', '='));
}