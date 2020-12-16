
/** TStation represents a single station */
export interface TStation {
    State: FederalState;
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
    const [areaString,_] = Object.entries(regionalAreaStrings).find(x => x[1] == region) || ["", RegionalArea.West];
    if (areaString == "") {
        throw new Error("Unknown RegionalArea: " + region);
    }
    return areaString;
}

export enum FederalState {
    BadenWuerttemberg = "BW",
    Bavaria = "BY",
    Berlin = "BE",
    Brandenburg = "BB",
    Bremen = "HB",
    Hamburg = "HH",
    Hesse = "HE",
    LowerSaxony = "NI",
    MecklenburgVorpommern = "MV",
    NorthRhineWestphalia = "NW",
    RhinelandPalatinate = "RP",
    Saarland = "SL",
    Saxony = "SN",
    SaxonyAnhalt = "ST",
    SchleswigHolstein = "SH",
    Thuringia = "TH",
}

const federalStateStrings: Record<string, FederalState> = {
    "Baden-Württemberg": FederalState.BadenWuerttemberg,
    "Bayern": FederalState.Bavaria,
    "Berlin": FederalState.Berlin,
    "Brandenburg": FederalState.Brandenburg,
    "Bremen": FederalState.Bremen,
    "Hamburg": FederalState.Hamburg,
    "Hessen": FederalState.Hesse,
    "Niedersachsen": FederalState.LowerSaxony,
    "Mecklenburg-Vorpommern": FederalState.MecklenburgVorpommern,
    "Nordrhein-Westfalen": FederalState.NorthRhineWestphalia,
    "Rheinland-Pfalz": FederalState.RhinelandPalatinate,
    "Saarland": FederalState.Saarland,
    "Sachsen": FederalState.Saxony,
    "Sachsen-Anhalt": FederalState.SaxonyAnhalt,
    "Schleswig-Holstein": FederalState.SchleswigHolstein,
    "Thüringen": FederalState.Thuringia,
}

export function FederalStateFromString(value: string): FederalState {
    const state = federalStateStrings[value];
    if (!state) {
        throw new Error("Unknown FederalState: " + value); 
    }
    return state;
}

export function FederalStateToString(state: FederalState): string {
    const [stateString,_] = Object.entries(federalStateStrings).find(x => x[1] == state) || ["", FederalState.Berlin];
    if (stateString == "") {
        throw new Error("Unknown FederalState: " + state);
    }
    return stateString;
}