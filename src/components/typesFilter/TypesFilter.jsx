import { useContext } from 'react';

import style from './TypesFilter.module.css';
import arrowRight from '../../assets/icons/arrowRight.svg';
import { FilterContext } from '../filter/Filter';

function TypesFilter() {
  const { setActive } = useContext(FilterContext);
  const handleClick = () => {
    setActive(true);
  };

  const handleChange = (e) => {
    console.log(e);
  };

  return (
    <div className={style.content}>
      <div className={style.title}>
        <h3>Жанры</h3>
        <p onClick={handleClick}>
          <span>все</span>
          <img src={arrowRight} alt="arrow" />
        </p>
      </div>
      <div className={style.types}>
        <h3>Тип</h3>
        <label onChange={handleChange}>
          <input type="checkbox" name="manga" />
          <span>Манга</span>
        </label>
        <label>
          <input type="checkbox" name="manhwa" />
          <span>Манхва</span>
        </label>
        <label>
          <input type="checkbox" name="comics" />
          <span>Комиксы</span>
        </label>
        <label>
          <input type="checkbox" name="manhua" />
          <span>Маньхуа</span>
        </label>
      </div>
      <div className={style.years}>
        <input type="text" placeholder="От 0" />
        <span>-</span>
        <input type="text" placeholder="До 2022" />
      </div>
    </div>
  );
}

export default TypesFilter;
