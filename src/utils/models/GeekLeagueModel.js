import PropTypes from 'prop-types';

import SeasonModel from './SeasonModel';
import UserModel from './UserModel';

export default PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  creator: PropTypes.oneOfType([UserModel, PropTypes.string]),
  geeks: PropTypes.arrayOf(PropTypes.oneOfType([UserModel, PropTypes.string])),
  season: PropTypes.oneOfType([SeasonModel, PropTypes.string]),
});
