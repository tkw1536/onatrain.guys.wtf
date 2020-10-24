import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from "react";
import PageTitle from "../../components/PageTitle";
import StationList from "../../components/StationList";
import { getStationCategories, getStationsByCategory } from "../../data/stations";
import { StationCategory, TStation } from "../../data/station_types";

export default class extends React.Component<{category: StationCategory, stations: Readonly<TStation>[]}> {
    render() {
      const {stations, category} = this.props;
      return <>
          <PageTitle>Category {category} Stations</PageTitle>
          <StationList stations={stations} />
      </>;
    }
  }

export const getStaticPaths: GetStaticPaths = async () => {
  const classes = getStationCategories().map(c => ({ params: { category: c.toString() } }));
  return {
    paths: classes,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const category = parseInt(context.params!.category as string, 10);
    return {
      props: {
        category: category,
        stations: getStationsByCategory(category)
      }
    };
}
