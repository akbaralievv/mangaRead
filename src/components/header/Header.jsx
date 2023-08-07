import { NavLink } from 'react-router-dom';

import Search from '../search/Search';
import style from './Header.module.css';
import logo from '../../assets/icons/logo.svg';
import { setOpen, setActive } from '../../redux/slices/openModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import User from '../user/User';
import { getUsername, setUser } from '../../helpers/token';
import { useEffect, useState } from 'react';
import { getUsers } from '../../redux/slices/GetUserSlice';

function Header() {
  const { username } = useSelector((state) => state.SignInSlice);
  const { success } = useSelector((state) => state.PostLogoutSlice);
  const { data: users } = useSelector((state) => state.GetUserSlice);
  const [userIsTrue, setUserIsTrue] = useState(false);
  const [hasFetchedUsers, setHasFetchedUsers] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (username && !hasFetchedUsers) {
      dispatch(getUsers());
      setHasFetchedUsers(true);
    }
  }, [dispatch, username, hasFetchedUsers]);

  useEffect(() => {
    if (users.length > 0 && username) {
      const user = users.filter((user) => user.username === username);
      setUser(JSON.stringify(user[0]));
      const getUser = JSON.parse(getUsername());
      setUserIsTrue(getUser);
    }
  }, [users, username]);

  useEffect(() => {
    const getUser = JSON.parse(getUsername());
    setUserIsTrue(getUser);
  }, [success, username]);

  const handleClickAuth = () => {
    document.body.style.overflow = 'hidden';
    dispatch(setOpen(true));
    dispatch(setActive(true));
  };
  const handleClickRegister = () => {
    document.body.style.overflow = 'hidden';
    dispatch(setOpen(true));
    dispatch(setActive(false));
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
              <NavLink onClick={handleClickAuth}>Войти</NavLink>
              <NavLink onClick={handleClickRegister}>Регистрация</NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
