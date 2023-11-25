import { GetStaticProps } from "next";
import Link from "next/link";
import * as React from "react";
import PageTitle from "../components/PageTitle";
import { FederalStateLink, RegionalAreaLink, StationCategoryLink } from "../components/StationData";
import { StationMatch, getAllMatches, getStationCategories, getStationCount, getStationRegions, getStationStates, } from "../data/stations";
import { FederalState, RegionalArea, StationCategory } from "../data/station_types";
import { default as FuzzySet } from "fuzzyset";
import { normalizeName } from "../data/utils"
import { withRouter, NextRouter } from "next/router";

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

export default class Home extends React.Component<{count: number, categories: StationCategory[], regions: RegionalArea[], matches: Readonly<StationMatch>[]}> {
  render() {
    const { count, categories, regions, matches } = this.props;
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
          <h2>Jump To Station</h2>
          <StationJump all={matches} />
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


interface StationJumpProps { all: Readonly<StationMatch>[], router: NextRouter; }
interface StationJumpState {matches: Readonly<StationMatch>[]}

const StationJump = withRouter(class extends React.Component<StationJumpProps, StationJumpState> {
  state: StationJumpState = { matches: [] as StationMatch[]}

  private querySet: FuzzySet | null = null;
  private nToMatch: Record<string,StationMatch> = {};
  private query(query: string): StationMatch[] {
    // normalize the query and bail out if there isn't anything
    const q = normalizeName(query);
    if (q === "") {
      return [];
    }

    // initialize the queryset (if we didn't already)
    if (!this.querySet) {
      this.querySet = FuzzySet();
      this.props.all.forEach(e => {
        this.querySet!.add(e.normalized)
        this.nToMatch[e.normalized] = e;
      });
    }

    // find results
    const results = this.querySet.get(q);
    if (!results) {
      return [];
    }
    // TODO: Sort stable!
    results.sort((a,b) => b[0] - a[0]);
    console.log(results);

    // get the normalized results
    const names = results.sort((a,b) => b[0] - a[0])
    return names.map((e) => this.nToMatch[e[1]]);
  }

  private update = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ matches: this.query(event.target.value) });
  }, 150)

  private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { matches } = this.state;
    if (matches.length < 1) {
      return;
    }
    
    this.props.router.push(`/station/${matches[0].ID}`);
  }

  render() {
    const { matches } = this.state;
    return <>
      <form onSubmit={this.onSubmit}>
      <input type="text" autoComplete="false" onChange={this.update}></input>
      </form>
      <p>
        Type the name of any station for it to start appearing.
        Hit enter to navigate to the first match.
      <table>
        { matches.map(s => <tr key={s.ID}><td><a href={`/station/${s.ID}`}>{s.name}</a></td></tr>)}
      </table>
      </p>
    </>
  }
})

/** debounce a function with one argument */
function debounce<T>(f: (arg: T) => void, delay: number): (arg: T) => void {
  let id: NodeJS.Timeout | null;
  return (arg: T) => {
    // kill previous timeout (if any)
    if (id !== null) {
      window.clearTimeout(id);
      id = null;
    }

    // set a new timeout
    id = setTimeout(() => f(arg), delay);
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      count: getStationCount(),
      categories: getStationCategories(),
      regions: getStationRegions(),
      states: getStationStates(),
      matches: getAllMatches(),
    }
  };
}
