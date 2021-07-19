// == Import npm
import React from 'react';


import './styles.scss';

import Header from '../Header';
import LoginForm from '../Login'
//import Homepage from '../Homepage';
//import MyComponent from '../Sidebar';
//import MyCalendar from '../Calendar';
import Footer from '../Footer';




// == Composant
const App = () => (
  <div className="app">
    <Header />
    <LoginForm/>
    <Footer />
  </div>
);

// == Export
export default App;
