import { createAction } from 'redux-actions';
import axios from '../axiosInstanse';

export const requestQuestions = createAction('QUESTIONS/REQUEST_QUESTIONS');
export const receiveQuestions = createAction('QUESTIONS/RECEIVE_QUESTIONS', questions => questions);
export const failLoadQuestions = createAction('QUESTIONS/FAIL_LOAD_QUESTIONS', error => error);

export const fetchQuestions = () => async dispatch => {
  dispatch(requestQuestions());
  try {
    const { data: questions } = await axios.get('/questions.json');
    dispatch(receiveQuestions(questions));
  } catch (error) {
    dispatch(failLoadQuestions(error));
  }
};
