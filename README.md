# tilePuzzle

[![Code Climate](https://codeclimate.com/github/matthewfedak/tilePuzzle/badges/gpa.svg)](https://codeclimate.com/github/matthewfedak/tilePuzzle) [![Build Status](https://travis-ci.org/matthewfedak/tilePuzzle.svg?branch=master)](https://travis-ci.org/matthewfedak/tilePuzzle)

> A simple sliding tile puzzle game jQuery plugin

[Demo](#demo) |
[Example](#example) |
[Configuration](#configuration) |
[Releases](https://github.com/matthewfedak/tilePuzzle/releases) |

----

## Demo

A working demo can be viewed on my site [demo](http://matthewfedak.co.uk/tilePuzzle) here.

## Example

HTML - Create a div element to bind the plugin to:
```html
<div id="puzzle"></div>
```
JS - Bind the plugin to your element and pass some config parameters
```javascript
$('#puzzle').tilePuzzle({
    'level': 4,
    'maxWidth': 300,
    'imageUrl': 'images/cristo-redentor-rio-de-janeiro-brazil.jpg'
});
```

## Configuration

- **level**: An integer *(3+)*
- **maxWidth**: width of puzzle *(px)*
- **imageUrl**: An image URL

## License

**tilePuzzle is available under the [MIT license](http://opensource.org/licenses/MIT).**

The MIT License (MIT)

Copyright (c) 2015 [Matthew Fedak](http://www.matthewfedak.co.uk)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

The photo of Christ the Redeemer in Rio De Janerio was taken by me August 2012.
