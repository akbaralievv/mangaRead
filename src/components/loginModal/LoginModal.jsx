import { useState } from 'react';

import style from './LoginModal.module.css';
import closeIcon from '../../assets/icons/close.svg';
import AuthForm from '../authForm/AuthForm';
import RegisterForm from '../registerForm/RegisterForm';

function LoginModal() {
  const [active, setActive] = useState(true);
  const handleClick = (isTrue) => {
    setActive(isTrue);
  };
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.close}>
          <img src={closeIcon} alt="close" />
        </div>
        <nav className={style.nav}>
          <a className={`${active ? style.activeAuth : ''}`} onClick={() => handleClick(true)}>
            Войти
          </a>
          <a className={`${!active ? style.activeReg : ''}`} onClick={() => handleClick(false)}>
            Регистрация
          </a>
        </nav>
        {active ? <AuthForm /> : <RegisterForm />}
      </div>
    </div>
  );
}

export default LoginModal;
