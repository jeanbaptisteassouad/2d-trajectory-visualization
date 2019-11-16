
import React from 'react'

import Button from 'components/button'

class StopAndPlayButton extends React.Component {
  constructor(props) {
    super(props)

    this.onClick = () => {
      if (this.props.isOn) {
        this.props.onStop()
      } else {
        this.props.onStart()
      }
    }
  }

  render() {
    let label = 'Stop'
    if (this.props.isOn === false) {
      label = 'Start'
    }

    return (
      <div
        style={{
          width:'100%',
          height:'100%',
          backgroundColor:'#c2eae9',
          textAlign:'center',
        }}
      >
        <Button onClick={this.onClick}>
          {label}
        </Button>
      </div>
    )
  }
}

export default StopAndPlayButton