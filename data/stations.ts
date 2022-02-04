import path from "path";
import fs from "fs";
import { FederalState, FederalStateFromString, FederalStateToString, RegionalArea, RegionalAreaFromString, RegionalAreaToString, StationCategory, TrafficFromString, TStation, TStop, TTrack } from "./station_types";
import { alternates } from "./raw/alternates";
import { groupBy } from "./utils";

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
    // parse SuS dataset
    const susPath = path.join(process.cwd(), 'data', 'raw', 'DBSuS-Uebersicht_Bahnhoefe-Stand2020-03.csv');
    const susLines = parseCSV(susPath);
    const susStations = susLines.map(parseSUSLine);

    // parse tracks dataset
    const tracksPath = path.join(process.cwd(), 'data', 'raw', 'DBSuS-Bahnsteigdaten-Stand2020-03.csv');
    const tracksLines = parseCSV(tracksPath);
    const tracks = tracksLines.map(parseTrack);

    // parse Bahnhof dataset
    const stopsPath = path.join(process.cwd(), 'data', 'raw', 'D_Bahnhof_2020_alle.CSV');
    const stopLines = parseCSV(stopsPath);
    const stops = stopLines.map(parseStop);


    // integrate them!
    let stations: Array<TStation> = susStations.map(s => ({stop: undefined!, platforms: [[]], ...s}));

    tracks.forEach(track => {
        let index = stations.findIndex(st => st.ID === track.stationID);
        if (index === -1) {
            console.log("Missing Station with ID " + track.stationID);
            return;
        }
        stations[index].platforms[0].push(track);
    });

    stations.forEach(station => {
        const tracks = station.platforms[0].sort((a, b) => a.number - b.number);
        station.platforms = groupBy(tracks, (track: TTrack) => track.platform);
    })

    stops.forEach(stop => {
        stop.DS100.forEach(ds100 => {
            let index = stations.findIndex(st => st.DS100Office === ds100);
            if (index === -1) {
                index = stations.findIndex(st => st.DS100Office.startsWith(ds100 + " "));
            }
            if (index === -1 && (ds100 in alternates)) {
                const alt = alternates[ds100];
                index = stations.findIndex(st => st.DS100Office === alt);
            }
            if (index === -1) {
                return;
            }
            const oldStop = stations[index].stop;
            if (oldStop !== undefined) {
                if (oldStop.evaNr !== stop.evaNr) {
                    throw new Error("Station " + stations[index].Station+ ": Multiple different stops. ");
                }
            }
            stations[index].stop = stop;
        }) 
    });

    stations = stations.filter(station => {
        if (!station.DS100Office) return false;

        if (station.stop === undefined) {
            // console.log("Station without alternate: " + station.DS100Office );
            // console.log(JSON.stringify(station.Station) + ": " + JSON.stringify(station.DS100Office) + ",");
            return false;
        }
        if (station.platforms.length === 0) {
            // console.log("station without tracks: "+ station.DS100Office);
            return false;
        }

        return true;
    })

    // integrate the dataset
    return stations.sort(compareStations);
}

function parseCSV(path: string, seperator: string = ";"): string[][] {
    const lines = fs.readFileSync(path, "utf8").split("\n").slice(1).map(s => s.trim()).filter(s => s !== "")
    return lines.map(line => line.trim().split(seperator));
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

type SUSStation = Pick<TStation, "State" | "RegionalArea" | "StationManagement" | "ID" | "Station" | "DS100Office" | "Category" | "AddressStreet" | "AddressZIP" | "AddressCity" | "TransportAuthority">;

/** parseStation parses a single line into a station */
function parseSUSLine(line: Array<string>): Readonly<SUSStation> {
    const station = {
        State: FederalStateFromString(line[0]),
        RegionalArea: RegionalAreaFromString(line[1]),
        StationManagement: line[2],
        ID: parseInt(line[3], 10),
        Station: line[4],
        DS100Office: line[5],
        Category: parseInt(line[6], 10) as StationCategory,
        AddressStreet: line[7],
        AddressZIP: line[8],
        AddressCity: line[9],
        TransportAuthority: line[10],
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

function parseStop(line: Array<string>): Readonly<TStop> {
    // EVA_NR;DS100;IFOPT;NAME;Verkehr;Laenge;Breite;Betreiber_Name;Betreiber_Nr;Status

    const stop = {
        evaNr: parseInt(line[0], 10),
        DS100: line[1].split(","),
        IFOPT: line[2],
    
        name: line[3],
        traffic: TrafficFromString(line[1], line[4]),
    
        long: line[5],
        lat: line[6],
    
        operatorName: line[7],
        operatorNr: parseInt(line[8], 10),
        
        status: line[9],
    }

    // in development mode, throw errors that occur during parsing!
    if (process.env.NODE_ENV === "development") {
        for (let key in stop) {
            if ((stop as any)[key] === undefined) {
                throw new Error("Station " + stop.evaNr + ": " + key + " is undefined! ");
            }
        }
    }

    return stop;
}

function parseTrack(line: Array<string>): TTrack {
    const track = {
        stationID: parseInt(line[0], 10),
        platform: line[1],
        number: parseInt(line[2], 10),
        name: line[3],
        length: parseInt(line[4], 10), // in m
        height: parseInt(line[5], 10), // in cm
    }

        // in development mode, throw errors that occur during parsing!
        if (process.env.NODE_ENV === "development") {
            for (let key in track) {
                if ((track as any)[key] === undefined) {
                    throw new Error("Station " + track + ": " + key + " is undefined! ");
                }
            }
        }
    
    
    return track;
}
