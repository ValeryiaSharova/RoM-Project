import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './sharedComponents/Header/Header';
import Footer from './sharedComponents/Footer/Footer';
import Index from './pages/IndexPage/IndexPage';

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" exact component={Index} />
    </Switch>
    <Footer />
  </BrowserRouter>
);
export default App;
