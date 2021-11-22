import { handleActions } from 'redux-actions';
import { requestPeople, receivePeople, failLoadPeople } from '../actions/peopleAction';

const initialState = {
  loadedData: false,
  loading: false,
  error: null,
  peopleData: [],
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
  },
  initialState
);

export default reducer;
