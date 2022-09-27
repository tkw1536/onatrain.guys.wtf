import { GetStaticProps } from "next";
import * as React from "react";
import { getAllStations } from "../../data/stations";
import StationList from "../../components/StationList";
import PageTitle from "../../components/PageTitle";
import { TStation } from "../../data/station_types";

export default class Home extends React.Component<{stations: Readonly<TStation>[]}> {
  render() {
    const {stations} = this.props;
    return <>
        <PageTitle>All Stations</PageTitle>
        <StationList stations={stations} />
    </>;
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
      props: {
        stations: getAllStations(),
      }
    };
}

