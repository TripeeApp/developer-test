import React, { useState } from 'react';
import styles from '../../public/css/login.module.css';


function Login() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const handleLogin = e => {
        e.preventDefault();
        console.log('ok')
    }

    return (
        <div className={styles.main}>
            <fieldset>
                <legend>Login</legend>
                <form>
                    <input 
                        type='email' 
                        placeholder='Email' 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                    
                    <input 
                        type='password' 
                        placeholder='Senha' 
                        value={pwd} 
                        onChange={e => setPwd(e.target.value)} 
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