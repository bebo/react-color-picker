'use strict';

import './style/index.scss'

import React from 'react'
import { render } from 'react-dom'


import ColorPicker from './src'

let COLOR = '#F28281'

let App = React.createClass({

    onDrag: function(c){
        COLOR = c
        this.setState({})
    },

    render: function(){
    	return <div style={{margin: 30}}>
        	<h1>This works correctly</h1>
            <ColorPicker
                defaultValue={ COLOR }
                onDrag={ this.onDrag }
            />
            <h1>Try this as well</h1>
            <ColorPicker
                value={ COLOR }
                onDrag={ this.onDrag }
            />

        	<div style={{background: COLOR, width: 100, height: 100}}>
                <span style={{background: 'blue', color: 'white'}}>{COLOR}</span>
            </div>
        </div>
    }
})

render(<App />, document.getElementById('content'))

