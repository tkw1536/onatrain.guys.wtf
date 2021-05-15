import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from "react";
import PageTitle from "../../components/PageTitle";
import StationList from "../../components/StationList";
import { getStationsByTransportAuthority, getStationTransportAuthorities } from "../../data/stations";
import { RegionalArea, TStation } from "../../data/station_types";

export default class extends React.Component<{authority: string, stations: Readonly<TStation>[]}> {
    render() {
      const {stations, authority} = this.props;
      return <>
          <PageTitle>Stations with Station Authority "{authority}"</PageTitle>
          <StationList stations={stations} />
      </>;
    }
  }

export const getStaticPaths: GetStaticPaths = async () => {
  const authorities = getStationTransportAuthorities().map(c => ({ params: { authority: btoa(c.toString()) } }));
  return {
    paths: authorities,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const authority = atob(context.params!.authority as RegionalArea);
    return {
      props: {
        authority: authority,
        stations: getStationsByTransportAuthority(authority),
      }
    };
}
