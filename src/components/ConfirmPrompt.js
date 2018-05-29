import React, {Component} from 'react'

class ConfirmPrompt extends Component {
  render() {
    let show = () => {
      if (this.props.enabled) {
        return (
          <div className="full-bleed center">
            <div className="font-size-large">
              <div className="padding-10">
                <h1>
                  Are you sure?
                </h1>
              </div>
              <div className="padding-10">
                <h1>
                  <i className="fa fa-times padding-10 cursor-pointer"
                     onClick={this.props.onCancel}
                     aria-hidden="true"></i>
                  <i className="fa fa-check padding-10 cursor-pointer"
                     onClick={this.props.onComplete}
                     aria-hidden="true"></i>
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

export default ConfirmPrompt