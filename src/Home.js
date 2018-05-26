import React, {Component} from 'react'
import JsonStore from "./JsonStore"
import ApiGateway from "./ApiGateway"
import _ from 'lodash'

class Home extends Component {

  jsonStore = new JsonStore()

  state = {
    apiKey: '',
    email: '',
    zone: {},
    zones: [],
    rules: [],
    ipAddresses: '',
    groups: [],
    activeRequests: 0
  }

  constructor(props) {
    super(props)

    this.handleAPIKeyChange = this.handleAPIKeyChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleIPAddressesChange = this.handleIPAddressesChange.bind(this)
    this.handleNotesChange = this.handleNotesChange.bind(this)
    this.getZones = this.getZones.bind(this)
    this.getRules = this.getRules.bind(this)
    this.addRules = this.addRules.bind(this)
    this.deleteRuleGroup = this.deleteRuleGroup.bind(this)
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

  handleIPAddressesChange(event) {
    this.setState({
      'ipAddresses': event.target.value,
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

  reset() {
    this.setState({
      zone: {},
      zones: [],
      rules: [],
      groups: []
    })
  }

  getZones() {
    this.reset()
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
        let groupSet = _.groupBy(data, (rule) => {
          return rule.notes
        });

        let groups = []
        _.forOwn(groupSet, function (value, key) {
          let group = {
            name: key,
            size: value.length
          }
          groups.push(group)
        })
        this.setState({groups: groups})
      })
    })
  }

  addRules() {
    let notes = this.state.notes
    let ipAddresses = this.state.ipAddresses.split("\n")
    ipAddresses.map((ipAddress) => {
      this.addRule(ipAddress, notes)
    })
    this.setState({
      'ipAddresses': '',
      'notes': '#'
    })
    this.getRules()
  }

  addRule(ipAddress, notes) {
    let body = {
      configuration: {
        target: 'ip',
        value: ipAddress
      },
      notes: notes,
      mode: 'block'
    }
    ApiGateway.addRule(body, this.state.zone.id).then((response) => {
      response.json().then(() => {
      })
    })
  }

  deleteRuleGroup(group) {
    let rules = _.filter(this.state.rules, {notes: group.name});
    rules.map((rule) => {
      this.deleteRule(rule)
    })
    this.getRules()
  }

  deleteRule(rule) {
    ApiGateway.deleteRule(rule.id, this.state.zone.id).then((response) => {
      response.json().then(() => {
      })
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

    let groupItems = this.state.groups.map((group, index) =>
      <div key={index}>
        <div className="padding-2 margin-2 inline-block width-100">
          {group.name}
        </div>
        <div
          className="padding-2 margin-2 inline-block padding-5 font-size-small font-color-white bg-color-red width-30 center">
          {group.size}
        </div>
        <div className="padding-2 margin-2 inline-block padding-5">
          <i className="fa fa-times" aria-hidden="true" onClick={() => {
            this.deleteRuleGroup(group)
          }}></i>
        </div>
      </div>
    )

    return (
      <div>
        <h2>
          <i className="fa fa-gavel padding-10"></i>
          Cloudflare Blacklister
        </h2>
        <p>
          Dump blacklisted ip addresses with a tag for any of your zones.
        </p>
        <div className="inline-block width-200">
          <div>
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
        <div className="inline-block">
          <div>
            <h3>Blocks</h3>
          </div>
          <div>
            <div className="inline-block">
              <div>
                <div className="padding-10 width-100">
                  IP Addresses:
                </div>
                <div className="padding-10">
                  <textarea className="padding-10 width-120 height-100"
                            type="text"
                            value={this.state.ipAddresses}
                            onChange={this.handleIPAddressesChange}
                            onBlur={this.handleIPAddressesChange}/>
                </div>
              </div>
              <div>
                <div className="padding-10 width-100">
                  Tag:
                </div>
                <div className="padding-10">
                  <input className="padding-10"
                         type="text"
                         value={this.state.notes}
                         onChange={this.handleNotesChange}
                         onBlur={this.handleNotesChange}/>
                </div>
              </div>
              <div className="padding-10">
                <button className="padding-10"
                        onClick={this.addRules}>
                  Apply to {this.state.zone.name}
                </button>
              </div>
            </div>
            <div className="inline-block padding-10">
              {groupItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home