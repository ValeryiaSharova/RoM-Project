import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './sharedComponents/Header/Header';
import Footer from './sharedComponents/Footer/Footer';
import Index from './pages/IndexPage/IndexPage';
import Answers from './pages/AnswersPage/AnswersPage';

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" exact component={Index} />
      <Route path="/answers" exact component={Answers} />
    </Switch>
    <Footer />
  </BrowserRouter>
);
export default App;
