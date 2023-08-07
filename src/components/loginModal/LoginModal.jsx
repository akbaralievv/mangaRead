import style from './LoginModal.module.css';
import closeIcon from '../../assets/icons/close.svg';
import AuthForm from '../authForm/AuthForm';
import RegisterForm from '../registerForm/RegisterForm';
import { setActive, setOpen } from '../../redux/slices/openModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';

function LoginModal() {
  const { active } = useSelector((state) => state.openModalSlice);
  const dispatch = useDispatch();
  const handleClick = (isTrue) => {
    dispatch(setActive(isTrue));
  };
  const closeModal = () => {
    document.body.style.overflow = '';
    dispatch(setOpen(false));
  };

  const modalRef = useRef();

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
    <div className={style.wrapper}>
      <div className={style.inner} ref={modalRef}>
        <div className={style.content}>
          <div className={style.close}>
            <img src={closeIcon} alt="close" onClick={closeModal} />
          </div>
          <nav>
            <div className={style.nav}>
              <a className={`${active ? style.activeAuth : ''}`} onClick={() => handleClick(true)}>
                Войти
              </a>
              <a className={`${!active ? style.activeReg : ''}`} onClick={() => handleClick(false)}>
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
