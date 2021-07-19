// == Import npm
import React from 'react';


//import MyCalendar from '../Calendar';
//import MyComponent from '../Sidebar';

// == Import
import './styles.scss';
import Homepage from '../Homepage';
import Footer from '../Footer';


// == Composant
const App = () => (
  <div className="app">
    <Homepage />
    <Footer />
  </div>
);

// == Export
export default App;
