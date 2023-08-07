import style from './CommentModal.module.css';
import { getUsername } from '../../helpers/token';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postComment } from '../../redux/slices/PostCommentSlice';
import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function CommentModal({ id, setOpenModal }) {
  const user = getUsername() || '';
  const username = JSON.parse(user);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const hanldeChange = (e) => {
    setValue(e.target.value);
  };
  const hanldeSubmit = (e) => {
    e.preventDefault();
    dispatch(postComment({ id, value }));
  };

  CommentModal.propTypes = {
    id: PropTypes.number,
    setOpenModal: PropTypes.func,
  };

  const modalRef = useRef();

  const closeModal = () => {
    document.body.style.overflow = '';
    setOpenModal && setOpenModal(false);
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
    <div className={style.wrapper}>
      <div className={style.inner} ref={modalRef}>
        <div className={style.content}>
          <div className={style.title}>
            <div>
              <img src={username.image_file} alt="" />
            </div>
            <h3>{username.username}</h3>
          </div>
          <form onSubmit={hanldeSubmit}>
            <input type="text" placeholder="Добавьте комментарий" onChange={hanldeChange} />
            <button type="submit">Добавить</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
