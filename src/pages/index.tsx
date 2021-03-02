import React, { useState, useEffect } from 'react';
import axios from '../services/gitApi';

function Home() {
    const [following, setFollowing] = useState([]);
    const [repos, setRepos] = useState([]);
    const [fPage, setFPage] = useState(1);
    const [rPage, setRPage] = useState(1);

    const searchRepos = () => {
        axios.get(`/user/repos?page=${rPage}&per_page=10`, {
            headers: {
                Authorization: `token ${localStorage.getItem('//gitTokenTripee//')}`
            }
        }).then(res => {
            setRepos(res.data)
        })
    }

    const searchFollowing = () => {
        axios.get(`/user/following?page=${fPage}&per_page=10`, { 
            headers: {
                Authorization: `token ${localStorage.getItem('//gitTokenTripee//')}`
            }
         }).then(res => {
            setFollowing(res.data);
        });

    }

    useEffect(() => {
        searchRepos()
    });

    return (
        <h1>Home</h1>
    )
}

export default Home;