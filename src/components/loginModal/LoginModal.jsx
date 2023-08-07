import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setActive, setOpen, setVisible } from '../../redux/slices/openModalSlice';
import AuthForm from '../authForm/AuthForm';
import RegisterForm from '../registerForm/RegisterForm';

import closeIcon from '../../assets/icons/close.svg';
import styles from './LoginModal.module.css';

function LoginModal() {
  const dispatch = useDispatch();
  const { active, visible } = useSelector((state) => state.openModalSlice);
  const modalRef = useRef();

  const handleClick = (isActive) => {
    dispatch(setActive(isActive));
  };

  const closeModal = () => {
    document.body.style.overflow = '';
    dispatch(setVisible(false));
    dispatch(setOpen(false));
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.inner} ${visible ? styles.visible : styles.hidden}`} ref={modalRef}>
        <div className={styles.content}>
          <div className={styles.close}>
            <img src={closeIcon} alt="close" onClick={closeModal} />
          </div>
          <nav>
            <div className={styles.nav}>
              <a className={active ? styles.activeAuth : ''} onClick={() => handleClick(true)}>
                Войти
              </a>
              <a className={!active ? styles.activeReg : ''} onClick={() => handleClick(false)}>
                Регистрация
              </a>
            </div>
            <hr />
          </nav>
          {active ? <AuthForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
