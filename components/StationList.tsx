import * as React from "react";
import { RegionalAreaToString, FederalStateToString, TStation } from "../data/station_types";
import Link from "next/link";
import { RegionalAreaLink, FederalStateLink, StationCategoryLink, ManagementLink, TransportAuthorityLink } from "./StationData";
import match from "../data/match";
import { BoardLink } from "../data/board";

interface StationListProps {
    stations: Readonly<TStation>[]
}

interface StationListState {
    stations: Readonly<TStation>[];
    filter: string;
}


export default class StationList extends React.Component<StationListProps, StationListState> {
  state: StationListState = { stations: [], filter: ""}
  static getDerivedStateFromProps(props:  StationListProps, state: StationListState): StationListState {
    const { stations } = props;
    const { filter } = state;
    return { filter: filter, stations: stations.filter(s => match(s, filter) > 0) };
  }
  private readonly updateFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const filter = event.target.value;
      this.setState(({ stations }) => StationList.getDerivedStateFromProps(this.props, { stations, filter }))
  }
  render() {
    const {stations, filter } = this.state;
    return <table>
        <thead>
            <tr>
                <th>Name</th>
                <th />
                <th>DS 100</th>
                <th>ID</th>
                <th>Category</th>
                <th>Regional Area (RB)</th>
                <th>State</th>
                <th>Management</th>
                <th>Transport Authority</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colSpan={8}>
                <input value={filter} onChange={this.updateFilter} />
                </td>
            </tr>
        </tbody>
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
                <small>
                    <a href={BoardLink({
                        bhf: station.DS100Office,
                        typ: 'an',
                        lang: 'de',
                        SecLang: 'en',
                    })} target="_blank" rel="noopener noreferer">An</a>
                    &nbsp;
                    <a href={BoardLink({
                        bhf: station.DS100Office,
                        typ: 'ab',
                        lang: 'de',
                        SecLang: 'en',
                    })} target="_blank" rel="noopener noreferer">Ab</a>
                </small>
            </td>
            <td>
                <pre>{station.DS100Office}</pre>
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
            <td>
                <ManagementLink management={station.StationManagement} />
            </td>
            <td>
                <TransportAuthorityLink authority={station.TransportAuthority} />
            </td>
        </tr>;
    }
}