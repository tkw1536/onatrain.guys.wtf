import * as React from "react";
import { TStation } from "../data/station_types";
import Link from "next/link";
import { RegionalAreaLink, StationCategoryLink } from "./StationData";

export default class StationList extends React.Component<{stations: Readonly<TStation>[]}> {
  render() {
    const {stations} = this.props;
    return <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Regional Area (RB)</th>
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
                <StationCategoryLink category={station.Category} />
            </td>
            <td>
                <RegionalAreaLink region={station.RegionalArea} />
            </td>
        </tr>;
    }
}