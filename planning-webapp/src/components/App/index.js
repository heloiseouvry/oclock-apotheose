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
import TransportForm from "../TransportForm";
import SalaryReport from "../SalaryReport";
import DelTech from "../DelTech";




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

        <Route path="/calendar">
          <ConnectedHeader />
          <MyCalendar />
          {/* <ConnectedFooter /> */}
        </Route>

        <ProtectedRoute path="/tech/calendar">
          <ConnectedHeader />
          <TechCalendar />
          {/* <ConnectedFooter /> */}
        </ProtectedRoute>

        {/* <Route path="/transportform"> 
          <ConnectedHeader />
          <TransportForm /> 
          {/* <ConnectedFooter /> */}
        {/* </Route>   */}
        
        
        <Route path="/addtech">
          <ConnectedHeader />
          <AddTech />
        {/* <ConnectedFooter /> */}
        </Route>

        <Route path="/viewtech">
          <ConnectedHeader />
          <ViewTech />
        {/* <ConnectedFooter /> */}
        </Route>

        <Route path="/salaryreport">
          <ConnectedHeader />
          <SalaryReport />
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
