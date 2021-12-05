import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import peopleReducer from './reducers/peopleReducer';
import questionReducer from './reducers/questionReducer';

const reducers = combineReducers({
  people: peopleReducer,
  questions: questionReducer,
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
