import { Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentPage } from '../../redux/slices/currentPageSlice';

function BasicPagination() {
  const { data } = useSelector((state) => state.MangaSlice);
  const dispatch = useDispatch();
  const handleChange = (event, page) => {
    dispatch(setCurrentPage(page));
  };

  const count = Math.ceil(data.count / 12);

  return <Pagination count={count || 1} color="primary" onChange={handleChange} />;
}

export default BasicPagination;
