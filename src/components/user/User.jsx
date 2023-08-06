import style from './User.module.css';
import user from '../../assets/images/user.png';
import arrow from '../../assets/icons/arrow_drop_down.svg';

function User() {
  return (
    <div className={style.wrapper}>
      <p>Alex Miller</p>
      <div className={style.photo}>
        <img src={user} className={style.photo_inner} alt="userPhoto" />
        <img src={arrow} className={style.arrow} alt="arrow" />
      </div>
    </div>
  );
}

export default User;
