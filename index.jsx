'use strict';

import './style/index.scss'

import React from 'react'
import { render } from 'react-dom'
import autoBind from 'react-class/autoBind'
import  { HueSpectrum } from './src'

class App extends React.Component {

  constructor(props) {
    super(props)
    autoBind(this);
    this.state = {
      color: '#000'
    }
  }

  onDrag(color, c) {
    this.setState({
      color
    })
  }

  render() {
    return <div>
        <HueSpectrum style={{}} onDrag={this.onDrag} defaultColor="red"/>
      <div style={{background: this.state.color, width: 100, height: 50, color: 'white'}}>
        {this.state.color}
      </div>
    </div>
  }

}

render(<App />, document.getElementById('content'))
