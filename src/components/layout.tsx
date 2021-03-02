import React from 'react';
import Link from 'next/link';
import styles from '../../public/css/layout.module.css';

function Layout({children}) {
    return (
        <>
            <nav className={styles.navbar}>
                <Link href='/'>Tripee</Link> 
                <Link href='/login'>
                    <a>
                        <img
                            src='/images/user-icon.png'
                            alt='user img'
                        />
                    </a>
                </Link> 
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