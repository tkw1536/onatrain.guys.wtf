import { GetStaticProps } from "next";
import Link from "next/link";
import * as React from "react";
import PageTitle from "../components/PageTitle";
import { FederalStateLink, RegionalAreaLink, StationCategoryLink } from "../components/StationData";
import { getStationCategories, getStationCount, getStationRegions, getStationStates, } from "../data/stations";
import { FederalState, RegionalArea, StationCategory } from "../data/station_types";

const StationCatgeoryDescriptions: Record<StationCategory, string> = {
  1: "Traffic Hub",
  2: "Long-Distance Junction or Airport Connection",
  3: "City Main Station",
  4: "Regional Station",
  5: "Small Town Station / Suburban Station",
  6: "Basic Station",
  7: "Rural Station",
}

const RegionalAreaStates: Record<RegionalArea, FederalState[]> = {
  "west": [FederalState.NorthRhineWestphalia],
  "southwest": [FederalState.BadenWuerttemberg],
  "southeast": [FederalState.Saxony, FederalState.SaxonyAnhalt, FederalState.Thuringia],
  "south": [FederalState.Bavaria],
  "east": [FederalState.Berlin, FederalState.Brandenburg, FederalState.MecklenburgVorpommern],
  "north": [FederalState.SchleswigHolstein, FederalState.Hamburg, FederalState.LowerSaxony, FederalState.Bremen],
  "center": [FederalState.Hesse, FederalState.RhinelandPalatinate, FederalState.Saarland],
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
          <Link href="/station"><a>View all {count} Stations on one page</a></Link>. <br />
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
          <h2>By Region / Federal State</h2>
          <p>There are seven regions and sixteen states. Click on a region label to view all stations in that region. </p>
          <table>
              {regions.map(region => <tr key={region}>
                <td><RegionalAreaLink region={region} /></td>
                <td>{
                  RegionalAreaStates[region]
                    .map(state => <FederalStateLink key={state} state={state} /> as React.ReactNode)
                    .reduce((previous, current) => [previous, ", ", current])
                }</td>
              </tr>)}
          </table>
        </div>

        <div>
          <h2>Other Categories</h2>
          <ul>
              <li>
                <Link href="/management"><a>Station Managements</a></Link>
              </li>
              <li>
                <Link href="/authority"><a>Transport Authorities</a></Link>
              </li>
          </ul>
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
      states: getStationStates(),
    }
  };
}
