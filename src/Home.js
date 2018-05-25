import React, {Component} from 'react'
import JsonStore from "./JsonStore";

class Home extends Component {

  jsonStore = new JsonStore()

  state = {
    apiKey: '',
    email: '',
    zones: []
  }

  constructor(props) {
    super(props)

    this.handleAPIKeyChange = this.handleAPIKeyChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.getZones = this.getZones.bind(this)
  }

  componentWillMount() {
    this.setState({...this.jsonStore.get('config')})
  }

  handleAPIKeyChange(event) {
    this.setState({
      'apiKey': event.target.value,
    })
    this.jsonStore.set('config', this.state)
  }

  handleEmailChange(event) {
    this.setState({
      'email': event.target.value,
    })
    this.jsonStore.set('config', this.state)
  }

  getZones() {
    let url = 'https://api.cloudflare.com/client/v4/zones'
    let headers = {
      'Content-Type': 'application/json',
      'X-Auth-Email': this.state.email,
      'X-Auth-Key': this.state.apiKey
    }
    return fetch(url, {
      method: 'GET',
      headers: headers
    }).then(response => {
      this.state.zones = response.json().result
    })
  }

  zonesItems = this.state.zones.map((zone) =>
    <li>{zone.name}</li>
  );

  render() {
    return (
      <div>
        <h1>{this.state.apiKey}</h1>
        <h1>{this.state.email}</h1>
        <div>
          <input type="text"
                 value={this.state.apiKey}
                 onChange={this.handleAPIKeyChange}
                 onBlur={this.handleAPIKeyChange}
          />
        </div>
        <div>
          <input type="text" value={this.state.email}
                 onChange={this.handleEmailChange}
                 onBlur={this.handleEmailChange}
          />
        </div>
        <div>
          <ul>
            {this.zonesItems}
          </ul>
        </div>
        <div>
          <button onClick={this.getZones}>Get Zones</button>
        </div>
      </div>

    );
  }
}

export default Home