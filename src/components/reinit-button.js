
import React from 'react'

import Button from 'components/button'

class ReinitButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let label = 'Reinit'

    return (
      <div
        style={{
          width:'100%',
          height:'100%',
          backgroundColor:'#c2eae9',
          textAlign:'center',
        }}
      >
        <Button onClick={this.props.onClick}>
          {label}
        </Button>
      </div>
    )
  }
}

export default ReinitButton