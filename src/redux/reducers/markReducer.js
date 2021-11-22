import { handleActions } from 'redux-actions';
import { receiveCalcMarks, deleteMarks, receiveResetMarks } from '../actions/markAction';

const initialState = {
  loading: false,
  error: null,
  marks: null,
};

const reducer = handleActions(
  {
    [receiveCalcMarks]: (state, { payload: marks }) => ({
      ...state,
      marks,
    }),
    [deleteMarks]: state => ({ ...state, marks: null }),
    [receiveResetMarks]: state => ({ ...state, marks: null }),
  },
  initialState
);

export default reducer;
