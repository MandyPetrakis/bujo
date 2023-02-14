import React from "react";
import DailyLog from "./DailyLog";
import "./App.css";
import NavBar from "./NavBar";
import Calendar from "./Calendar";
import ToDo from "./ToDo";

import { Route, Switch, Routes } from "react-router-dom";

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
        <Route>
          <ToDo path="/todo" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
