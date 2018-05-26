import React, {Component} from 'react'

class Spinner extends Component {

  render() {
    let show = () => {
      if (this.props.enabled) {
        return (
          <div className="full-bleed center">
            <div className="font-size-large">
              <div className="padding-10 inline-block">
                <h1>
                  <i className="fa fa-clock-o" aria-hidden="true"></i>
                </h1>
              </div>
            </div>
          </div>
        )
      }
    }

    return (
      <div>
        {show()}
      </div>
    );
  }
}

export default Spinner