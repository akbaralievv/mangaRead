import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './Cards.module.css';
import { getManga } from '../../redux/slices/MangaSlice';
import { clearData, setFilteredData } from '../../redux/slices/MangaSlice';
import { NavLink } from 'react-router-dom';

function Cards() {
  const { data } = useSelector((state) => state.MangaSlice);
  const { searchValue } = useSelector((state) => state.setSearchSlice);
  const { page } = useSelector((state) => state.currentPageSlice);
  const { genres, types, send, fromYear, toYear } = useSelector((state) => state.filterSlice);

  const dispatch = useDispatch();
  useEffect(() => {
    if (send) {
      const fetchData = async () => {
        let allResults = [];
        if (genres.length > 0 && types.length > 0) {
          for (const genre of genres) {
            for (const type of types) {
              const response = await dispatch(getManga({ page, searchValue, i: genre, j: type }));
              const result = response.payload.results;
              allResults = [...allResults, ...result];
            }
          }
        } else if (genres.length > 0) {
          for (const genre of genres) {
            const response = await dispatch(getManga({ page, searchValue, i: genre }));
            const result = response.payload.results;
            allResults = [...allResults, ...result];
          }
        } else if (types.length > 0) {
          for (const type of types) {
            const response = await dispatch(getManga({ page, searchValue, j: type }));
            const result = response.payload.results;
            allResults = [...allResults, ...result];
          }
        }
        dispatch(setFilteredData(allResults));
      };
      fetchData();
    } else {
      dispatch(getManga({ page, searchValue }));
    }
    return () => {
      dispatch(clearData());
    };
  }, [dispatch, page, searchValue, send]);

  const trueData = data.results ? data.results : data;

  const filterYear = trueData?.filter(
    (manga) => manga.issue_year >= fromYear && manga.issue_year <= toYear,
  );

  const result = filterYear?.length > 0 ? filterYear : trueData;

  return (
    <article className={style.wrapper}>
      {result?.map((card) => (
        <NavLink to={`/${card.id}`} key={card.id}>
          <div
            className={style.card}
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 5.73%, rgba(0, 0, 0, 0.50) 66.15%), url(${card.image})`,
            }}>
            <span>Год: {card.issue_year}</span>
            <p>{card.ru_name}</p>
          </div>
        </NavLink>
      ))}
    </article>
  );
}

export default Cards;
