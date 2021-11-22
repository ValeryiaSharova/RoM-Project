import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import peopleReducer from './reducers/peopleReducer';
import questionReducer from './reducers/questionReducer';
import markReducer from './reducers/markReducer';

const reducers = combineReducers({
  people: peopleReducer,
  questions: questionReducer,
  marks: markReducer,
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
