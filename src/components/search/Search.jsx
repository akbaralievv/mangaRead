import { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import style from './Search.module.css';
import search from '../../assets/icons/search.svg';
import { setSearchValue } from '../../redux/slices/setSearchSlice';
import { useDispatch } from 'react-redux';

function Search() {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000),
    [],
  );

  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);
    updateSearchValue(value);
  };

  return (
    <div className={`${style.wrapper} ${isFocused ? style.focused : ''}`}>
      {isFocused ? '' : <img src={search} alt="search" />}
      <input
        type="text"
        placeholder="Placeholder"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}

export default Search;
