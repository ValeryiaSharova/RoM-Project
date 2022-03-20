import { handleActions } from 'redux-actions';
import { changeSubject, changeUserStatus } from '../actions/userAction';

const store = require('store');

const initialState = {
  isAdmin: store.get('isAdmin') === undefined ? false : store.get('isAdmin'),
  subject: store.get('subject') === undefined ? 'ОАИП' : store.get('subject'),
};

const reducer = handleActions(
  {
    [changeUserStatus]: (state, { payload: status }) => ({ ...state, isAdmin: status }),
    [changeSubject]: (state, { payload: subject }) => ({ ...state, subject }),
  },
  initialState
);

export default reducer;
