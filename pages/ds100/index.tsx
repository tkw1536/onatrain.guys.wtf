import { GetStaticProps } from "next";
import * as React from "react";
import { getStationDS100s } from "../../data/stations";
import PageTitle from "../../components/PageTitle";
import { DS100Link } from "../../components/StationData";

export default class Home extends React.Component<{ds100s: string[]}> {
  render() {
    const {ds100s} = this.props;
    return <>
        <PageTitle>All DS100 Offices</PageTitle>
        {ds100s.map(ds100 => <li><DS100Link ds100={ds100} /></li>)}
    </>;
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
      props: {
        ds100s: getStationDS100s(),
      }
    };
}
