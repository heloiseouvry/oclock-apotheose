// == Import npm
import React from 'react';

import './styles.scss';

//import MyCalendar from '../Calendar';
//import MyComponent from '../Sidebar';
//import LoginForm from '../Login'
import Homepage from '../Homepage';
import Footer from '../Footer';
import MyCalendar from '../Calendar';


// == Composant
const App = () => (
  <div className="app">
    <Homepage />
    <MyCalendar />
    <Footer />
  </div>
);

// == Export
export default App;
