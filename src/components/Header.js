import headerLogo from '../assets/images/logo.svg'

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      {/* <a className='header__link' href="#">Регистрация</a> */}
      <div className='header__profile-info'>
        <p className='header__email'>email@mail.com</p>
        <a className="header__logout-link" href='#'>Выйти</a>
      </div>
      <button className='header__burger'>
        <span className='header__burger-bar'></span>
      </button>
    </header>
  )
}

export default Header;
