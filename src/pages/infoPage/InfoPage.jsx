import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getInfoManga } from '../../redux/slices/InfoMangaSlice';
import React from 'react';

import style from './InfoPage.module.css';
import { getGenre } from '../../redux/slices/GenreSlice';
import arrow from '../../assets/icons/arrowBack.svg';

function InfoPage() {
  const { data } = useSelector((state) => state.InfoMangaSlice);
  const { data: genre } = useSelector((state) => state.GenreSlice);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfoManga({ id }));
    dispatch(getGenre());
  }, [dispatch, id]);

  const genres = genre?.filter((genreItem) => data.genre?.includes(genreItem.id));
  return (
    <main className={style.wrapper}>
      <div className={style.container}>
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
            <a href="">добавить комментарий</a>
          </div>
        </section>
      </div>
    </main>
  );
}

export default InfoPage;
