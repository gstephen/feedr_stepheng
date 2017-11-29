import React, {Component} from 'react'

class PopUp extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="popUp" style={{display: "none"}}>
        <a href="" className="closePopUp">X</a>
        <div className="container">
          <h1>Article title here</h1>
          <p>
            Article description/content here.
          </p>
          <a href="" className="popUpAction" target="_blank">Read more from source</a>
        </div>
      </div>
    )
  }
}

export default PopUp
