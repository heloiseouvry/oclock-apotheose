import React, {useState} from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./styles.scss";

import Header from '../Header';
import ConnectedHeader from '../ConnectedHeader';
import LoginApp from '../Login/loginApp'
import ContactForm from '../ContactForm'
import Homepage from '../Homepage';
import MyCalendar from '../Calendar';
import AddTech from '../AddTech';
import EventForm from '../EventForm'
import PhaseForm from '../PhaseForm'
import Footer from '../Footer';
import ConnectedFooter from '../ConnectedFooter';
import PageNotFound from '../PageNotFound';

const isLogged = !!localStorage.getItem("token");

const App = () => {

  const [role, setRole] = useState(!!localStorage.getItem("role"));

  return (
  //We use the router method to switch from a component to another
  <BrowserRouter>
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Homepage />
          {/* <Footer /> */}
        </Route>

        <Route path="/login">
          <Header />
          <Login setRole={setRole} />
          {/* <Footer /> */}
        </Route>

        <Route path="/contact">
          <Header />
          <ContactForm />
          {/* <Footer /> */}
        </Route>

        <ProtectedRoute path="/calendar">
          <ConnectedHeader role={role} />
          <MyCalendar />
          {/* <ConnectedFooter /> */}
        </ProtectedRoute>

        <Route path="/EventForm"> 
          <ConnectedHeader />
          <EventForm /> 
          {/* <ConnectedFooter /> */}
        </Route>

        <Route path="/PhaseForm"> 
          <ConnectedHeader />
          <PhaseForm /> 
          {/* <ConnectedFooter /> */}
        </Route>
        
        <ProtectedRoute path="/addtech">
          <ConnectedHeader role={role} />
          <AddTech />
        {/* <ConnectedFooter /> */}
        </ProtectedRoute>

        <Route path="*">
          <Header />
          <PageNotFound />
          {/* <Footer /> */}
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
)};

export default App;
