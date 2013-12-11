# hut-tabs

[![NPM](https://nodei.co/npm/hut-tabs.png?compact=true)](https://nodei.co/npm/hut-tabs/)

[![Build Status](https://drone.io/github.com/conradz/hut-tabs/status.png)](https://drone.io/github.com/conradz/hut-tabs/latest)
[![Dependency Status](https://gemnasium.com/conradz/hut-tabs.png)](https://gemnasium.com/conradz/hut-tabs)

[![Selenium Test Status](https://saucelabs.com/browser-matrix/hut-tabs.svg)](https://saucelabs.com/u/hut-tabs)

HTML UI Toolkit tabs component - Create interactive tabs in JS.

Check out the [example](http://conradz.github.io/hut-tabs/)!

## Example

```html
<div id="my-tabs" class="hut-tabs">
    <ul class="tabs-list">
        <li>General</li>
        <li>Doge</li>
        <li>Kittens</li>
    </ul>
    <div class="tabs-section">
        General boring information here...
    </div>
    <div class="tabs-section">
        wow<br>
        such tabs
    </div>
    <div id="kittens" class="tabs-section">
        I can haz tabs?
    </div>
</div>
```

```js
var tabs = require('hut-tabs');

var myTabs = tabs(document.querySelector('#my-tabs'));

// Select the first tab
myTabs.select(0);

// Select the kittens tab
myTabs.select(document.querySelector('#kittens'));
```

## JS Reference

### `tabs(element)`

Creates a new tabs component and attaches the event handlers. It will return a
new `Tabs` object. The first tab is automatically selected.

### `#selected`

The DOM node for the currently selected `.tabs-section`, or `null` if no
section is selected.

### `#select(section)`

Selects a tab section. If `section` is a number, it will select the section at
that index (for example `t.select(0)` will select the first section). If
`section` is a DOM element, it will select the section with element. The
element must be one of the `.tabs-section` elements.

### `Event: select(section)`

Triggered when a new section is selected. `section` will be the DOM node for
the selected `.tabs-section`.

## Styling

To change the style, change the variables defined in the `variables.css` file or
override the styles with your own.
