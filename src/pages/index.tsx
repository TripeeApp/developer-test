import React, { useState, useEffect } from 'react';
import axios from '../services/gitApi';
import styles from '../../public/css/login.module.css';

function Login() {
    const [token, setToken] = useState('');

    useEffect(() => {
        if(localStorage.getItem('//gitTokenTripee//')) {
            window.location.href = '/home'
        }
    })

    const handleLogin = e => {
        axios.get('/user', { 
            headers: { 
                Authorization: `token ${token}` 
            } 
        }).then(res => {
            if(res.status === 200) {
                localStorage.setItem('//gitTokenTripee//', token);
                window.location.href = '/home';
            }
        });
    }

    return (
        <div className={styles.main}>
            <fieldset>
                <legend>Login</legend>
                <form>
                    <input 
                        type='text'
                        placeholder='Github Token' 
                        value={token} 
                        onChange={e => setToken(e.target.value)} 
                        required
                    />

                    <input 
                        type="button" 
                        value="Login" 
                        onClick={handleLogin} 
                    />
                </form>
            </fieldset>
        </div>
    )
}

export default Login;