
/** TStation represents a single station */
export interface TStation {
    State: string;
    RegionalArea: RegionalArea;
    StationManagement: string;
    ID: number;
    Station: string;
    DS100Office: string;
    Category: StationCategory;
    AddressStreet: string;
    AddressZIP: string;
    AddressCity: string;
    TransportAuthority: string;
}

export enum StationCategory {
    Class1 = 1,
    Class2 = 2,
    Class3 = 3,
    Class4 = 4,
    Class5 = 5,
    Class6 = 6,
    Class7 = 7,
}

export enum RegionalArea {
    West = "west",
    SouthWest = "southwest",
    SouthEast = "southeast",
    South = "south",
    East = "east",
    North = "north",
    Center = "center",
}

const regionalAreaStrings: Record<string, RegionalArea> = {
    "RB Mitte": RegionalArea.Center,
    "RB Nord": RegionalArea.North,
    "RB Ost": RegionalArea.East,
    "RB Süd": RegionalArea.South,
    "RB Südost": RegionalArea.SouthEast,
    "RB Südwest": RegionalArea.SouthWest,
    "RB West": RegionalArea.West,
}

export function RegionalAreaFromString(value: string): RegionalArea {
    const area = regionalAreaStrings[value];
    if (!area) {
        throw new Error("Unknown RegionalArea: " + value); 
    }
    return area;
}

export function RegionalAreaToString(region: RegionalArea): string {
    const [areaString,area] = Object.entries(regionalAreaStrings).find(x => x[1] == region) || ["", RegionalArea.West];
    if (areaString == "") {
        throw new Error("Unknown RegionalArea: " + region);
    }
    return areaString;
}