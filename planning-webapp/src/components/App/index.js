import React, {useState} from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./styles.scss";

import Header from "../Header";
import ConnectedHeader from "../ConnectedHeader";
import Login from "../Login";
import ContactForm from "../ContactForm";
import Homepage from "../Homepage";
import MyCalendar from "../Calendar";
import TechCalendar from "../TechCalendar";
import AddTech from "../AddTech";
import Footer from "../Footer";
import ConnectedFooter from "../ConnectedFooter";
import PageNotFound from "../PageNotFound";
import ProtectedRoute from "../ProtectedRoute";
import EventForm from '../EventForm'
import PhaseForm from '../PhaseForm'

const isLogged = !!localStorage.getItem("token");

const App = () => {

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
          <Login />
          {/* <Footer /> */}
        </Route>

        <Route path="/contact">
          <Header />
          <ContactForm />
          {/* <Footer /> */}
        </Route>

        <ProtectedRoute path="/calendar">
          <ConnectedHeader />
          <MyCalendar />
          {/* <ConnectedFooter /> */}
        </ProtectedRoute>

        <ProtectedRoute path="/tech/calendar">
          <ConnectedHeader />
          <TechCalendar />
          {/* <ConnectedFooter /> */}
        </ProtectedRoute>

        <Route path="/eventform"> 
          <ConnectedHeader />
          <EventForm /> 
          {/* <ConnectedFooter /> */}
        </Route>

        <Route path="/phaseform"> 
          <ConnectedHeader />
          <PhaseForm /> 
          {/* <ConnectedFooter /> */}
        </Route>
        
        <Route path="/addtech">
          <ConnectedHeader />
          <AddTech />
        {/* <ConnectedFooter /> */}
        </Route>

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
