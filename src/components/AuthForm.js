const AuthForm = () => {
  return (
    <section className="content__auth auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form">
        <label className="auth__fieldset">
          <input className="auth__input" type="email" placeholder="Email" />
          <span className="auth__input-error">123</span>
        </label>
        <label className="auth__fieldset">
          <input className="auth__input" type="password" placeholder="Пароль" />
          <span className="auth__input-error">123</span>
        </label>
        <button type="submit" className="auth__submit">Зарегистрироваться</button>
        <a className="auth__link" href="#">Уже зарегистрированы? Войти</a>
      </form>
    </section>

  )
}

export default AuthForm