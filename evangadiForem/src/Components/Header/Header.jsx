import React from 'react'
import styles from './Header.module.css'
import logo from '../../assets/images/logo.png'

function Header() {
  return (
    <div className={styles.header_wrapper}>
        <div className={styles.header_container}>
            <div className={styles.header_logo}>
                <img src={logo} alt="logo" width={'180px'} />
            </div>
            <div className={styles.left_menu}>

                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">How it works</a></li>
                    <li><button>SIGN IN</button></li>
                </ul>
            </div>

        </div>

    </div>
  )
}

export default Header