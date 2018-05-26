import JsonStore from "./JsonStore";

let ApiGateway = {

  getZones: () => {
    let url = 'http://localhost:3000/zones'
    let headers = ApiGateway.headers()
    return fetch(url, {
      method: 'GET',
      headers: headers
    })
  },

  getRules: () => {
    let url = `http://localhost:3000/rules`
    let headers = ApiGateway.headers()
    return fetch(url, {
      method: 'GET',
      headers: headers
    })
  },

  addRule: (body) => {
    let url = `http://localhost:3000/rules`
    let headers = ApiGateway.headers()
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      }
    )
  },

  deleteRule: (ruleId) => {
    let url = `http://localhost:3000/rules/${ruleId}`
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
    return {
      'Content-Type': 'application/json',
      'EMAIL': config.email,
      'KEY': config.apiKey,
      'ZONE_ID': config.zone.id
    }
  }
}

export default ApiGateway