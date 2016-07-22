'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _color = require('./utils/color');

var _color2 = _interopRequireDefault(_color);

var _HueSpectrum = require('./HueSpectrum');

var _HueSpectrum2 = _interopRequireDefault(_HueSpectrum);

var _SaturationSpectrum = require('./SaturationSpectrum');

var _SaturationSpectrum2 = _interopRequireDefault(_SaturationSpectrum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toHsv = _color2.default.toHsv;

function emptyFn() {}

var RESULT = _react2.default.createClass({

    displayName: 'ColorPicker',

    getDefaultProps: function getDefaultProps() {
        return {
            defaultColor: require('./defaultColor'),
            saturationWidth: 300,
            saturationHeight: 300,
            hueHeight: null,
            hueWidth: 30,
            hueMargin: 10
        };
    },

    getInitialState: function getInitialState() {
        return {
            value: this.props.defaultValue
        };
    },

    prepareClassName: function prepareClassName(props) {
        var className = props.className || '';

        className += ' cp';

        return className;
    },

    prepareProps: function prepareProps(props) {

        props.className = this.prepareClassName(props);

        return props;
    },

    render: function render() {

        var props = this.prepareProps((0, _objectAssign2.default)({}, this.props));
        var hueStyle = (0, _objectAssign2.default)({}, this.props.hueStyle) || {};

        hueStyle.marginLeft = this.props.hueMargin;

        var value = props.value ? this.toColorValue(this.props.value) : null;

        var defaultValue = !value ? this.toColorValue(this.state.value || props.defaultValue || props.defaultColor) : null;

        var saturationConfig = {
            onDrag: this.handleSaturationDrag,
            onChange: this.handleSaturationChange,
            onMouseDown: this.handleSaturationMouseDown,
            height: props.saturationHeight,
            width: props.saturationWidth,
            inPicker: true
        };

        var hueConfig = {
            onDrag: this.handleHueDrag,
            onChange: this.handleHueChange,
            height: props.hueHeight || props.saturationHeight,
            width: props.hueWidth,
            inPicker: true,
            style: hueStyle
        };

        if (this.state.dragHue) {
            ;(value || defaultValue).h = this.state.dragHue;
        }

        //both value and defaultValue are objects like: {h,s,v}
        if (value) {
            saturationConfig.value = (0, _objectAssign2.default)({}, value);
            hueConfig.value = (0, _objectAssign2.default)({}, value);
        } else {
            saturationConfig.defaultValue = (0, _objectAssign2.default)({}, defaultValue);
            hueConfig.defaultValue = (0, _objectAssign2.default)({}, defaultValue);
        }

        return _react2.default.createElement(
            'div',
            props,
            _react2.default.createElement(_SaturationSpectrum2.default, saturationConfig),
            _react2.default.createElement(_HueSpectrum2.default, hueConfig)
        );
    },

    toColorValue: function toColorValue(value) {
        return typeof value == 'string' ? toHsv(value) : value;
    },

    toStringValue: require('./utils/toStringValue'),

    handleChange: function handleChange(color) {

        this.state.dragHue = null;

        color = (0, _objectAssign2.default)({}, color);

        var value = this.toStringValue(color);(this.props.onChange || emptyFn)(value, color);
    },

    handleSaturationChange: function handleSaturationChange(color) {
        this.handleChange(color);
    },

    handleHueChange: function handleHueChange(color) {
        this.handleChange(color);
    },

    handleHueDrag: function handleHueDrag(hsv) {
        this.handleDrag(hsv);
    },

    handleSaturationDrag: function handleSaturationDrag(hsv) {
        this.handleDrag(hsv);
    },

    handleDrag: function handleDrag(color) {

        if (!this.props.value) {
            this.setState({
                value: color
            });
        }

        ;(this.props.onDrag || emptyFn)(this.toStringValue(color), color);
    },

    handleSaturationMouseDown: function handleSaturationMouseDown(hsv) {
        this.setState({
            dragHue: hsv.h
        });
    }
});

RESULT.HueSpectrum = _HueSpectrum2.default;
RESULT.SaturationSpectrum = _SaturationSpectrum2.default;

module.exports = RESULT;
exports.default = RESULT;