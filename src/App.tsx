import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MasterCard from "./components/MasterCard/MasterCard";
import MasterCardManager from "./components/MasterCardManager/MasterCardManager";

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <Switch>
          <Route exact path="/:idMasterCard">
            <MasterCard/>
          </Route>
          <Route exact path="/">
            <MasterCardManager/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
