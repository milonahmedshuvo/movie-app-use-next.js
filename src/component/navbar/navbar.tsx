"use client"

import Link from 'next/link'
import { useState } from 'react'


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo */}
        <div className="navbar-logo">
          <Link href="/">
            MovieApp
          </Link>
        </div>

        {/* Menu Items */}
        <div className="navbar-links">
          <Link href="/" className="navbar-link">
            Home
          </Link>
          <Link href="/watchlist" className="navbar-link">
            Watchlist
          </Link>
          <Link href="/about" className="navbar-link">
            About
          </Link>
          <Link href="/contact" className="navbar-link">
            Contact
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="navbar-hamburger">
          <button onClick={toggleMenu}>
            {isOpen ? <span className="icon-close">X</span> : <span className="icon-bars">≡</span>}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="navbar-mobile-menu">
          <div className="navbar-mobile-links">
            <Link href="/" className="navbar-link" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/watchlist" className="navbar-link" onClick={toggleMenu}>
              Watchlist
            </Link>
            <Link href="/about" className="navbar-link" onClick={toggleMenu}>
              About
            </Link>
            <Link href="/contact" className="navbar-link" onClick={toggleMenu}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
