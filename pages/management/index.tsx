import { GetStaticProps } from "next";
import * as React from "react";
import { getStationManagements } from "../../data/stations";
import PageTitle from "../../components/PageTitle";
import { ManagementLink } from "../../components/StationData";

export default class Home extends React.Component<{managements: string[]}> {
  render() {
    const {managements} = this.props;
    return <>
        <PageTitle>All Station Managements</PageTitle>
        {managements.map(management => <li><ManagementLink management={management} /></li>)}
    </>;
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
      props: {
        managements: getStationManagements(),
      }
    };
}

