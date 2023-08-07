import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getInfoManga } from '../../redux/slices/InfoMangaSlice';
import { getGenre } from '../../redux/slices/GenreSlice';
import { getComment } from '../../redux/slices/GetCommentSlice';
import { getUsername } from '../../helpers/token';
import { setOpen, setVisible } from '../../redux/slices/openModalSlice';

import LoginModal from '../../components/loginModal/LoginModal';
import CommentModal from '../../components/commentModal/CommentModal';
import Pagination from '../../components/pagination/Pagination';

import style from './InfoPage.module.css';
import arrow from '../../assets/icons/arrowBack.svg';

function InfoPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { open } = useSelector((state) => state.openModalSlice);
  const { data } = useSelector((state) => state.InfoMangaSlice);
  const { data: genre } = useSelector((state) => state.GenreSlice);
  const { data: comments, success: addCommentSuccess } = useSelector(
    (state) => state.GetCommentSlice,
  );

  const [page, setPage] = useState({
    start: 0,
    end: 3,
  });

  const [openModal, setOpenModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(getInfoManga({ id }));
    dispatch(getGenre());
    dispatch(getComment(id));
  }, [dispatch, id, addCommentSuccess]);

  const handleOpenModal = () => {
    const user = getUsername() || '{}';
    const username = JSON.parse(user);
    if (username.username) {
      setOpenModal(true);
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
      dispatch(setOpen(false));
    } else {
      dispatch(setVisible(true));
      dispatch(setOpen(true));
    }
  };

  const handleChangePaginate = (event, newPage) => {
    const itemsPerPage = 3;
    const newStart = (newPage - 1) * itemsPerPage;
    const newEnd = newStart + itemsPerPage;
    setPage({ start: newStart, end: newEnd });
  };

  const genres = genre?.filter((genreItem) => data.genre?.includes(genreItem.id));
  const count = Math.ceil(comments?.length / 3);

  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        {open && <LoginModal />}
        {openModal && (
          <CommentModal
            id={data.id}
            setOpenModal={setOpenModal}
            visible={isVisible}
            setVisible={setIsVisible}
          />
        )}
        <Link to={'/'}>
          <img src={arrow} alt="arrow" /> Назад
        </Link>
        <section className={style.about}>
          <div className={style.images}>
            <img src={data.image} alt="photo" />
          </div>
          <div className={style.title}>
            <h2>{data.ru_name}</h2>
            <h4>Информация:</h4>
            <p>
              Тип: <span>{data.type}</span>
            </p>
            <p>
              Год: <span>{data.issue_year}</span>
            </p>
            <p>
              Жанр:
              <span>
                {genres.map((genre, index) => (
                  <React.Fragment key={genre.id}>
                    {' '}
                    {genre.title}
                    {index !== genres.length - 1 && ', '}
                  </React.Fragment>
                ))}
              </span>
            </p>
          </div>
        </section>
        <hr />
        <section className={style.descriptions}>
          <h3>Синопсис</h3>
          <p>{data.description}</p>
        </section>
        <hr />
        <section className={style.comment}>
          <div className={style.comment_title}>
            <h3>Топ комментарий</h3>
            <a onClick={handleOpenModal}>добавить комментарий</a>
          </div>
          {comments?.slice(page.start, page.end).map((comment) => (
            <div key={comment.id} className={style.comment_card}>
              <div className={style.img}>
                <img src={comment.user.image_file} alt="photo" />
              </div>
              <hr />
              <div className={style.comment_text}>
                <h4>
                  {comment.user.username}, {comment.user.nickname}
                </h4>
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
        </section>
        <Pagination count={count} handleChange={handleChangePaginate} />
      </div>
    </main>
  );
}

export default InfoPage;
