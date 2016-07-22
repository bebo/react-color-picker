import React, { Component } from 'react'
import assign from 'object-assign'
import { autoBind } from 'react-class'

import HueSpectrum from './HueSpectrum'
import SaturationSpectrum from './SaturationSpectrum'

import { toHsv } from './utils/color'
import toStringValue from './utils/toStringValue'

import DEFAULT_COLOR from './defaultColor'

const emptyFn = () => {}

class ColorPicker extends Component {
  constructor(props) {
    super(props)
    autoBind(this)

    this.state = {
      value: this.props.defaultValue
    }
  }

  prepareClassName(props){
    const className = props.className || ''

    return `${className} cp react-color-picker`
  }

  prepareProps(props){
    props.className = this.prepareClassName(props)

    return props
  }

  render(){
    const props = this.prepareProps(assign({}, this.props))
    const hueStyle = assign({}, this.props.hueStyle) || {}

    hueStyle.marginLeft = this.props.hueMargin

    const value = props.value?
      this.toColorValue(this.props.value):
      null

    const defaultValue = !value ?
      this.toColorValue(this.state.value || props.defaultValue || props.defaultColor):
      null

    const saturationConfig = {
      onDrag: this.handleSaturationDrag,
      onChange: this.handleSaturationChange,
      onMouseDown: this.handleSaturationMouseDown,
      height: props.saturationHeight,
      width: props.saturationWidth,
      inPicker: true
    }

    const hueConfig = {
      onDrag: this.handleHueDrag,
      onChange: this.handleHueChange,
      height: props.hueHeight || props.saturationHeight,
      width: props.hueWidth,
      inPicker: true,
      style: hueStyle
    }

    if (this.state.dragHue){
      ;(value || defaultValue).h = this.state.dragHue
    }

    //both value and defaultValue are objects like: {h,s,v}
    if (value){
      saturationConfig.value = assign({}, value)
      hueConfig.value = assign({}, value)
    } else {
      saturationConfig.defaultValue = assign({}, defaultValue)
      hueConfig.defaultValue = assign({}, defaultValue)
    }

    const divProps = assign({}, props)

    delete divProps.color
    delete divProps.defaultColor
    delete divProps.defaultValue
    delete divProps.hueHeight
    delete divProps.hueMargin
    delete divProps.hueWidth
    delete divProps.saturationHeight
    delete divProps.saturationWidth
    delete divProps.value

    return <div {...divProps}>
      <SaturationSpectrum {...saturationConfig} />
      <HueSpectrum {...hueConfig} />
    </div>
  }

  toColorValue(value){
    return typeof value == 'string'?
        toHsv(value):
        value
  }

  toStringValue(...args) {
    return toStringValue(...args)
  }

  handleChange(color){
    this.state.dragHue = null

    color = assign({}, color)

    const value = this.toStringValue(color)

    this.props.onChange(value, color)
  }

  handleSaturationChange(color){
    this.handleChange(color)
  }

  handleHueChange(color){
    this.handleChange(color)
  }

  handleHueDrag(hsv) {
    this.handleDrag(hsv)
  }

  handleSaturationDrag(hsv) {
    this.handleDrag(hsv)
  }

  handleDrag(color) {
    if (!this.props.value) {
      this.setState({
        value: color
      })
    }

    this.props.onDrag(this.toStringValue(color), color)
  }

  handleSaturationMouseDown(hsv){
    this.setState({
      dragHue: hsv.h
    })
  }
}

ColorPicker.defaultProps = {
  onDrag: emptyFn,
  onChange: emptyFn,

  defaultColor: DEFAULT_COLOR,

  hueHeight: null,
  hueMargin: 10,
  hueWidth: 30,

  saturationWidth: 300,
  saturationHeight: 300
}

export {
  HueSpectrum,
  SaturationSpectrum
}

export default ColorPicker