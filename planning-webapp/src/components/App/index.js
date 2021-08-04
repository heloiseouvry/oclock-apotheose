import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./styles.scss";

import Header from "../Header";
import ConnectedHeader from "../ConnectedHeader";
import Login from "../Login";
import ForgotPassword from "../ForgotPassword"
import ContactForm from "../ContactForm";
import Homepage from "../Homepage";
import MyCalendar from "../Calendar";
import TechCalendar from "../TechCalendar";
import AddTech from "../AddTech";
import Footer from "../Footer";
import ConnectedFooter from "../ConnectedFooter";
import PageNotFound from "../PageNotFound";
import ProtectedRoute from "../ProtectedRoute";
import ViewTech from "../ViewTech"
import SalaryReport from "../SalaryReport";
import TechSalaryReport from "../TechSalaryReport";
import DelTech from "../DelTech";
import FileTech from "../FileTech";

const App = () => {

  return (
  //We use the router method to switch from a component to another
  <BrowserRouter>
    <div className="app">
      <Switch>

        <Route exact path="/">
          <Homepage />
        </Route>

        <Route path="/login">
          <Header />
          <Login />
          <Footer />
        </Route>

        <Route path="/forgottenPassword">
          <Header />
          <ForgotPassword />
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

        <Route path="/tech/salaryreport">
          <ConnectedHeader />
          <TechSalaryReport />
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
