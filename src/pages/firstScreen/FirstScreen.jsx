import Cards from '../../components/cards/Cards';
import Filter from '../../components/filter/Filter';
// import LoginModal from '../../components/loginModal/LoginModal';
import Pagination from '../../components/pagination/Pagination';
import style from './FirstScreen.module.css';

function FirstScreen() {
  return (
    <>
      <main className={style.wrapper}>
        <div className={style.container}>
          <div className={style.inner}>
            {/* <LoginModal /> */}
            <div className={style.content}>
              <Filter />
              <Cards />
            </div>
            <Pagination />
          </div>
        </div>
      </main>
    </>
  );
}

export default FirstScreen;
