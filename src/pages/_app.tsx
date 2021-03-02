import React from 'react';
import Layout from '../components/layout';
import '../../public/css/global.css';

import type { AppProps } from 'next/app';

function App({Component, pageProps}: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default App;