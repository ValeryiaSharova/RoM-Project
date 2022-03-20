import { createAction } from 'redux-actions';
import axios from '../axiosInstanse';

export const requestQuestions = createAction('QUESTIONS/REQUEST_QUESTIONS');
export const receiveQuestions = createAction('QUESTIONS/RECEIVE_QUESTIONS', questions => questions);
export const failLoadQuestions = createAction('QUESTIONS/FAIL_LOAD_QUESTIONS', error => error);

export const fetchQuestions = subject => async dispatch => {
  dispatch(requestQuestions());
  const OAIP = 'https://api.jsonbin.io/b/61994fb462ed886f91521e9e/latest';
  const IPO = 'https://api.jsonbin.io/b/623767897caf5d67836db1fb/latest';
  try {
    if (subject === 'ИПО') {
      const { data: questions } = await axios.get(IPO);
      dispatch(receiveQuestions(questions));
    } else {
      const { data: questions } = await axios.get(OAIP);
      dispatch(receiveQuestions(questions));
    }
  } catch (error) {
    dispatch(failLoadQuestions(error));
  }
};
