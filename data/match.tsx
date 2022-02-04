import { FederalStateToString, RegionalAreaToString, TStation } from "./station_types";

export default function match(station: Readonly<TStation>, filter: string): number {
    if (filter === "") return 1; // no matching needed for the empty filter
    
    const conditions = [
        () => station.Station,
        () => station.DS100Office,
        () => station.ID.toString(),
        () => RegionalAreaToString(station.RegionalArea),
        () => FederalStateToString(station.State),
        () => station.StationManagement,
        () => station.TransportAuthority,
    ]

    for(let i = 0; i < conditions.length; i++) {
        if(matchString(filter, conditions[i](), lowerCaseTransform)) {
            return 1
        }
    }

    return -1;
}

function matchString(source: string, target: string, transform?: (input: string) => string): boolean {
    source = transform ? transform(source) : source;
    target = transform ? transform(target) : target;

	const lenDiff = target.length - source.length;
    if (lenDiff < 0) return false
    
    if (lenDiff == 0 && source === target) return true

    outer: for(let i = 0; i < source.length; i++) {
        const r1 = source[i]
        for(let j = 0; j < target.length; j++) {
            const r2 = target[j];
            if (r1 == r2) {
                target = target.substring(j+1);
                continue outer;
            }
        }
        return false;
    }

    return true;
}

const lowerCaseTransform = (s: string) => s.toLowerCase();