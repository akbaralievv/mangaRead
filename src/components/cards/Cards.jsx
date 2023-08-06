import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './Cards.module.css';
import { getManga } from '../../redux/slices/MangaSlice';
import { clearData } from '../../redux/slices/MangaSlice';
import { NavLink } from 'react-router-dom';

function Cards() {
  const { data } = useSelector((state) => state.MangaSlice);
  const { page } = useSelector((state) => state.currentPageSlice);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getManga({ page }));
    return () => {
      dispatch(clearData());
    };
  }, [dispatch, page]);

  return (
    <article className={style.wrapper}>
      {data.results?.map((card) => (
        <NavLink to={`/${card.id}`} key={card.id}>
          <div
            className={style.card}
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 5.73%, rgba(0, 0, 0, 0.50) 66.15%), url(${card.image})`,
            }}>
            <span>Год: {card.issue_year}</span>
            <p>{card.ru_name}</p>
          </div>
        </NavLink>
      ))}
    </article>
  );
}

export default Cards;
