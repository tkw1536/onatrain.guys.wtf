import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from "react";
import PageTitle from "../../components/PageTitle";
import StationList from "../../components/StationList";
import { getStationManagements, getStationsByManagement, getStationsByRegion } from "../../data/stations";
import { RegionalArea, TStation } from "../../data/station_types";

export default class extends React.Component<{management: string, stations: Readonly<TStation>[]}> {
    render() {
      const {stations, management} = this.props;
      return <>
          <PageTitle>Stations managed by "{management}"</PageTitle>
          <StationList stations={stations} />
      </>;
    }
  }

export const getStaticPaths: GetStaticPaths = async () => {
  const managements = getStationManagements().map(c => ({ params: { management: btoa(c.toString()) } }));
  return {
    paths: managements,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const management = atob(context.params!.management as RegionalArea);
    return {
      props: {
        management: management,
        stations: getStationsByManagement(management)
      }
    };
}
