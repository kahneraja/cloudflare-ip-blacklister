import React, {Component} from 'react'
import {Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import Access from "./components/Access";
import Zones from "./components/Zones";
import AddRules from "./components/AddRules";
import Accounts from "./components/Accounts";

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/access' component={Access}/>
          <Route exact path='/zones' component={Zones}/>
          <Route exact path='/accounts' component={Accounts}/>
          <Route exact path='/add-rules' component={AddRules}/>
        </Switch>
      </main>
    )
  }
}

export default Main