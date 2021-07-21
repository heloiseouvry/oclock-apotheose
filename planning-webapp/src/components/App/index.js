import React from 'react';
import { BrowserRouter, Switch , Route } from 'react-router-dom';

import './styles.scss';

import Header from '../Header';
import LoginApp from '../Login/loginApp'
import ContactForm from '../ContactForm'
import Homepage from '../Homepage';
import MyCalendar from '../Calendar';
import Footer from '../Footer';
import MyCalendar from '../Calendar';

const App = () => (
  //We use the router method to switch from a component to another
  <BrowserRouter >
    <div className="app">
    {/* Here we show the Homepage */}
      <Switch>
        <Route exact path="/"> 
          <Homepage />
        </Route>

        {/* Here we show the Login page */}
        <Route path="/login"> 
          <Header />
          <LoginApp />
        </Route>

      <Route path="/Contact"> 
          <Header />
          <ContactForm />
        </Route>
      </Switch> 

          <Footer />
    </div>
  </BrowserRouter>
);

export default App;
