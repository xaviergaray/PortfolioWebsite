import React, { useEffect } from "react";
import {AppProps} from "next/app";
import { init } from "@socialgouv/matomo-next";

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL!;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID!;

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        init({
            url: MATOMO_URL,
            siteId: MATOMO_SITE_ID,
            disableCookies: true,
        });
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp;