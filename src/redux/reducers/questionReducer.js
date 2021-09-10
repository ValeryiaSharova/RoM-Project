import { handleActions } from 'redux-actions';
import { requestQuestions, receiveQuestions, failLoadQuestions } from '../actions/questionAction';

const initialState = {
  loadedData: false,
  loading: false,
  error: null,
  questionsData: [],
};

const reducer = handleActions(
  {
    [requestQuestions]: state => ({ ...state, loading: true }),
    [receiveQuestions]: (state, { payload: questions }) => ({
      ...state,
      questionsData: questions,
      loading: false,
      loadedData: true,
    }),
    [failLoadQuestions]: (state, { payload: error }) => ({
      ...state,
      loading: false,
      error,
    }),
  },
  initialState
);

export default reducer;
