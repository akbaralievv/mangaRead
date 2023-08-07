import { Pagination } from '@mui/material';
import PropTypes from 'prop-types';

function BasicPagination({ count, handleChange }) {
  BasicPagination.propTypes = {
    count: PropTypes.number,
    handleChange: PropTypes.func,
  };

  return <Pagination count={count || 1} color="primary" onChange={handleChange} />;
}

export default BasicPagination;
