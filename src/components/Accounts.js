import React, {Component} from 'react'
import JsonStore from "../JsonStore"
import ApiGateway from "../ApiGateway";

class Accounts extends Component {

  state = {
    accounts: []
  }

  constructor(props) {
    super(props)

    this.selectAccount = this.selectAccount.bind(this)
  }

  componentDidMount() {
    this.getAccounts()
  }

  getAccounts() {
    ApiGateway.getAccounts().then(response => {
      response.json().then((data) => {
        if (data) {
          this.setState({
            accounts: data
          })
        }
      })
    })
  }

  selectAccount(account) {
    let jsonStore = new JsonStore()
    let config = jsonStore.get('config')
    config.account = account
    jsonStore.set('config', config)
    this.props.history.push("/")
  }

  render() {
    let accountItems = this.state.accounts.map((account) =>
      <div key={account.id}>
        <div className="inline-block padding-10">
          <div
            className="padding-10 font-size-large font-bold">
            {account.name}
          </div>
        </div>
        <div className="inline-block padding-10">
          <i onClick={() => this.selectAccount(account)}
             className="fa fa-chevron-circle-right fa-large cursor-pointer"
             aria-hidden="true"></i>
        </div>
      </div>
    )

    return (
      <div className="padding-10">
        <h2>
          <i className="fa fa-gavel padding-10"></i>
          Cloudflare Blacklister: Accounts
        </h2>
        <p>
          Select an active account.
        </p>
        <div>
          {accountItems}
        </div>
      </div>
    );
  }
}

export default Accounts