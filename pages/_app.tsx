import * as React from "react";
import App from "next/app";

import '../styles/global.css';
import 'nprogress/nprogress.css';

import Router from "next/router";
import nProgress from "nprogress";

class AppRoutingIndicator extends React.Component<{minDelay: number}> {
    private timeout: NodeJS.Timeout | null = null;
    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.timeout = null;
            nProgress.start();
        }, this.props.minDelay);
    }
    componentWillUnmount() {
        if(this.timeout === null) {
            nProgress.done();
        } else {
            clearTimeout(this.timeout);
        }
    }
    render() {
        return null;
    }
}

export default class extends App {
    state = {routing: false};

    private readonly handleRoutingStart = () => this.setState({ routing: true });
    private readonly handleRoutingEnd = () => this.setState({ routing: false });

    componentDidMount() {
        Router.events.on("routeChangeStart", this.handleRoutingStart);
        Router.events.on("routeChangeComplete", this.handleRoutingEnd);
        Router.events.on("routeChangeError", this.handleRoutingEnd);
    }

    componentWillUnmount() {
        Router.events.off("routeChangeStart", this.handleRoutingStart);
        Router.events.off("routeChangeComplete", this.handleRoutingEnd);
        Router.events.off("routeChangeError", this.handleRoutingEnd);
    }

    render() {
        const { Component, pageProps } = this.props;
        const { routing } = this.state;
        return <>
            {routing && <AppRoutingIndicator minDelay={100} />}
            <Component {...pageProps} />
        </>;
    }
}

// disable client-side JavaScript
export const config = { unstable_runtimeJS: false };