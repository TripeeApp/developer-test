import React, { useEffect, useState } from 'react';
import styles from '../../public/css/profile.module.css';
import axios from '../services/gitApi';

function Profile() {
    const [userInfo, setUserInfo] = useState({
        name: 'Nathan Reis de Almeida',
        email: '',
        twitter_username: '',
        location: '',
        hireable: false,
        bio: '',
        blog: ''
    });
    
    if(process.browser) {
        axios.defaults.headers.common['Authorization'] = `token ${localStorage.getItem('//gitTokenTripee//')}`;
    }

    const attachAutocomplete = () => {
        const inputLocation = document.getElementById('location');
        new google.maps.places.Autocomplete(inputLocation);
    }


    const loadUserInfo = async () => {
        await axios.get('/user').then(res => {
            setUserInfo({
                name: res.data.name,
                email: res.data.email || '',
                twitter_username: res.data.twitter_username || '',
                location: res.data.location || '',
                hireable: res.data.hireable || false,
                bio: res.data.bio || '',
                blog: res.data.blog || ''
            });
        });
    }

    const sendUserInfo = async () => {
        try {
            await axios.patch('/user', userInfo).then(res => {
               alert('Alteração realizada com sucesso') 
            });
            
        } catch (error) {
            alert('Houve um erro, verifique as permissões do seu token')
        }
    }


    useEffect(() => {
        loadUserInfo();
        attachAutocomplete();
    }, []);

    return (
        <>
            <section className={styles.main}> 
                <form>
                    <label htmlFor='name'>Name</label> 
                    <input 
                        type='text' 
                        name='name' 
                        value={userInfo.name} 
                        onChange={e => setUserInfo({...userInfo, name: e.target.value})}
                        id='name'
                    />
                    
                    <label htmlFor='email'>Email</label> 
                    <input 
                        type='email' 
                        name='email' 
                        value={userInfo.email} 
                        onChange={e => setUserInfo({...userInfo, email: e.target.value})}
                        id='email' 
                    />
                    
                    <label htmlFor='location'>Location</label> 
                    <input 
                        type='text' 
                        name='location' 
                        value={userInfo.location} 
                        onChange={e => setUserInfo({...userInfo, location: e.target.value})}
                        id='location' 
                    />
                    
                    <label htmlFor='blog'>Blog</label> 
                    <input 
                        type='text' 
                        name='blog' 
                        value={userInfo.blog} 
                        onChange={e => setUserInfo({...userInfo, blog: e.target.value})}
                        id='blog' 
                    />
                    
                    <label htmlFor='twitter'>Twitter</label> 
                    <input 
                        type='text' 
                        name='twitter' 
                        value={userInfo.twitter_username} 
                        onChange={e => setUserInfo({...userInfo, twitter_username: e.target.value})}
                        id='twitter' 
                    />
                    
                    <label htmlFor='hireable' >Hireable</label>
                    <select 
                        defaultValue={Number(userInfo.hireable)} 
                        onChange={e => setUserInfo({...userInfo, hireable: Boolean(e.target.value)})} 
                        id='hireable'
                    >
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                    </select>
                    
                    <label htmlFor='bio'>Bio</label> 
                    <textarea 
                        name='bio' 
                        value={userInfo.bio} 
                        onChange={e => setUserInfo({...userInfo, bio: e.target.value})}
                        id='bio' 
                    />
                    
                    <input 
                        type='button' 
                        value='Update' onClick={e => sendUserInfo()} 
                    />
                </form>
            </section>
        </>
    )
}

export default Profile;