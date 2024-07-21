import { GoogleMap } from './GoogleMap.jsx'
import { AboutPreview } from './AboutPreview.jsx'

import { Link, useNavigate, Outlet } from 'react-router-dom'
import { useState } from 'react'

import '../css/about.css'

export function About() {
  return (
    <section className='section-container about'>
      <h2>About Us</h2>
      <h3>"Your Ultimate Destination for Gaming Excellence!"</h3>
      <div className='about-container'>
        <img
          className='store-img'
          src='https://media.king5.com/assets/CCT/images/0a9c22e8-c93b-4196-a87a-6529dceb078d/0a9c22e8-c93b-4196-a87a-6529dceb078d_750x422.jpg'
          alt=''
        />

        <div className='preview-container'>
          <h3>Who we are?</h3>
          <nav className='about-nav-container'>
            <Link replace to='/about/team'>
              Team
            </Link>
            <Link replace to='/about/vision'>
              Vision
            </Link>
          </nav>
          <Outlet />
        </div>
        <div className='map-container'>
          <h3>Visit us</h3>

          <GoogleMap />
        </div>
      </div>
    </section>
  )
}
