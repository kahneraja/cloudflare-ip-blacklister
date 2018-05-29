import React, {Component} from 'react'
import JsonStore from "../JsonStore"
import ApiGateway from "../ApiGateway"
import Spinner from "./Spinner";

class Home extends Component {

  config = new JsonStore().get('config')

  state = {
    ipAddresses: '',
    notes: '',
    isProcessing: false
  }

  constructor(props) {
    super(props)

    this.handleIPAddressesChange = this.handleIPAddressesChange.bind(this)
    this.handleNotesChange = this.handleNotesChange.bind(this)
    this.addRules = this.addRules.bind(this)
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

  addRules() {
    this.showSpinner()
    let notes = this.state.notes
    let ipAddresses = this.state.ipAddresses.split("\n")
    let promises = ipAddresses.map((ipAddress) => {
      return this.addRule(ipAddress, notes)
    })

    Promise.all(promises).then(() => {
      this.props.history.push("/")
    })
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
    return ApiGateway.addRule(body)
  }

  showSpinner() {
    this.setState({'isProcessing': true})
  }

  render() {
    return (
      <div className="padding-10">
        <h2>
          <i className="fa fa-gavel padding-10"></i>
          Cloudflare Blacklister: {this.config.zone.name}
        </h2>
        <p>
          Add some blacklisted ip addresses.
        </p>
        <div>
          <div>
            <h3>Blocks</h3>
          </div>
          <div>
            <div>
              <div>
                <div className="padding-10 width-100">
                  IP Addresses:
                </div>
                <div className="padding-10">
                  <textarea className="padding-10 height-100"
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
                <i onClick={this.addRules}
                   className="fa fa-chevron-circle-right fa-large cursor-pointer" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
        <Spinner enabled={this.state.isProcessing}></Spinner>
      </div>
    );
  }
}

export default Home