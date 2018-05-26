import React, {Component} from 'react'
import JsonStore from "./JsonStore"
import ApiGateway from "./ApiGateway";

class Zones extends Component {

  state = {
    zones: []
  }

  constructor(props) {
    super(props)

    this.selectZone = this.selectZone.bind(this)
  }

  componentDidMount() {
    this.getZones()
  }

  getZones() {
    ApiGateway.getZones().then(response => {
      response.json().then((data) => {
        if (data) {
          this.setState({
            zones: data
          })
        }
      })
    })
  }

  selectZone(zone) {
    let jsonStore = new JsonStore()
    let config = jsonStore.get('config')
    config.zone = zone
    jsonStore.set('config', config)
    this.props.history.push("/");
  }

  render() {

    let zoneItems = this.state.zones.map((zone) =>
      <div key={zone.id}>
        <div className="inline-block padding-10">
          <div
            className="padding-10 font-size-large font-bold">
            {zone.name}
          </div>
        </div>
        <div className="inline-block padding-10">
          <i onClick={() => this.selectZone(zone)}
             className="fa fa-chevron-circle-right fa-large cursor-pointer"
             aria-hidden="true"></i>
        </div>
      </div>
    )

    return (
      <div>
        <h2>
          <i className="fa fa-gavel padding-10"></i>
          Cloudflare Blacklister: Zones
        </h2>
        <p>
          Select an active zone.
        </p>
        <div>
          {zoneItems}
        </div>
      </div>
    );
  }
}

export default Zones