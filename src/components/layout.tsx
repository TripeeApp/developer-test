import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import styles from '../../public/css/layout.module.css';

function Layout({children}) {
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        setAvatar(localStorage.getItem('gitAvatar'));
    })

    const logOut = () => {
        localStorage.clear();
        window.location.href = '/'
    }

    return (
        <>
            <nav className={styles.navbar}>
                <Link href='/'>Tripee</Link> 
                <a>
                    <img
                        src={avatar}
                    />
                    <div className={styles.userOpts}>
                        <Link href='/profile'><span>Profile</span></Link>
                        <span onClick={logOut}>Log out</span>
                    </div>
                </a>
            </nav>
            <main className={styles.layout}>
                {children}
            </main>

            <footer className={styles.footer}>
                <span>By: N</span>
            </footer>
        </>
    )
}

export default Layout;