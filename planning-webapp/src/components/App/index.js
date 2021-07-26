import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./styles.scss";

import Header from "../Header";
import ConnectedHeader from "../ConnectedHeader";
import LoginApp from "../Login";
import ContactForm from "../ContactForm";
import Homepage from "../Homepage";
import MyCalendar from "../Calendar";
import AddTech from "../AddTech";
import Footer from "../Footer";
import ConnectedFooter from "../ConnectedFooter";
import PageNotFound from "../PageNotFound";
import ProtectedRoute from "../ProtectedRoute";

const isLogged = !!localStorage.getItem("token");
console.log("isLogged", isLogged);

const App = () => (
  //We use the router method to switch from a component to another
  <BrowserRouter>
    <div className="app">
      <Switch>
        <Route exact path="/">
          {/* { isLogged ? <Redirect to="/calendar" /> : <Redirect to="/login" /> } */}
          <Homepage />
          {/* <Footer /> */}
        </Route>

        <Route path="/login">
          <Header />
          <LoginApp />
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

        <ProtectedRoute path="/addtech">
          <ConnectedHeader />
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
);

export default App;
