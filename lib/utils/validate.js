"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (info) {
  var height = info.height;
  var width = info.width;


  if (info.x < 0) {
    info.x = 0;
  }

  if (info.x >= width) {
    info.x = width;
  }

  if (info.y < 0) {
    info.y = 0;
  }

  if (info.y >= height) {
    info.y = height;
  }

  return info;
};