import Link from "next/link";
import * as React from "react";
import { RegionalArea, RegionalAreaToString, StationCategory } from "../data/station_types";
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


