import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { FilterContext } from '../filter/Filter';
import style from './GenresFilter.module.css';
import arrowLeft from '../../assets/icons/arrowLeft.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getGenre } from '../../redux/slices/GenreSlice';
import { clearData } from '../../redux/slices/GenreSlice';

function GenresFilter({ handleChange, selectedGenres }) {
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

  const handleGenresChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      handleChange([...selectedGenres, name]);
    } else {
      handleChange(selectedGenres?.filter((type) => type !== name));
    }
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
            <input
              type="checkbox"
              name={genre.title}
              onChange={handleGenresChange}
              checked={selectedGenres.includes(genre.title)}
            />
            <span>{genre.title}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

GenresFilter.propTypes = {
  handleChange: PropTypes.func,
  selectedGenres: PropTypes.array,
};

export default GenresFilter;
