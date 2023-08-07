import PropTypes from 'prop-types';
import { Pagination } from '@mui/material';

function BasicPagination({ count, handleChange }) {
  return <Pagination count={count || 1} color="primary" onChange={handleChange} />;
}

BasicPagination.propTypes = {
  count: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default BasicPagination;
