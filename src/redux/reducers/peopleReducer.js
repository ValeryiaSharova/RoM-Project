import { handleActions } from 'redux-actions';
import {
  requestPeople,
  receivePeople,
  failLoadPeople,
  receiveIndexVictim,
  receiveCalcMarks,
  deleteMarks,
  receiveResetMarks,
} from '../actions/peopleAction';

const initialState = {
  loadedData: false,
  loading: false,
  error: null,
  peopleData: [],
  victimID: null,
  marks: null,
};

const reducer = handleActions(
  {
    [requestPeople]: state => ({ ...state, loading: true }),
    [receivePeople]: (state, { payload: people }) => ({
      ...state,
      peopleData: people,
      loading: false,
      loadedData: true,
    }),
    [failLoadPeople]: (state, { payload: error }) => ({
      ...state,
      loading: false,
      error,
    }),
    [receiveIndexVictim]: (state, { payload: id }) => ({
      ...state,
      victimID: id,
    }),
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
