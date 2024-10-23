import React, { useEffect, useState } from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { CiLogout, CiUser } from 'react-icons/ci';
import { Link,useNavigate } from 'react-router-dom';
import l from '../image/logo.webp';
import './nav.css';


const Nav = ({ search, setSearch, searchproduct, logout, user, isAuthenticated,setIsAuthenticated, setUsername, }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false); // Clear authentication state
    setUsername(''); // Clear username if necessary
    navigate('/login'); // Navigate to the login page
  };


  return (
    <>
      <div className='header'>
        <div className='top_header'>
          <div className='icon'>
            <MdLocalShipping />
          </div>
          <div className='info'>
            <p>Free Shipping When Shopping up to $1000</p>
          </div>
        </div>
        <div className='mid_header'>
          <div className='logo'>
            <img src={l} alt='logo' />
          </div>
          <div className='search_box'>
            <input
              type='text'
              value={search}
              placeholder='search'
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={searchproduct}>
              <AiOutlineSearch />
            </button>
          </div>
          {isAuthenticated ? (
            <div className='user'>
              <div className='icon'>
                <CiLogout />
              </div>
              <div className='btn'>
                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className='user'>
              <div className='icon'>
                <FiLogIn />
              </div>
              <button onClick={handleLogout}>Logout</button>
              
            </div>
          )}
        </div>
        <div className='last_header'>
          <div className='user_profile'>
            {isAuthenticated ? (
              <>
                <div className='icon'>
                  <CiUser />
                </div>
                <div className='info'>
                  <h2>{user.username}</h2>
                </div>
              </>
            ) : (
              <>
                <div className='icon'>
                  <CiUser />
                </div>
                <div className='info'>
                  <p>Welcome,{user.username}!</p>
                </div>
              </>
            )}
          </div>
          <div className='nav'>
            <ul>
              <li><Link to='/' className='link' >Home</Link></li>

              <li><Link to='/shop' className='link'>Shop</Link></li>
              <li><Link to='/cart' className='link'>Cart</Link></li>
              <li><Link to='/about' className='link'>About</Link></li>
              <li><Link to='/contact' className='link'>Contact</Link></li>
            </ul>
          </div>
          <div className='offer'>
            <p>Flat 10% off on all iPhones</p>
          </div>
        </div>
       
      </div>
    </>
  );
};

export default Nav;