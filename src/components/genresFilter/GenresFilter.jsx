import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { FilterContext } from '../filter/Filter';
import { getGenre, clearData } from '../../redux/slices/GenreSlice';

import style from './GenresFilter.module.css';
import arrowLeft from '../../assets/icons/arrowLeft.svg';

function GenresFilter({ handleChange, selectedGenres }) {
  const { setActive } = useContext(FilterContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenre());
    return () => {
      dispatch(clearData());
    };
  }, [dispatch]);

  const handleGenresChange = (event) => {
    const { name, checked } = event.target;
    const updatedGenres = checked
      ? [...selectedGenres, name]
      : selectedGenres.filter((type) => type !== name);
    handleChange(updatedGenres);
  };

  const { data } = useSelector((state) => state.GenreSlice);

  return (
    <div className={style.content}>
      <p onClick={() => setActive(false)} className={style.title}>
        <img src={arrowLeft} alt="arrow" />
        <span>Назад</span>
      </p>
      <div className={style.genres}>
        <h3>Жанры</h3>
        {data?.map((genre) => {
          const isChecked = selectedGenres.includes(genre.title);
          return (
            <label key={genre.id}>
              <input
                type="checkbox"
                name={genre.title}
                onChange={handleGenresChange}
                checked={isChecked}
              />
              <span>{genre.title}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

GenresFilter.propTypes = {
  handleChange: PropTypes.func,
  selectedGenres: PropTypes.array,
};

export default GenresFilter;
