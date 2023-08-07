import { useContext } from 'react';
import PropTypes from 'prop-types';

import style from './TypesFilter.module.css';
import arrowRight from '../../assets/icons/arrowRight.svg';
import { FilterContext } from '../filter/Filter';

function TypesFilter({ handleChange, selectedTypes, year, setYear }) {
  const { setActive } = useContext(FilterContext);

  const handleClick = () => {
    setActive(true);
  };

  const handleTypeChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      handleChange([...selectedTypes, name]);
    } else {
      handleChange(selectedTypes?.filter((type) => type !== name) || []);
    }
  };

  const handleChangeToYear = (e) => {
    setYear((prev) => ({ ...prev, to: e.target.value }));
  };

  const handleChangeFromYear = (e) => {
    setYear((prev) => ({ ...prev, from: e.target.value }));
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
        <label>
          <input
            type="checkbox"
            name="Манга"
            onChange={handleTypeChange}
            checked={selectedTypes.includes('Манга')}
          />
          <span>Манга</span>
        </label>
        <label>
          <input
            type="checkbox"
            name="Манхва"
            checked={selectedTypes.includes('Манхва')}
            onChange={handleTypeChange}
          />
          <span>Манхва</span>
        </label>
        <label>
          <input
            type="checkbox"
            name="Комиксы"
            checked={selectedTypes.includes('Комиксы')}
            onChange={handleTypeChange}
          />
          <span>Комиксы</span>
        </label>
        <label>
          <input
            type="checkbox"
            name="Маньхуа"
            checked={selectedTypes.includes('Маньхуа')}
            onChange={handleTypeChange}
          />
          <span>Маньхуа</span>
        </label>
      </div>
      <div className={style.years}>
        <input type="text" placeholder="От 0" onChange={handleChangeFromYear} value={year.from} />
        <span>-</span>
        <input type="text" placeholder="До 2022" onChange={handleChangeToYear} value={year.to} />
      </div>
    </div>
  );
}

TypesFilter.propTypes = {
  handleChange: PropTypes.func,
  selectedTypes: PropTypes.array,
  year: PropTypes.object,
  setYear: PropTypes.func,
};

export default TypesFilter;
