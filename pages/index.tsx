import { GetStaticProps } from "next";
import Link from "next/link";
import * as React from "react";
import PageTitle from "../components/PageTitle";
import { RegionalAreaLink, StationCategoryLink } from "../components/StationData";
import { getStationCategories, getStationCount, getStationRegions, } from "../data/stations";
import { RegionalArea, StationCategory } from "../data/station_types";

const StationCatgeoryDescriptions: Record<StationCategory, string> = {
  1: "Traffic Hub",
  2: "Long-Distance Junction or Airport Connection",
  3: "City Main Station",
  4: "Regional Station",
  5: "Small Town Station / Suburban Station",
  6: "Basic Station",
  7: "Rural Station",
}

const RegionalAreaDescription: Record<RegionalArea, string> = {
  "west": "North Rhine-Westphalia",
  "southwest": "Baden-Württemberg",
  "southeast": "Saxony, Saxony-Anhalt, Thuringia",
  "south": "Bavaria",
  "east": "Berlin, Brandenburg, Mecklenburg-Vorpommern",
  "north": "Schleswig-Holstein, Hamburg, Lower Saxony, Bremen",
  "center": "Hesse, Rheinland-Pfalz, Saarland",
}

export default class Home extends React.Component<{count: number, categories: StationCategory[], regions: RegionalArea[]}> {
  render() {
    const { count, categories, regions } = this.props;
    return <>
        <PageTitle noHomeLink>On A Train</PageTitle>
        <div>
          This page contains information about Stations and Tracks of Deutsche Bahn. 
        </div>
        <div>
          <h2>All Stations</h2>
          <Link href="/all"><a>View all {count} Stations on one page</a></Link>.
        </div>
        <div>
          <h2>By Station Category</h2>
          <p>There are seven categories. Click on a category label to view all stations of that category. </p>
          <table>
              {categories.map(cls => <tr key={cls}>
                <td><StationCategoryLink category={cls} /></td>
                <td>{StationCatgeoryDescriptions[cls]}</td>
              </tr>)}
          </table>
        </div>
        <div>
          <h2>By Region</h2>
          <p>There are seven regions. Click on a region label to view all stations in that region. </p>
          <table>
              {regions.map(region => <tr key={region}>
                <td><RegionalAreaLink region={region} /></td>
                <td>{RegionalAreaDescription[region]}</td>
              </tr>)}
          </table>
        </div>
    </>;
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      count: getStationCount(),
      categories: getStationCategories(),
      regions: getStationRegions(),
    }
  };
}
