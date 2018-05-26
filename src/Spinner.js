import React, {Component} from 'react'

class Spinner extends Component {

  render() {
    if (this.props.activeRequests === 0){

    }

    let show = () => {
      if (this.props.activeRequests > 0) {
        return (
          <div className="full-bleed padding-left-30p padding-top-30p">
            <div className="font-size-large">
              <div className="padding-10 inline-block">
                <i className="fa fa-clock-o" aria-hidden="true"></i>
              </div>
              <div className="padding-10 inline-block">
                loading
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