import { createContext, useState } from 'react';

import TypesFilter from '../typesFilter/TypesFilter';
import GenresFilter from '../genresFilter/GenresFilter';
import style from './Filter.module.css';
import {
  setTypeFilter,
  setGenreFilter,
  setSend,
  clearDataFilter,
  setFromYear,
  setToYear,
} from '../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

export const FilterContext = createContext('');
function Filter() {
  const [active, setActive] = useState(false);
  const { genres, types } = useSelector((state) => state.filterSlice);
  const [year, setYear] = useState({
    from: '',
    to: '',
  });

  const dispatch = useDispatch();

  const handleTypeChange = (selectedType) => {
    dispatch(setTypeFilter(selectedType));
    dispatch(setSend(false));
  };

  const handleGenreChange = (selectedGenre) => {
    dispatch(setGenreFilter(selectedGenre));
    dispatch(setSend(false));
  };

  const handleClickSend = () => {
    if (genres.length > 0 || types.length > 0) {
      dispatch(setSend(true));
    } else {
      dispatch(setSend(false));
    }
    dispatch(setToYear(year.to));
    dispatch(setFromYear(year.from));
  };

  const handleClickClear = () => {
    dispatch(clearDataFilter());
  };

  return (
    <aside className={style.wrapper}>
      <FilterContext.Provider value={{ active, setActive }}>
        {active ? (
          <GenresFilter handleChange={handleGenreChange} selectedGenres={genres} />
        ) : (
          <TypesFilter
            handleChange={handleTypeChange}
            selectedTypes={types}
            year={year}
            setYear={setYear}
          />
        )}
        <div className={style.buttons}>
          <button onClick={handleClickClear}>Сбросить</button>
          <button onClick={handleClickSend}>Применить</button>
        </div>
      </FilterContext.Provider>
    </aside>
  );
}

export default Filter;
