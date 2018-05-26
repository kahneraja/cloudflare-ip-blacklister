import React, {Component} from 'react'
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Access from "./Access";
import Zones from "./Zones";
import AddRules from "./AddRules";

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/access' component={Access}/>
          <Route exact path='/zones' component={Zones}/>
          <Route exact path='/add-rules' component={AddRules}/>
        </Switch>
      </main>
    )
  }
}

export default Main