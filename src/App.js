import React from "react";
import DailyLog from "./DailyLog";
import "./App.css";
import NavBar from "./NavBar";
import Calendar from "./Calendar";
import Tasks from "./Tasks";
import Ideas from "./Ideas";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <DailyLog />
        </Route>
        <Route path="/calendar">
          <Calendar />
        </Route>
        <Route path="/ideas">
          <Ideas />
        </Route>
        <Route>
          <Tasks path="/todo" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
