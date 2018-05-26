import React, {Component} from 'react'
import JsonStore from "../JsonStore"

class Access extends Component {

  state = {
    apiKey: '',
    email: ''
  }

  constructor(props) {
    super(props)

    this.handleAPIKeyChange = this.handleAPIKeyChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.next = this.next.bind(this)
  }

  next() {
    let jsonStore = new JsonStore()
    jsonStore.set('config', this.state)
    this.props.history.push("zones");
  }

  handleAPIKeyChange(event) {
    this.setState({
      'apiKey': event.target.value,
    })

  }

  handleEmailChange(event) {
    this.setState({
      'email': event.target.value,
    })
  }

  render() {
    return (
      <div>
        <h2>
          <i className="fa fa-gavel padding-10"></i>
          Cloudflare Blacklister: Access
        </h2>
        <p>
          Let's get your access configured.
        </p>
        <div>
          <div className="padding-10">
            <div className="inline-block width-100">
              API Key:
            </div>
            <div className="inline-block">
              <input type="text"
                     className="padding-10"
                     value={this.state.apiKey}
                     onChange={this.handleAPIKeyChange}
                     onBlur={this.handleAPIKeyChange}
              />
            </div>
          </div>
          <div className="padding-10">
            <div className="inline-block width-100">
              Email:
            </div>
            <div className="inline-block">
              <input type="text"
                     className="padding-10"
                     value={this.state.email}
                     onChange={this.handleEmailChange}
                     onBlur={this.handleEmailChange}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="padding-10">
            <i onClick={this.next}
               className="fa fa-chevron-circle-right fa-large cursor-pointer" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Access