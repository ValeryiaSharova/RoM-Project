import { handleActions } from 'redux-actions';
import {
  requestPeople,
  receivePeople,
  failLoadPeople,
  requestGetSaveDataAnswer,
  receiveGetSaveDataAnswer,
  requestStartAnswerData,
  receiveStartAnswerData,
  failStartAnswerData,
  receiveCalcMarks,
  deleteMarks,
  receiveResetMarks,
  receiveSaveDataAnswer,
  failSaveDataAnswer,
  receiveCheckAnswer,
} from '../actions/peopleAction';

const initialState = {
  loading: false,
  error: null,
  peopleData: null,
  loadingGetSaveDataAnswer: false,
  loadingStartAnswerData: false,
  errorStartAnswerData: null,
  marks: null,
  answerData: null,
  isSaveDataAnswer: false,
  errorSaveDataAnswer: null,
};

const reducer = handleActions(
  {
    [requestPeople]: state => ({ ...state, loading: true }),
    [receivePeople]: (state, { payload: people }) => ({
      ...state,
      peopleData: people,
      loading: false,
    }),
    [failLoadPeople]: (state, { payload: error }) => ({
      ...state,
      loading: false,
      error,
    }),
    [requestStartAnswerData]: state => ({ ...state, loadingStartAnswerData: true }),
    [receiveStartAnswerData]: (state, { payload: answerData }) => ({
      ...state,
      answerData,
      loadingStartAnswerData: false,
    }),
    [failStartAnswerData]: (state, { payload: error }) => ({
      ...state,
      errorStartAnswerData: error,
    }),
    [receiveCalcMarks]: (state, { payload: marks }) => ({
      ...state,
      marks,
    }),
    [deleteMarks]: state => ({ ...state, marks: null }),
    [receiveResetMarks]: (state, { payload: answerData }) => ({
      ...state,
      marks: null,
      answerData,
      peopleData: null,
    }),
    [receiveSaveDataAnswer]: state => ({ ...state, isSaveDataAnswer: true }),
    [failSaveDataAnswer]: (state, { payload: error }) => ({ ...state, errorSaveDataAnswer: error }),
    [requestGetSaveDataAnswer]: state => ({ ...state, loadingGetSaveDataAnswer: true }),
    [receiveGetSaveDataAnswer]: (state, { payload: answerData }) => ({
      ...state,
      answerData,
      loadingGetSaveDataAnswer: false,
      peopleData: null,
    }),
    [receiveCheckAnswer]: (state, { payload: answerData }) => ({
      ...state,
      answerData,
    }),
  },
  initialState
);

export default reducer;
