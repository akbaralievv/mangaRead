import { createContext, useState } from 'react';

import TypesFilter from '../typesFilter/TypesFilter';
import GenresFilter from '../genresFilter/GenresFilter';
import style from './Filter.module.css';

export const FilterContext = createContext('');
function Filter() {
  const [active, setActive] = useState(false);

  return (
    <aside className={style.wrapper}>
      <FilterContext.Provider value={{ active, setActive }}>
        {active ? <GenresFilter /> : <TypesFilter />}
        <div className={style.buttons}>
          <button>Сбросить</button>
          <button>Применить</button>
        </div>
      </FilterContext.Provider>
    </aside>
  );
}

export default Filter;
