import JsonStore from "./JsonStore";

let ApiGateway = {

  getAccounts: () => {
    let url = `${process.env.REACT_APP_HOST_API}/accounts`
    let headers = ApiGateway.headers()
    return fetch(url, {
      method: 'GET',
      headers: headers
    })
  },

  getZones: () => {
    let url = `${process.env.REACT_APP_HOST_API}/zones`
    let headers = ApiGateway.headers()
    return fetch(url, {
      method: 'GET',
      headers: headers
    })
  },

  getRules: () => {
    let url = `${process.env.REACT_APP_HOST_API}/rules`
    let headers = ApiGateway.headers()
    return fetch(url, {
      method: 'GET',
      headers: headers
    })
  },

  addRule: (body) => {
    let url = `${process.env.REACT_APP_HOST_API}/rules`
    let headers = ApiGateway.headers()
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      }
    )
  },

  deleteRule: (ruleId) => {
    let url = `${process.env.REACT_APP_HOST_API}/rules/${ruleId}`
    let headers = ApiGateway.headers()
    return fetch(url, {
        method: 'DELETE',
        headers: headers
      }
    )
  },

  headers: () => {
    let jsonStore = new JsonStore()
    let config = jsonStore.get('config')

    let headers = {
      'Content-Type': 'application/json',
      'EMAIL': config.email,
      'KEY': config.apiKey
    }

    if (config.account)
      headers['ACCOUNT_ID'] = config.account.id

    return headers
  }
}

export default ApiGateway