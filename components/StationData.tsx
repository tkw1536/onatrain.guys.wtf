import Link from "next/link";
import * as React from "react";
import { FederalState, FederalStateToString, RegionalArea, RegionalAreaToString, StationCategory } from "../data/station_types";
import { encodeData } from "../data/utils";
import style from "./StationData.module.css";

export class StationCategoryLink extends React.Component<{ category: StationCategory }> {
    render() {
        const { category } = this.props;
        return <Link href={`/category/${category}`}>
            <a className={style["Enum_" + category + "_7"]}>Category {category}</a>
        </Link>;
    }
}

const regions = [RegionalArea.West, RegionalArea.SouthWest, RegionalArea.SouthEast, RegionalArea.South, RegionalArea.East, RegionalArea.North, RegionalArea.Center,]
export class RegionalAreaLink extends React.Component<{ region: RegionalArea }> {
    render() {
        const { region } = this.props;
        return <Link href={`/region/${region}`}>
            <a className={style["Enum_" + (regions.indexOf(region) + 1) + "_7"]}>{RegionalAreaToString(region)}</a>
        </Link>;
    }
}


export class FederalStateLink extends React.Component<{ state: FederalState }> {
    render() {
        const { state } = this.props;
        return <Link href={`/state/${state}`}>
            <a>{FederalStateToString(state)}</a>
        </Link>;
    }
}

export class ManagementLink extends React.Component<{ management: string }> {
    render() {
        const { management } = this.props;
        if (!management) return null;
        return <Link href={`/management/${encodeData(management)}`}>
            <a>{management}</a>
        </Link>;
    }
}

export class TransportAuthorityLink extends React.Component<{ authority: string }> {
    render() {
        const { authority } = this.props;
        if (!authority) return null;
        return <Link href={`/authority/${encodeData(authority)}`}>
            <a>{authority}</a>
        </Link>;
    }
}