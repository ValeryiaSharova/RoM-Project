import { createAction } from 'redux-actions';

const store = require('store');

export const changeUserStatus = createAction('USER/CHANGE_USER_STATUS', status => status);
export const changeSubject = createAction('USER/CHANGE_SUBJECT', subject => subject);

export const changeStatus = () => dispatch => {
  const status = store.get('isAdmin');
  store.set('isAdmin', !status);
  dispatch(changeUserStatus(!status));
};

export const swapSubject = () => dispatch => {
  const subject = store.get('subject') === 'ОАИП' ? 'ИПО' : 'ОАИП';
  console.log(subject);
  store.set('subject', subject);
  dispatch(changeSubject(subject));
};
