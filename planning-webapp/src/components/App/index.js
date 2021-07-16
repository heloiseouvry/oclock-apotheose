// == Import npm
import React from 'react';
import MyCalendar from '../Calendar';
import MyComponent from '../Sidebar';

// == Import

import './styles.css';

// == Composant
const App = () => (
  <div className="app">
    <MyComponent />
    <MyCalendar />
  </div>
);

// == Export
export default App;
