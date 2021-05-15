import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from "react";
import PageTitle from "../../components/PageTitle";
import { FederalStateLink, ManagementLink, RegionalAreaLink, StationCategoryLink, TransportAuthorityLink } from "../../components/StationData";
import { getStationByID, getStationIDs } from "../../data/stations";
import { TStation, TStop } from "../../data/station_types";
import styles from "./station.module.css";

export default class Station extends React.Component<{ station: TStation }> {
  render() {
    const { station } = this.props;
    
    const DS100s = Array.from(new Set([station.DS100Office, ...station.stop.DS100])).sort();

    return <div className={styles.station}>
      <PageTitle>{station.Station}</PageTitle>

      <table>

        <Group>
          <tr>
            <td>Name</td>
            <td>{station.Station}</td>
          </tr>
        </Group>

        <Group>
          <tr>
            <td>DS 100</td>
            <td>{DS100s.map((ds100, index) => {
              const code = <code key={ds100}>{ds100}</code>;
              if (index === DS100s.length - 1) {
                return code;
              }
              return <React.Fragment key={ds100}>
                {code},&nbsp;
              </React.Fragment>;
            })}</td>
          </tr>

          <tr>
            <td>ID</td>
            <td>{station.ID}</td>
          </tr>

          <tr>
            <td>Number</td>
            <td>{station.stop.evaNr}</td>
          </tr>

          <tr>
            <td>IFOPT</td>
            <td>{station.stop.IFOPT}</td>
          </tr>
        </Group>

        <Group>
          <tr>
            <td>Category</td>
            <td><StationCategoryLink category={station.Category} /></td>
          </tr>

          <tr>
            <td>Traffic</td>
            <td>{station.stop.traffic}</td>
          </tr>
        </Group>

        <Group>
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
            <td>Coordinates</td>
            <td>
              Latitude: {station.stop.lat} Longitude: {station.stop.long}
            </td>
          </tr>
        
        </Group>
        <Group>

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

        </Group>

        <Group>
          <tr>
            <td>Transport Authority</td>
            <td>
              <TransportAuthorityLink authority={station.TransportAuthority} />
            </td>
          </tr>

          <tr>
            <td>Operator</td>
            <td>
              { station.stop.operatorName}
            </td>
          </tr>
          
        </Group>

      </table>
    </div>;
  }
}

class Group extends React.Component {
  render() {
    const { children } = this.props;
    return <>
        { children }
        <tr>
          <td colSpan={2}>
            <hr />
          </td>
        </tr>
    </>;
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
