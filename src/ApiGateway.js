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

  getRules: (zoneId) => {
    let url = `http://localhost:3000/rules`
    let headers = ApiGateway.headers()
    headers['ZONE_ID'] = zoneId
    return fetch(url, {
      method: 'GET',
      headers: headers
    })
  },

  addRule: (body, zoneId) => {
    let url = `http://localhost:3000/rules`
    let headers = ApiGateway.headers()
    headers['ZONE_ID'] = zoneId
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      }
    )
  },

  headers: () => {
    let jsonStore = new JsonStore()
    return {
      'Content-Type': 'application/json',
      'EMAIL': jsonStore.get('config').email,
      'KEY': jsonStore.get('config').apiKey
    }
  }
}

export default ApiGateway