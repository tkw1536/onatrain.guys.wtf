import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from "react";
import PageTitle from "../../components/PageTitle";
import StationList from "../../components/StationList";
import { getStationRegions, getStationsByRegion } from "../../data/stations";
import { RegionalArea, RegionalAreaToString, TStation } from "../../data/station_types";

export default class extends React.Component<{region: RegionalArea, stations: Readonly<TStation>[]}> {
    render() {
      const {stations, region} = this.props;
      return <>
          <PageTitle>{RegionalAreaToString(region)} Stations</PageTitle>
          <StationList stations={stations} />
      </>;
    }
  }

export const getStaticPaths: GetStaticPaths = async () => {
  const classes = getStationRegions().map(c => ({ params: { region: c.toString() } }));
  return {
    paths: classes,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const region = context.params!.region as RegionalArea;
    return {
      props: {
        region: region,
        stations: getStationsByRegion(region)
      }
    };
}

// disable client-side JavaScript
export const config = { unstable_runtimeJS: false };