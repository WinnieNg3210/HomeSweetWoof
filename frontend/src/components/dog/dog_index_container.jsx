import { connect } from 'react-redux';
import { fetchDogs } from '../../actions/dog_actions';
import DogIndex from './dog_index';

const mSTP = (state) => {
    debugger
  return {
    dogs: Object.values(state.entities.dogs)
  };
};

const mDTP = dispatch => {
  return {
    fetchDogs: () => dispatch(fetchDogs())
  };
};

export default connect(mSTP, mDTP)(DogIndex);