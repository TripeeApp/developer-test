import React, { useState, useEffect } from 'react';
import axios from '../services/gitApi';
import styles from '../../public/css/home.module.css';

function Home() {
    const [following, setFollowing] = useState([]);
    const [repos, setRepos] = useState([]);
    const [fPage, setFPage] = useState(1);
    const [rPage, setRPage] = useState(1);

    if(process.browser) {
        axios.defaults.headers.common['Authorization'] = `token ${localStorage.getItem('//gitTokenTripee//')}`;
    }

    const searchRepos = (nextPage = 0) => {
        axios.get(`/user/repos?page=${rPage+nextPage}&per_page=5`).then(res => {
            setRepos(res.data);
        })
    }

    const searchFollowing = (nextPage = 0) => {
        axios.get(`/user/following?page=${fPage+nextPage}&per_page=5`).then(res => {
            setFollowing(res.data);
        });

    }

    useEffect(() => {
        console.log(axios.defaults.headers)
        searchRepos()
        searchFollowing();
    }, []);

    return (
        <section className={styles.main}>
            <div className={styles.opts}>
                <span>Following</span>
                <span>Repositories</span>
            </div>

            <div className={styles.content}>
                <ul>
                    {
                        following.map(item => {
                            return (
                                <>
                                <li>
                                    <img src={item.avatar_url} />
                                </li>
                                <li>
                                    <img src={item.avatar_url} />
                                </li>
                                <li>
                                    <img src={item.avatar_url} />
                                </li>
                                <li>
                                    <img src={item.avatar_url} />
                                </li>
                                <li>
                                    <img src={item.avatar_url} />
                                </li>
                                </>
                            )
                        })
                    }
                </ul>
                <div className={styles.pageController}>
                    <span> &#9664; </span>
                    <span> {fPage} </span>
                    <span> &#9654; </span>
                </div>

            </div>
        </section>
    )
}

export default Home;