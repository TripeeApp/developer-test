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

    const switchDivs = (toClose, toOpen) => {
        const divToClose = document.getElementById(toClose);
        const divToOpen = document.getElementById(toOpen);
        
        divToClose.style.maxHeight = '0vh';
        divToOpen.style.maxHeight = '70vh'
    }

    const searchRepos = async (nextPage = 0) => {
        await axios.get(`/user/repos?page=${rPage+nextPage}&per_page=5`).then(res => {
            if(res.data.length < 1) {
                return
            }
            setRepos(res.data);
            setRPage(rPage+nextPage);
        })
    }

    const searchFollowing = async (nextPage = 0) => {
        await axios.get(`/user/following?page=${fPage+nextPage}&per_page=5`).then(res => {
            if(res.data.length < 1) {
                return
            }
            setFollowing(res.data);
            setFPage(fPage+nextPage)
        });
    }

    useEffect(() => {
        searchRepos()
        searchFollowing();
    }, []);

    return (
        <section className={styles.main}>
            <div className={styles.opts}>
                <span onClick={e => switchDivs('repositories', 'following')}>Following</span>
                <span onClick={e => switchDivs('following', 'repositories')}>Repositories</span>
            </div>

            <div className={styles.content}>
                <div className={styles.following} id='following'>
                    <ul>
                        {
                            following.map(item => {
                                return (
                                    <li key={Math.random()}>
                                        <img src={item.avatar_url} />
                                        <span>{item.login}</span>
                                        <span> <a href={item.html_url} target='_blank'> View in github </a> </span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className={styles.pageController}>
                        <span onClick={e => {
                            if(fPage <= 1) {
                                return
                            }
                            searchFollowing(-1)
                        }}> &#9664; </span>
                        <span> {fPage} </span>
                        <span onClick={e => searchFollowing(1)}> &#9654; </span>
                    </div>
                </div>

                <div className={styles.repositories} id='repositories'>
                    <ul>
                        {
                            repos.map(item => {
                                return (
                                    <li key={Math.random()}>
                                        <span>{item.name}</span>
                                        <span> <a href={item.html_url} target='_blank'> View in github </a> </span>
                                        {item.homepage ? <span> <a href={item.homepage} target='_blank'>Homepage</a> </span> : null}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className={styles.pageController}>
                        <span onClick={e => {
                            if(fPage <= 1) {
                                return
                            }
                            searchFollowing(-1)
                        }}> &#9664; </span>
                        <span> {fPage} </span>
                        <span onClick={e => searchFollowing(1)}> &#9654; </span>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Home;