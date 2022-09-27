import { GetStaticProps } from "next";
import * as React from "react";
import { getStationTransportAuthorities } from "../../data/stations";
import PageTitle from "../../components/PageTitle";
import { ManagementLink, TransportAuthorityLink } from "../../components/StationData";

export default class Home extends React.Component<{authorities: string[]}> {
  render() {
    const {authorities} = this.props;
    return <>
        <PageTitle>All Transport Authorities</PageTitle>
        {authorities.map(authority => <li><TransportAuthorityLink authority={authority} /></li>)}
    </>;
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
      props: {
        authorities: getStationTransportAuthorities(),
      }
    };
}
