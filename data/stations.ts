import path from "path";
import fs from "fs";
import { FederalState, FederalStateFromString, RegionalArea, RegionalAreaFromString, StationCategory, TStation } from "./station_types";


let stations: Readonly<TStation>[];
export function getAllStations() {
    if(!stations) {
        stations = readStations();
    }
    return stations.slice(); // return a new array
}

export function getStationCount(): number {
    return getAllStations().length;
}

export function getStationByID(ID: number) {
    return getAllStations().find(s => s.ID === ID);
}

export function getStationIDs(): number[] {
    return getAllStations().map(s => s.ID);
}

export function getStationsByCategory(category: StationCategory) {
    return getAllStations().filter(s => s.Category === category);
}

export function getStationCategories(): StationCategory[] {
    return [
        StationCategory.Class1,
        StationCategory.Class2,
        StationCategory.Class3,
        StationCategory.Class4,
        StationCategory.Class5,
        StationCategory.Class6,
        StationCategory.Class7
    ];
}

export function getStationsByRegion(region: RegionalArea) {
    return getAllStations().filter(s => s.RegionalArea === region);
}

export function getStationRegions(): RegionalArea[] {
    return [
        RegionalArea.Center,
        RegionalArea.North,
        RegionalArea.East,
        RegionalArea.South,
        RegionalArea.SouthEast,
        RegionalArea.SouthWest,
        RegionalArea.West
    ];
}

export function getStationByState(state: FederalState) {
    return getAllStations().filter(s => s.State === state);
}

export function getStationStates(): FederalState[] {
    return [
        FederalState.BadenWuerttemberg, 
        FederalState.Bavaria, 
        FederalState.Berlin, 
        FederalState.Brandenburg, 
        FederalState.Bremen, 
        FederalState.Hamburg, 
        FederalState.Hesse, 
        FederalState.LowerSaxony, 
        FederalState.MecklenburgVorpommern, 
        FederalState.NorthRhineWestphalia, 
        FederalState.RhinelandPalatinate, 
        FederalState.Saarland, 
        FederalState.Saxony, 
        FederalState.SaxonyAnhalt, 
        FederalState.SchleswigHolstein, 
        FederalState.Thuringia
    ];
}

export function getStationManagements(): string[] {
    const management = getAllStations().map(s => s.StationManagement).filter(x => x !== "")
    return Array.from(new Set(management)).sort();
}

export function getStationsByManagement(management: string) {
    return getAllStations().filter(s => s.StationManagement === management);
}

export function getStationTransportAuthorities(): string[] {
    const authorities = getAllStations().map(s => s.TransportAuthority).filter(x => x !== "")
    return Array.from(new Set(authorities)).sort();
}

export function getStationsByTransportAuthority(authority: string) {
    return getAllStations().filter(s => s.TransportAuthority === authority);
}

/* readStations reads all stations from the disk */
function readStations(): Readonly<TStation>[] {
    const stationsCSVPath = path.join(process.cwd(), 'data', 'raw', 'stations.csv');
    const stations = fs.readFileSync(stationsCSVPath, "utf8").split("\n").slice(1).map(s => s.trim()).filter(s => s !== "").map(parseStation);

    return stations.sort(compareStations);
}

function compareStations(a: TStation, b: TStation): number {
    if (a.Category !== b.Category) {
        return a.Category - b.Category;
    }
    if (a.RegionalArea !== b.RegionalArea) {
        return compareString(a.RegionalArea, b.RegionalArea);
    }

    return a.ID - b.ID;
}

function compareString(a: string, b: string): number {
    if (a < b) {
        return 1;
    } else if(a > b) {
        return -1;
    } else {
        return 0;
    }
}

/** parseStation parses a single line into a station */
function parseStation(line: string): Readonly<TStation> {
    const parts = line.trim().split(";");
    
    const station = {
        State: FederalStateFromString(parts[0]),
        RegionalArea: RegionalAreaFromString(parts[1]),
        StationManagement: parts[2],
        ID: parseInt(parts[3], 10),
        Station: parts[4],
        DS100Office: parts[5],
        Category: parseInt(parts[6], 10) as StationCategory,
        AddressStreet: parts[7],
        AddressZIP: parts[8],
        AddressCity: parts[9],
        TransportAuthority: parts[10],
    }
    

    // in development mode, throw errors that occur during parsing!
    if (process.env.NODE_ENV === "development") {
        for (let key in station) {
            if ((station as any)[key] === undefined) {
                throw new Error("Station " + station.ID + ": " + key + " is undefined! ");
            }
        }
    }

    return station;
}