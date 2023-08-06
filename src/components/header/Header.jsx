import { NavLink } from 'react-router-dom';

import Search from '../search/Search';
import style from './Header.module.css';
import logo from '../../assets/icons/logo.svg';
// import User from '../user/User';

function Header() {
  return (
    <header className={style.wrapper}>
      <div className={style.container}>
        <nav className={style.inner}>
          <div className={style.logo}>
            <img src={logo} alt="logo" />
            <div className={style.title}>
              <span>MangoRead</span>
              <p>Читай мангу с нами</p>
            </div>
          </div>
          <Search />
          {/* <User /> */}
          <div className={style.buttons}>
            <NavLink>Войти</NavLink>
            <NavLink>Регистрация</NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
