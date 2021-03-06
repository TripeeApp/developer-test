import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import axios from '../services/gitApi';
import config from '../../config.json';
import '../../public/css/global.css';

import type { AppProps } from 'next/app';

function App({Component, pageProps}: AppProps) {
    const [canRender, setCanRender] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            axios.defaults.headers.common['Authorization'] = `token ${localStorage.getItem('//gitTokenTripee//')}`;
            try {
                await axios.get('/user');
                setCanRender(true);
            } catch(error) {
                alert('Você não tem permissão para acessar essa página');
                window.location.href = '/'
                setCanRender(false)
            }
        }
        
        if(process.browser && window.location.pathname !== '/') {
            checkToken();
        } else {
            setCanRender(true)
        }
    }, []);    
    
    return (
        <>
            {
                !canRender ? (
                    <></>
                ) : (
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
        </>
    )
}

export default App;