import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import style from "./PageTitle.module.css";

export default class PageTitle extends React.Component<{noHomeLink?: boolean}> {
    render() {
        const { children, noHomeLink } = this.props;
        const displayHome = !noHomeLink;
        return <header className={style.Header}>
            <Head><title>{children}</title></Head>
            <h1>{children} {displayHome && (<Link href="/"><a>Home</a></Link>)}</h1>
        </header>;
    }
}