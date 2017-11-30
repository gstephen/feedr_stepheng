import React from 'react'

function PopUp(props){
  return Object.keys(props).map(key =>
    <div className="popUp" style={{display: "none"}} key={key}>
      <a href="" className="closePopUp">X</a>
      <div className="container">
        <h1>{props[key].title}</h1>
        <p>
          {props[key].content}
        </p>
        <a href={props[key].link} className="popUpAction" target="_blank">Read more from source</a>
      </div>
    </div>
  )
}

export default PopUp
