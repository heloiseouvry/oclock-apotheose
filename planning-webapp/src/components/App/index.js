// == Import npm
import React from 'react';
import { BrowserRouter, Switch , Route } from 'react-router-dom';


import './styles.scss';

import Header from '../Header';
import LoginForm from '../Login'
import LoginApp from '../Login/loginApp'
import Homepage from '../Homepage';
import MyComponent from '../Sidebar';
import MyCalendar from '../Calendar';
import Footer from '../Footer';




// == Composant
const App = () => (
  <BrowserRouter >
    <div className="app">
      <Switch>
        <Route exact path="/"> 
          <Homepage />
        </Route>

        <Route path="/login"> 
          <Header />
          <LoginApp />
        </Route>
      </Switch> 

          <Footer />
    </div>
  </BrowserRouter>
);

// == Export
export default App;
