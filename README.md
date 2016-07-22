# React Color Picker

> A carefully crafted color picker for React.

Demo: [jslog.com/react-color-picker](http://jslog.com/react-color-picker)

No images have been used in the making of this color picker :)

![Color Picker](https://cloud.githubusercontent.com/assets/512416/5023604/0761ac7a-6aca-11e4-90db-d8678be7c267.PNG)

## Install

#### npm

```sh
$ npm install react-color-picker
```

## Usage
You can have either **controlled** (using **value**) or **uncontrolled** (using **defaultValue**) pickers.

#### Please don't forget to include the styles!!! - `index.css`

Example (**controlled**)
```jsx
import { render } from 'react-dom'
import React from 'react'
import ColorPicker from 'react-color-picker'

import 'react-color-picker/index.css'

var App = React.createClass({

    displayName: 'App',

    onDrag: function(color, c){
        COLOR = color
        this.setState({})
    },

    render: function(){
        return (
            <div>
                <ColorPicker value={COLOR} onDrag={this.onDrag} />
                <div style={{background: COLOR, width: 100, height: 50, color: 'white'}}>
                    {COLOR}
                </div>
            </div>
        )
    }
})

render(<App />, document.body)

```

Example (**uncontrolled**)
```jsx
React.renderComponent(
    <ColorPicker defaultValue='#452135'/>,
    document.body
)

```

## HueSpectrum

You can use only the hue spectrum if that is what you need.

```jsx
var React = require('react')
var HueSpectrum = require('react-color-picker').HueSpectrum

<HueSpectrum value={color} width={100}/>
<HueSpectrum defaultValue="red" />
```

## SaturationSpectrum

You can use only the saturation spectrum if that is what you need.

```jsx
var React = require('react')
var SaturationSpectrum = require('react-color-picker').SaturationSpectrum

<SaturationSpectrum value={color} height={400}/>
<SaturationSpectrum defaultValue="red" />
```

## Properties

It's best if you specify a fixed size for the color picker.

Available options:

 * saturationWidth
 * saturationHeight
 * hueWidth
 * hueHeight (defaults to saturationHeight)

```jsx
<ColorPicker value={color} saturationWidth={400} saturationHeight={500} />
<ColorPicker value={color} saturationWidth={400} saturationHeight={500} hueWidth={100}/>
```

You can specify any other properties on the `ColorPicker`, including `className`, `style`, etc
The `ColorPicker` will always have a css class `color-picker`

The ColorPicker, the HueSpectrum and the SaturationSpectrum all accept `onDrag` and `onChange` callbacks.

### onDrag(colorString)

Called during the dragging operation.

### onChange(colorString)

Called after mouse up - when the color has been selected

## Contributing

Use [Github issues](https://github.com/zippyui/react-color-picker/issues) for feature requests and bug reports.

We actively welcome pull requests.

For setting up & starting the project locally, use:

```sh
$ git clone https://github.com/zippyui/react-color-picker
$ cd react-color-picker
$ npm install
$ npm dev
```

Now navigate to [localhost:8090](http://localhost:8090/)

Before building a new version, make sure you run

```sh
$ npm run build
```
which compiles the `src` folder (which contains jsx & ES6 files) into the `lib` folder (only valid EcmaScript 5 files).

## License

#### MIT