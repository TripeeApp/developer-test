import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import '../../public/css/global.css';
import config from '../../config.json';

import type { AppProps } from 'next/app';

function App({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <script 
                    src={`https://maps.googleapis.com/maps/api/js?key=${config.googleApiKey}&libraries=places`}
                    async
                ></script>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    )
}

export default App;