
import React from 'react'


const Button = (props) => {
  return (
    <div
      style={{height:'100%', width:'100%', cursor:'pointer'}}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
}
export default Button