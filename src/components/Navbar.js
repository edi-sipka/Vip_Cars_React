import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import { signOutUser } from '../redux/user/userSlice';
import NavFooter from './NavFooter';
import Logo from '../assets/vip_cars_logo.png';
import '../App.css';

function Navbar() {
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
    <header className="Navbar">
      <img className="logo" src={Logo} alt="Vip Cars Logo" />
      <div>
        <ul className="navbar-ul">
          {NavbarData.map((val) => (
            <li
              key={val.link}
            >
              <a
                className="navbar-li"
                id={window.location.pathname === val.link ? 'active' : ''}
                href={val.link}
              >
                {val.name}
              </a>
            </li>
          ))}

        </ul>
      </div>
      <button onClick={logout} className="sign-out-btn" type="button">Log Out</button>
      <div className="footer">
        <NavFooter />
      </div>

    </header>
  );
}

export default Navbar;
