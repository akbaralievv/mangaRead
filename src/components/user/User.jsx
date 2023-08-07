import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { postLogout } from '../../redux/slices/PostLogoutSlice';
import { clearUsername } from '../../redux/slices/SignInSlice';

import arrowIcon from '../../assets/icons/arrow_drop_down.svg';
import style from './User.module.css';

function User({ username }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(postLogout()).then(() => dispatch(clearUsername()));
  };

  return (
    <div className={style.wrapper}>
      <p>{username.username}</p>
      <div className={style.photo} onClick={handleLogout}>
        <img src={username.image_file} className={style.photo_inner} alt="userPhoto" />
        <img src={arrowIcon} className={style.arrow} alt="arrow" />
      </div>
    </div>
  );
}

User.propTypes = {
  username: PropTypes.object,
};

export default User;
