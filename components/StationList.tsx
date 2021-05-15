import * as React from "react";
import { TStation } from "../data/station_types";
import Link from "next/link";
import { RegionalAreaLink, FederalStateLink, StationCategoryLink, DS100Link } from "./StationData";

export default class StationList extends React.Component<{stations: Readonly<TStation>[]}> {
  render() {
    const {stations} = this.props;
    return <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>DS 100</th>
                <th>ID</th>
                <th>Category</th>
                <th>Regional Area (RB)</th>
                <th>State</th>
            </tr>
        </thead>
        <tbody>
            {stations.map(station => <StationRow key={station.ID} station={station} />)}
        </tbody>
    </table>;
  }
}

class StationRow extends React.Component<{station: TStation}> {
    render() {
        const {station} = this.props;
        return <tr>
            <td>
                <Link href={`/station/${station.ID}`}><a>{station.Station}</a></Link>
            </td>
            <td>
                <DS100Link ds100={station.DS100Office} />
            </td>
            <td>
                {station.ID}
            </td>
            <td>
                <StationCategoryLink category={station.Category} />
            </td>
            <td>
                <RegionalAreaLink region={station.RegionalArea} />
            </td>
            <td>
                <FederalStateLink state={station.State} />
            </td>
        </tr>;
    }
}