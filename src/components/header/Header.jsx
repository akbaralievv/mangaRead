import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Search from '../search/Search';
import User from '../user/User';
import { setOpen, setActive, setVisible } from '../../redux/slices/openModalSlice';
import { getUsers } from '../../redux/slices/GetUserSlice';
import { getUsername, setUser } from '../../helpers/token';

import style from './Header.module.css';
import logo from '../../assets/icons/logo.svg';

function Header() {
  const { username } = useSelector((state) => state.SignInSlice);
  const { success } = useSelector((state) => state.PostLogoutSlice);
  const { data: users } = useSelector((state) => state.GetUserSlice);
  const [userIsTrue, setUserIsTrue] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (username) {
      dispatch(getUsers());
    }
  }, [dispatch, username]);

  useEffect(() => {
    if (users.length > 0 && username) {
      const user = users.find((user) => user.username === username);

      if (user) {
        setUser(JSON.stringify(user));
        const getUser = JSON.parse(getUsername());
        setUserIsTrue(getUser);
      }
    }
  }, [users, username]);

  useEffect(() => {
    const getUser = JSON.parse(getUsername());
    setUserIsTrue(getUser);
  }, [success, username]);

  const handleClick = (active) => {
    document.body.style.overflow = 'hidden';
    dispatch(setOpen(true));
    dispatch(setVisible(true));
    dispatch(setActive(active));
  };

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
          {userIsTrue ? (
            <User username={userIsTrue} />
          ) : (
            <div className={style.buttons}>
              <NavLink onClick={() => handleClick(true)}>Войти</NavLink>
              <NavLink onClick={() => handleClick(false)}>Регистрация</NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
