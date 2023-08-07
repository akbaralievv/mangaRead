import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { postComment } from '../../redux/slices/PostCommentSlice';
import { getUsername } from '../../helpers/token';

import styles from './CommentModal.module.css';

function CommentModal({ id, setOpenModal, setVisible, visible }) {
  const dispatch = useDispatch();
  const user = getUsername();
  const username = JSON.parse(user) || {};
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postComment({ id, value }));
  };

  const modalRef = useRef();

  const closeModal = () => {
    document.body.style.overflow = '';
    if (setOpenModal) setOpenModal(false);
    setVisible(false);
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
          <div className={styles.title}>
            <div>
              <img src={username.image_file} alt="" />
            </div>
            <h3>{username.username}</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Добавьте комментарий" onChange={handleChange} />
            <button type="submit">Добавить</button>
          </form>
        </div>
      </div>
    </div>
  );
}

CommentModal.propTypes = {
  id: PropTypes.number,
  setOpenModal: PropTypes.func,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};

export default CommentModal;
