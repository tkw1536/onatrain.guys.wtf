import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from "react";
import PageTitle from "../../components/PageTitle";
import StationList from "../../components/StationList";
import { getStationByState, getStationStates } from "../../data/stations";
import { FederalStateToString, TStation, FederalState } from "../../data/station_types";

export default class extends React.Component<{state: FederalState, stations: Readonly<TStation>[]}> {
    render() {
      const {stations, state} = this.props;
      return <>
          <PageTitle>{FederalStateToString(state)} Stations</PageTitle>
          <StationList stations={stations} />
      </>;
    }
  }

export const getStaticPaths: GetStaticPaths = async () => {
  const classes = getStationStates().map(c => ({ params: { state: c.toString() } }));
  return {
    paths: classes,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const state = context.params!.state as FederalState;
    return {
      props: {
        state: state,
        stations: getStationByState(state)
      }
    };
}

// disable client-side JavaScript
export const config = { unstable_runtimeJS: false };