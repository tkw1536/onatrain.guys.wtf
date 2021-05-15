import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from "react";
import PageTitle from "../../components/PageTitle";
import { FederalStateLink, ManagementLink, RegionalAreaLink, StationCategoryLink, TransportAuthorityLink } from "../../components/StationData";
import { getStationByID, getStationIDs } from "../../data/stations";
import { TStation } from "../../data/station_types";
import styles from "./station.module.css";

export default class Station extends React.Component<{ station: TStation }> {
  render() {
    const { station } = this.props;
    return <div className={styles.station}>
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
          <td><pre>{station.DS100Office}</pre></td>
        </tr>

        <tr>
          <td>Regional Area</td>
          <td><RegionalAreaLink region={station.RegionalArea} /></td>
        </tr>

        <tr>
          <td>State</td>
          <td><FederalStateLink state={station.State} /></td>
        </tr>

        <tr>
          <td>Station Management</td>
          <td><ManagementLink management={station.StationManagement} /></td>
        </tr>

        <tr>
          <td>Category</td>
          <td><StationCategoryLink category={station.Category} /></td>
        </tr>

        <tr>
          <td>Address</td>
          <td>
            {station.AddressStreet}<br />
            {station.AddressZIP} {station.AddressCity}<br />
            <b>View on:</b>&nbsp;
            <a href={makeOpenStreetMapLink(station)} className={styles.mapLink} rel="noopener noreferrer" target="_blank">OpenStreetMap</a>&nbsp;
            <a href={makeBingMapsLink(station)} className={styles.mapLink} rel="noopener noreferrer" target="_blank">Bing Maps</a>&nbsp;
            <a href={makeGoogleMapsLink(station)} className={styles.mapLink} rel="noopener noreferrer" target="_blank">Google Maps</a>
          </td>
        </tr>

        <tr>
          <td>Transport Authority</td>
          <td>
            <TransportAuthorityLink authority={station.TransportAuthority} />
          </td>
        </tr>
      </table>
    </div>;
  }
}

function makeOpenStreetMapLink({AddressStreet, AddressZIP, AddressCity}: TStation): string {
  const address = `${AddressStreet}, ${AddressZIP} ${AddressCity}`;
  return `https://www.openstreetmap.org/?query=${encodeURIComponent(address)}`;
}

function makeBingMapsLink({AddressStreet, AddressZIP, AddressCity}: TStation): string {
  const address = `${AddressStreet}, ${AddressZIP} ${AddressCity}, Germany`;
  return `https://www.bing.com/maps?q=${encodeURIComponent(address)}`;
}

function makeGoogleMapsLink({AddressStreet, AddressZIP, AddressCity}: TStation): string {
  const address = `${AddressStreet}, ${AddressZIP} ${AddressCity}, Germany`;
  return `https://maps.google.com/maps?&q=${encodeURIComponent(address)}`;
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
