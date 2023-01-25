import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSignOut } from 'react-auth-kit';
import { signOutUser } from '../redux/user/userSlice';
import NavFooter from './NavFooter';
import Logo from '../assets/vip_cars_logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = useSignOut();

  const NavbarData = [
    {
      name: 'CARS',
      link: '/',
    },
    {
      name: 'ADD CAR',
      link: '/add_car',
    },
    {
      name: 'DELETE CAR',
      link: '/delete_car',
    },
    {
      name: 'MY RESERVATIONS',
      link: '/reservations',
    },
    {
      name: 'RESERVE',
      link: '/reserve',
    },
  ];

  const logout = () => {
    signOut();
    dispatch(signOutUser());
    navigate('/login');
  };

  return (
    <header className="header">
      <img className="logo" src={Logo} alt="Vip Cars Logo" />

      <nav className={`nav ${isOpen ? 'open' : 'close'}`}>
        {
          NavbarData.map((nav) => (
            <a
              className="nav-link"
              href={nav.link}
              key={nav.name}
              id={window.location.pathname === nav.link ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              { nav.name }
            </a>
          ))
        }
        <button onClick={logout} className="sign-out-btn" type="button">Log Out</button>
      </nav>

      <NavFooter isOpen={isOpen} />
      <button
        type="button"
        title="mobile menu open button"
        className={`menu-btn ${isOpen ? 'open' : 'close'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="bar" />
      </button>
    </header>
  );
};

export default Navbar;
