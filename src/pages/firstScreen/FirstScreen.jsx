import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Cards from '../../components/cards/Cards';
import Filter from '../../components/filter/Filter';
import LoginModal from '../../components/loginModal/LoginModal';
import Pagination from '../../components/pagination/Pagination';
import { setCurrentPage } from '../../redux/slices/currentPageSlice';

import style from './FirstScreen.module.css';

function FirstScreen() {
  const { open } = useSelector((state) => state.openModalSlice);
  const { data } = useSelector((state) => state.MangaSlice);
  const dispatch = useDispatch();

  const handleChange = (event, page) => {
    dispatch(setCurrentPage(page));
  };

  const count = Math.ceil(data.count / 12);

  return (
    <>
      <main className={style.wrapper}>
        <div className={style.container}>
          <div className={style.inner}>
            {open && <LoginModal />}
            <div className={style.content}>
              <Filter />
              <Cards />
            </div>
            <Pagination count={count} handleChange={handleChange} />
          </div>
        </div>
      </main>
    </>
  );
}

export default FirstScreen;
