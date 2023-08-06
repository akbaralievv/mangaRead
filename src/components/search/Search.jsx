import { useState } from 'react';

import style from './Search.module.css';
import search from '../../assets/icons/search.svg';

function Search() {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div className={`${style.wrapper} ${isFocused ? style.focused : ''}`}>
      {isFocused ? '' : <img src={search} alt="search" />}
      <input type="text" placeholder="Placeholder" onFocus={handleFocus} onBlur={handleBlur} />
    </div>
  );
}

export default Search;
