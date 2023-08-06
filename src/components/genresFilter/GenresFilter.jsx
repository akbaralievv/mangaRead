import { useContext, useEffect } from 'react';

import { FilterContext } from '../filter/Filter';
import style from './GenresFilter.module.css';
import arrowLeft from '../../assets/icons/arrowLeft.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getGenre } from '../../redux/slices/GenreSlice';
import { clearData } from '../../redux/slices/GenreSlice';

function GenresFilter() {
  const { setActive } = useContext(FilterContext);
  const { data } = useSelector((state) => state.GenreSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenre());
    return () => {
      dispatch(clearData());
    };
  }, [dispatch]);

  const handleClick = () => {
    setActive(false);
  };

  return (
    <div className={style.content}>
      <p onClick={handleClick} className={style.title}>
        <img src={arrowLeft} alt="arrow" />
        <span>Назад</span>
      </p>
      <div className={style.genres}>
        <h3>Жанры</h3>
        {data?.map((genre) => (
          <label key={genre.id}>
            <input type="checkbox" />
            <span>{genre.title}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default GenresFilter;
