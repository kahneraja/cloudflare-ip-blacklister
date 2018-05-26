import React, {Component} from 'react'
import JsonStore from "../JsonStore"
import ApiGateway from "../ApiGateway"
import _ from 'lodash'
import Spinner from "./Spinner";

class Home extends Component {

  config = new JsonStore().get('config')

  state = {
    rules: [],
    groups: [],
    isProcessing: false
  }

  constructor(props) {
    super(props)

    this.handleIPAddressesChange = this.handleIPAddressesChange.bind(this)
    this.handleNotesChange = this.handleNotesChange.bind(this)
    this.getRules = this.getRules.bind(this)
    this.deleteRuleGroup = this.deleteRuleGroup.bind(this)
    this.addRules = this.addRules.bind(this)
  }

  componentDidMount() {
    this.getRules()
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

  reset() {
    this.setState({
      rules: [],
      groups: []
    })
  }

  addRules() {
    this.props.history.push("/add-rules")
  }

  getRules() {
    this.showSpinner()
    ApiGateway.getRules().then(response => {
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
        this.hideSpinner()
      })
    })
  }

  deleteRuleGroup(group) {
    this.showSpinner()
    let rules = _.filter(this.state.rules, {notes: group.name});
    let promises = rules.map((rule) => {
      return this.deleteRule(rule)
    })
    Promise.all(promises).then(() => {
      this.getRules()
    })
  }

  deleteRule(rule) {
    return ApiGateway.deleteRule(rule.id)
  }

  showSpinner() {
    this.setState({'isProcessing': true})
  }

  hideSpinner() {
    this.setState({'isProcessing': false})
  }

  render() {

    let groupItems = this.state.groups.map((group, index) =>
      <div key={index}>
        <div className="padding-2 margin-2 inline-block width-200">
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
          Cloudflare Blacklister: {this.config.zone.name}
        </h2>
        <p>
          Dump blacklisted ip addresses with a tag for any of your zones.
        </p>
        <div>
          <div>
            <div className="inline-block">
              <h3>Blocks</h3>
            </div>
          </div>
          <div>
            <div className="inline-block padding-10">
              {groupItems}
            </div>
          </div>
        </div>
        <div className="padding-10">
          <i onClick={this.addRules}
             className="fa fa-plus-circle fa-large cursor-pointer"
             aria-hidden="true"></i>
        </div>
        <Spinner enabled={this.state.isProcessing}></Spinner>
      </div>
    );
  }
}

export default Home