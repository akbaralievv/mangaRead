import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getInfoManga } from '../../redux/slices/InfoMangaSlice';
import React from 'react';

import style from './InfoPage.module.css';
import { getGenre } from '../../redux/slices/GenreSlice';
import arrow from '../../assets/icons/arrowBack.svg';
import { getComment } from '../../redux/slices/GetCommentSLice';
import CommentModal from '../../components/commentModal/CommentModal';
import Pagination from '../../components/pagination/Pagination';
import LoginModal from '../../components/loginModal/LoginModal';
import { getUsername } from '../../helpers/token';
import { setOpen } from '../../redux/slices/openModalSlice';

function InfoPage() {
  const { open } = useSelector((state) => state.openModalSlice);
  const { data } = useSelector((state) => state.InfoMangaSlice);
  const { data: genre } = useSelector((state) => state.GenreSlice);
  const { data: comments } = useSelector((state) => state.GetCommentSLice);
  const { data: addComment } = useSelector((state) => state.PostCommentSlice);
  const [page, setPage] = useState({
    start: 0,
    end: 3,
  });
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfoManga({ id }));
    dispatch(getGenre());
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getComment(id));
  }, [dispatch, addComment, id]);

  const handleOpenModal = () => {
    const user = getUsername() || '{}';
    const username = JSON.parse(user);
    if (username.username) {
      setOpenModal(true);
      document.body.style.overflow = 'hidden';
      dispatch(setOpen(false));
    } else {
      dispatch(setOpen(true));
    }
  };

  const handleChangePaginate = (event, page) => {
    const itemsPerPage = 3;
    const newStart = (page - 1) * itemsPerPage;
    const newEnd = newStart + itemsPerPage;

    setPage({ start: newStart, end: newEnd });
  };

  const genres = genre?.filter((genreItem) => data.genre?.includes(genreItem.id));
  const count = Math.ceil(comments?.length / 3);

  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        {open && <LoginModal />}
        {openModal && <CommentModal id={data.id} setOpenModal={setOpenModal} />}
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
              <span key={genre.id}>
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
