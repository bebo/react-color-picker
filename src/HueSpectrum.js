import React from 'react'
import ReactDOM from 'react-dom'
import Region from 'region'
import assign from 'object-assign'
import common from './utils/common'

import VALIDATE from './utils/validate'

import toStringValue from './utils/toStringValue'

export default React.createClass(assign({

    displayName: 'HueSpectrum',

    getDefaultProps(){
      return {
        height      : 300,
        width       : 30,
        pointerSize : 3,
        defaultColor: require('./defaultColor')
      }
    },

    getInitialState(){
        return {
            h: 0
        }
    },

    componentDidUpdate(){
        // this.updateDragPositionIf()
    },

    componentDidMount(){
        this.updateDragPositionIf()
    },

    updateDragPositionIf(){

        if (!this.props.height){
            this.setState({})
        }
    },

    render(){
        this.hsv = this.toColorValue(this.state.value || this.props.value || this.props.defaultValue || this.props.defaultColor)
        // console.log('hue:', this.hsv)

        if (this.state.h == 360 && !this.hsv.h){
            //in order to show bottom red as well on drag
            this.hsv.h = 360
        }

        var style = assign({}, this.props.style)

        if (this.props.height){
            style.height = this.props.height
        }
        if (this.props.width){
            style.width = this.props.width
        }

        var dragStyle = {
            height: this.props.pointerSize
        }

        var dragPos = this.getDragPosition()

        if (dragPos != null){
            dragStyle.top   = dragPos
            dragStyle.display = 'block'
        }
        return (
            <div className='react-color-picker__hue-spectrum' style={style} onMouseDown={this.onMouseDown}>
                <div className="react-color-picker__hue-drag" style={dragStyle}>
                    <div className="react-color-picker__hue-inner" />
                </div>
            </div>
        )
    },

    getDragPosition(hsv){
        hsv = hsv || this.hsv

        if (!this.props.height && !this.isMounted()){
            return null
        }

        var height = this.props.height || Region.fromDOM(ReactDOM.findDOMNode(this)).getHeight()
        var size   = this.props.pointerSize

        var pos  = Math.round(hsv.h * height / 360)
        var diff = Math.round(size / 2)

        return pos - diff
    },

    updateColor(point){
        point = VALIDATE(point)

        this.hsv.h = point.y * 360 / point.height

        if (this.hsv.h != 0){
            this.state.h = this.hsv.h
        }

        this.state.h = this.hsv.h != 0? this.hsv.h: 0
    },

    toStringValue
}, common))
