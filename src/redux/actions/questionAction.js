import { createAction } from 'redux-actions';
import axios from '../axiosInstanse';

export const requestQuestions = createAction('QUESTIONS/REQUEST_QUESTIONS');
export const receiveQuestions = createAction('QUESTIONS/RECEIVE_QUESTIONS', questions => questions);
export const failLoadQuestions = createAction('QUESTIONS/FAIL_LOAD_QUESTIONS', error => error);

export const fetchQuestions = subject => async dispatch => {
  dispatch(requestQuestions());
  const OAIP = `${process.env.REACT_APP_QUESTIONS_OAIP}/latest`;
  const IPO = `${process.env.REACT_APP_QUESTIONS_IPO}/latest`;
  try {
    if (subject === 'ИПО') {
      const { data: questions } = await axios.get(IPO, {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': `$2b$10$DmD${process.env.REACT_APP_SECRET_KEY}`,
          'X-Bin-Meta': false,
        },
      });
      dispatch(receiveQuestions(questions));
    } else {
      const { data: questions } = await axios.get(OAIP, {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': `$2b$10$DmD${process.env.REACT_APP_SECRET_KEY}`,
          'X-Bin-Meta': false,
        },
      });
      dispatch(receiveQuestions(questions));
    }
  } catch (error) {
    dispatch(failLoadQuestions(error));
  }
};
