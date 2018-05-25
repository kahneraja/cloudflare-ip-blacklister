import React, {Component} from 'react'
import {Route, Switch} from "react-router-dom";
import Home from "./Home";

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
        </Switch>
      </main>
    )
  }
}

export default Main