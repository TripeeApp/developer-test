import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import axios from '../services/gitApi';
import config from '../../config.json';
import '../../public/css/global.css';

import type { AppProps } from 'next/app';

function App({Component, pageProps}: AppProps) {
    const checkToken = async () => {
        axios.defaults.headers.common['Authorization'] = `token ${localStorage.getItem('//gitTokenTripee//')}`;
        try {
            await axios.get('/user');
        } catch(error) {
            alert('Você não tem permissão para acessar essa página');
            window.location.href = '/'
        }
    }

    if(process.browser && window.location.pathname !== '/') {
        checkToken();
    }

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