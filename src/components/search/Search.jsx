import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import style from './Search.module.css';
import { setSearchValue } from '../../redux/slices/setSearchSlice';

import searchIcon from '../../assets/icons/search.svg';

function Search() {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const updateSearchValue = useCallback(
    debounce((str) => dispatch(setSearchValue(str)), 1000),
    [dispatch],
  );

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    updateSearchValue(newValue);
  };

  return (
    <div className={`${style.wrapper} ${isFocused && style.focused}`}>
      {!isFocused && <img src={searchIcon} alt="search" />}
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
