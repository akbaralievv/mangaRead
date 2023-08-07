import { useContext } from 'react';
import PropTypes from 'prop-types';

import { FilterContext } from '../filter/Filter';

import arrowRight from '../../assets/icons/arrowRight.svg';
import style from './TypesFilter.module.css';

function TypesFilter({ handleChange, selectedTypes, year, setYear }) {
  const { setActive } = useContext(FilterContext);

  const handleClick = () => {
    setActive(true);
  };

  const handleTypeChange = (event) => {
    const { name, checked } = event.target;
    const updatedTypes = checked
      ? [...selectedTypes, name]
      : selectedTypes.filter((type) => type !== name);
    handleChange(updatedTypes);
  };

  const handleChangeYear = (key, value) => {
    setYear((prev) => ({ ...prev, [key]: value }));
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
        {['Манга', 'Манхва', 'Комиксы', 'Маньхуа'].map((type) => (
          <label key={type}>
            <input
              type="checkbox"
              name={type}
              onChange={handleTypeChange}
              checked={selectedTypes.includes(type)}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      <div className={style.years}>
        {['from', 'to'].map((key) => (
          <input
            key={key}
            type="text"
            placeholder={key === 'from' ? 'От 0' : 'До 2022'}
            onChange={(e) => handleChangeYear(key, e.target.value)}
            value={year[key]}
          />
        ))}
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
