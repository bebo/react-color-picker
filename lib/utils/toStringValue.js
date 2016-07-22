'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = toStringValue;
var assign = require('object-assign');
var toColor = require('./color').toColor;

function toStringValue(color) {
    color = toColor(assign({}, color));

    return color.toRgb().a == 1 ? color.toHexString() : color.toRgbString();
}