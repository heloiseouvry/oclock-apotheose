import React from 'react';
import { BrowserRouter, Switch , Route } from 'react-router-dom';

import './styles.scss';

import Header from '../Header';
import LoginApp from '../Login/loginApp'
import ContactForm from '../ContactForm'
import Homepage from '../Homepage';
import MyCalendar from '../Calendar';
import Footer from '../Footer';
import PageNotFound from '../PageNotFound';

const App = () => (
  //We use the router method to switch from a component to another
  <BrowserRouter >
    <div className="app">
    {/* Here we show the Homepage */}
      <Switch>
        <Route exact path="/"> 
          <Homepage />
          <Footer />
        </Route>

        {/* Here we show the Login page */}
        <Route path="/login"> 
          <Header />
          <LoginApp />
          <Footer />
        </Route>

      <Route path="/Contact"> 
          <Header />
          <ContactForm />
          <Footer />
        </Route>
        
      <Route path="/Calendar"> 
          <Header />
          <MyCalendar /> 
          <Footer />
        </Route>

        <Route path='*'>
          <Header />
          <PageNotFound />
          <Footer />
        </Route>
      

      </Switch> 
          
    </div>
  </BrowserRouter>
);

export default App;
