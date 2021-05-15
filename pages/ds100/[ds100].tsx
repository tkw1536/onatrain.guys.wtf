import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from "react";
import PageTitle from "../../components/PageTitle";
import StationList from "../../components/StationList";
import { getStationsByDS100, getStationDS100s } from "../../data/stations";
import { TStation } from "../../data/station_types";

export default class extends React.Component<{ds100: string, stations: Readonly<TStation>[]}> {
    render() {
      const {stations, ds100} = this.props;
      return <>
          <PageTitle>{ds100} Stations</PageTitle>
          <StationList stations={stations} />
      </>;
    }
  }

export const getStaticPaths: GetStaticPaths = async () => {
  const classes = getStationDS100s().map(c => ({ params: { ds100: c.toString() } }));
  return {
    paths: classes,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const ds100 = context.params!.ds100 as string;
    return {
      props: {
        ds100: ds100,
        stations: getStationsByDS100(ds100)
      }
    };
}
