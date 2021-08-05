import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./styles.scss";

import Header from "../Header";
import ConnectedHeader from "../ConnectedHeader";
import Login from "../Login";
import ForgotPassword from "../ForgotPassword";
import ContactForm from "../ContactForm";
import Homepage from "../Homepage";
import MyCalendar from "../Calendar";
import TechCalendar from "../TechCalendar";
import AddTech from "../AddTech";
import Footer from "../Footer";
import ConnectedFooter from "../ConnectedFooter";
import PageNotFound from "../PageNotFound";
import ProtectedRoute from "../ProtectedRoute";
import ViewTech from "../ViewTech";
import SalaryReport from "../SalaryReport";
import TechSalaryReport from "../TechSalaryReport";

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

          <Route path="/forgottenpassword">
            <Header />
            <ForgotPassword />
            <Footer />
          </Route>

          <Route path="/contact">
            <Header />
            <ContactForm />
            <Footer />
          </Route>

          <ProtectedRoute path="/calendar">
            <ConnectedHeader />
            <MyCalendar />
            <ConnectedFooter />
          </ProtectedRoute>

          <ProtectedRoute path="/tech/calendar">
            <ConnectedHeader />
            <TechCalendar />
            <ConnectedFooter />
          </ProtectedRoute>

          <ProtectedRoute path="/addtech">
            <ConnectedHeader />
            <AddTech />
            <ConnectedFooter />
          </ProtectedRoute>

          <ProtectedRoute path="/viewtech">
            <ConnectedHeader />
            <ViewTech />
            <ConnectedFooter />
          </ProtectedRoute>

          <ProtectedRoute path="/salaryreport">
            <ConnectedHeader />
            <SalaryReport />
            <ConnectedFooter />
          </ProtectedRoute>

          <ProtectedRoute path="/tech/salaryreport">
            <ConnectedHeader />
            <TechSalaryReport />
            <ConnectedFooter />
          </ProtectedRoute>

          <Route path="*">
            <Header />
            <PageNotFound />
            <Footer />
          </Route>
          
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
