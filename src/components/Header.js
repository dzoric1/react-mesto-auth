import headerLogo from '../assets/images/logo.svg'
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Header({ email }) {

  const [isBurgerOpen, setIsBurgerOpen] = useState(false)
  const location = useLocation()

  function handleBurger() {
    setIsBurgerOpen((isBurgerOpen) => !isBurgerOpen)
  }

  function removeToken() {
    localStorage.removeItem('token')
  }

  return (
    <header className={`header ${isBurgerOpen ? 'header_open' : ''}`}>
      <img className="header__logo" src={headerLogo} alt="Логотип" />

      {location.pathname === '/' && (
        <>
          <div className='header__profile-info'>
            <p className='header__email'>{email}</p>
            <Link
              className="header__logout-link"
              to='/sign-in'
              onClick={removeToken}
            >
              Выйти
            </Link>
          </div>
          <button
            className='header__burger'
            onClick={handleBurger}>
            <span
              className={`header__burger-bar ${isBurgerOpen ? 'header__burger-bar_type_close' : ''}`}>
            </span>
          </button>
        </>
      )}

      {location.pathname === '/sign-up' && (
        <Link className='header__link' to='/sign-in'>
          Войти
        </Link>
      )}

      {location.pathname === '/sign-in' && (
        <Link className='header__link' to='/sign-up'>
          Регистрация
        </Link>
      )}

    </header>
  )
}

export default Header;
