import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from "react";
import PageTitle from "../../components/PageTitle";
import { RegionalAreaLink, StationCategoryLink } from "../../components/StationData";
import { getStationByID, getStationIDs } from "../../data/stations";
import { TStation } from "../../data/station_types";
import style from "./station.module.css";

export default class Station extends React.Component<{ station: TStation }> {
  render() {
    const { station } = this.props;
    return <div className={style.station}>
      <PageTitle>{station.Station}</PageTitle>

      <table>

        <tr>
          <td>Name</td>
          <td>{station.Station}</td>
        </tr>

        <tr>
          <td>ID</td>
          <td>{station.ID}</td>
        </tr>

        <tr>
          <td>DS 100</td>
          <td>{station.DS100Office}</td>
        </tr>

        <tr>
          <td>Regional Area</td>
          <td><RegionalAreaLink region={station.RegionalArea} /></td>
        </tr>

        <tr>
          <td>State</td>
          <td>{station.State}</td>
        </tr>

        <tr>
          <td>Station Management</td>
          <td>{station.StationManagement}</td>
        </tr>

        <tr>
          <td>Category</td>
          <td><StationCategoryLink category={station.Category} /></td>
        </tr>

        <tr>
          <td>Address</td>
          <td>
            {station.AddressStreet}<br />
            {station.AddressZIP} {station.AddressCity}
          </td>
        </tr>

        <tr>
          <td>Transport Authority</td>
          <td>
            {station.TransportAuthority}
          </td>
        </tr>
      </table>
    </div>;
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const stations = getStationIDs().map(id => ({ params: { id: id.toString() } }));
  return {
    paths: stations,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = parseInt(context.params!.id as string, 10);
  return {
    props: {
      station: getStationByID(id),
    }
  };
}
