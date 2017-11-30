import React, {Component} from 'react'

class Loader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="loader" style={{display: "none"}}></div>
    )
  }
}

export default Loader
