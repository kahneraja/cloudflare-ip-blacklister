import React, {Component} from 'react'
import JsonStore from "./JsonStore";
import ApiGateway from "./ApiGateway";

class Home extends Component {

  jsonStore = new JsonStore()

  state = {
    apiKey: '',
    email: '',
    zone: {},
    zones: [],
    rules: [],
    ipAddresses: [],
  }

  constructor(props) {
    super(props)

    this.handleAPIKeyChange = this.handleAPIKeyChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleIPAddressChange = this.handleIPAddressChange.bind(this)
    this.handleNotesChange = this.handleNotesChange.bind(this)
    this.getZones = this.getZones.bind(this)
    this.getRules = this.getRules.bind(this)
    this.addRule = this.addRule.bind(this)
    this.selectZone = this.selectZone.bind(this)
    this.initApi = this.initApi.bind(this)
  }

  componentWillMount() {
    this.setState({...this.jsonStore.get('config')})
  }

  componentDidMount() {
    this.initApi()
  }

  initApi() {
    let config = this.jsonStore.get('config')
    if (config && config.email && config.apiKey)
      this.getZones()
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

  handleIPAddressChange(event) {
    this.setState({
      'ipAddress': event.target.value,
    })
  }

  handleNotesChange(event) {
    this.setState({
      'notes': event.target.value,
    })
  }

  selectZone(zone) {
    this.setState({
      zoneId: zone.id
    })
  }

  getZones() {
    this.setState({
      zone: {},
      zones: [],
      rules: []
    })
    ApiGateway.getZones().then(response => {
      response.json().then((data) => {
        if (data) {
          let zone = data[0]
          this.setState({
            zone: zone,
            zones: data
          })
          this.getRules()
        }
      })
    })
  }

  getRules() {
    ApiGateway.getRules(this.state.zone.id).then(response => {
      response.json().then((data) => {
        this.setState({rules: data})
      })
    })
  }

  addRule() {
    let body = {
      configuration: {
        target: 'ip',
        value: this.state.ipAddress
      },
      notes: this.state.notes,
      mode: 'block'
    }
    ApiGateway.addRule(body, this.state.zone.id).then(() => {
      this.getRules()
    })
  }

  render() {
    let zoneItems = this.state.zones.map((zone) =>
      <div key={zone.id}
           className="padding-10"
           onClick={() => this.selectZone(zone)}>
        {zone.name}
      </div>
    )

    let ruleItems = this.state.rules.map((rule) =>
      <div key={rule.id}
           className="padding-10">
        {rule.configuration.value} {rule.notes}
      </div>
    )

    return (
      <div>
        <h2>
          <i className="fa fa-gavel padding-10"></i>
          Cloudflare Blacklister
        </h2>
        <p>Dump blacklisted ip addresses with a tag for any of your zones.</p>
        <div className="inline-block width-200 padding-10">
          <div className="padding-10">
            <div>
              <h3>API</h3>
              <div className="padding-10">
                <input type="text"
                       className="padding-10"
                       value={this.state.apiKey}
                       onChange={this.handleAPIKeyChange}
                       onBlur={this.handleAPIKeyChange}
                />
              </div>
              <div className="padding-10">
                <div>
                  <input type="text"
                         className="padding-10"
                         value={this.state.email}
                         onChange={this.handleEmailChange}
                         onBlur={this.handleEmailChange}
                  />
                </div>
                <div>
                  <i onClick={this.initApi}
                     className="fa fa-refresh padding-10"
                     aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="padding-10">
            <div>
              <h3>Zones</h3></div>
            <div>
              {zoneItems}
            </div>
          </div>
        </div>
        <div className="inline-block padding-10">
          <div>
            <div className="padding-10 width-100">
              IP Addresses:
            </div>
            <div className="padding-10">
              <textarea className="padding-10 width-120 height-200" type="text" onBlur={this.handleIPAddressChange}/>
            </div>
          </div>
          <div>
            <div className="padding-10 width-100">
              Tag:
            </div>
            <div className="padding-10">
              <input className="padding-10" type="text" onBlur={this.handleNotesChange}/>
            </div>
          </div>
          <div className="padding-10">
            <button className="padding-10" onClick={this.addRule}>Apply to {this.state.zone.name}</button>
          </div>
        </div>
        <div className="inline-block padding-10">
          <div>
            <h3>Tags</h3>
            <div>
              {ruleItems}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Home