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

    const handleLogin = async (e: any) => {
        e.preventDefault()
        try {
            await axios.get('/user', { 
                headers: { 
                    Authorization: `token ${token}` 
                } 
            }).then(res => {
                localStorage.setItem('//gitTokenTripee//', token);
                window.location.href = '/home';
            });
        } catch (error) {
            alert('Houve um erro, cheque o token e tente novamente')
        }
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
                        onClick={e => handleLogin(e)} 
                    />
                </form>
            </fieldset>
        </div>
    )
}

export default Login;