import style from './User.module.css';
import arrow from '../../assets/icons/arrow_drop_down.svg';
import { useDispatch } from 'react-redux';
import { postLogout } from '../../redux/slices/PostLogoutSlice';
import PropTypes from 'prop-types';
import { clearUsername } from '../../redux/slices/SignInSlice';

function User({ username }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(postLogout()).then(() => dispatch(clearUsername()));
  };

  User.propTypes = {
    username: PropTypes.object,
  };

  return (
    <div className={style.wrapper}>
      <p>{username.username}</p>
      <div className={style.photo} onClick={handleClick}>
        <img src={username.image_file} className={style.photo_inner} alt="userPhoto" />
        <img src={arrow} className={style.arrow} alt="arrow" />
      </div>
    </div>
  );
}

export default User;
