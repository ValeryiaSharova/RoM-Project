import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './sharedComponents/Header/Header';
import Footer from './sharedComponents/Footer/Footer';
import Index from './pages/IndexPage/IndexPageContainer';
import Answers from './pages/AnswersPage/AnswersPageContainer';
import Marks from './pages/MarksPage/MarksPageContainer';
import store from './redux/store';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/answers" exact component={Answers} />
        <Route path="/marks" exact component={Marks} />
      </Switch>
      <Footer />
    </BrowserRouter>
  </Provider>
);
export default App;
