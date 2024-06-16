import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Footer.module.css' // Import your custom CSS

export default function Footer() {
  return (
    <footer className={`d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top ${styles.footerBg}`}>
      <div className='container'>
        <div className='row w-100'>
          <div className='col-md-6 d-flex align-items-center'>
            <Link to="/" className={`mb-3 me-2 mb-md-0 text-decoration-none lh-1 ${styles.footerLink}`}>
              <img src='https://static.thenounproject.com/png/6801876-84.png' alt='FoodCart Logo' width='30' height='30' />
            </Link>
            <span className={styles.footerLink}>© 2023 Food'sCart, Inc</span>
          </div>
          <div className='col-md-6 d-flex justify-content-end align-items-center'>
            <p className={`mb-0 ${styles.footerLink}`}>Phone: +91 9102045710</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
