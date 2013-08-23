# hut-tabs

HTML UI Toolkit tabs component

Break up your content into multiple tabs. Switch between tabs on the client
using JS.

## Example

[View the live example](http://conradz.github.io/hut-tabs)

With the following HTML:

```html
<div id="my-tabs" class="hut-tabs">
    <ul class="tabs-list">
        <li>General</li>
        <li>Dogs</li>
        <li>Cats</li>
    </ul>
    <div class="tabs-section">
        General boring information here...
    </div>
    <div class="tabs-section">
        Cute pics of puppies
    </div>
    <div id="kittens" class="tabs-section">
        Cute pics of kittens
    </div>
</div>
```

Give it behavior with the following JS:

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
new object that contains the function documented below. The first tab is
automatically selected.

### `#selected`

An object that indicates the currently selected section. It is an object that
contains a `header` property with the header `li` DOM node and a `content`
property with the `.tabs-section` DOM node.

### `#select(section)`

Selects a tab section. If `section` is a number, it will select the section at
that index (for example use `0` if selecting the first section). If `section` is
an element, it must be one of the `tabs-section` elements.

### `Event: select(section)`

Triggered when a new section is selected. `section` will be an object that
contains a `header` property with the `li` header DOM node and a `content`
property with the `.tabs-section` DOM node.

## Style Reference

The base CSS style only defines basic layout and formatting of the accordion.
You should add your own style when using it. Import the base style by using
[npm-css](https://github.com/shtylman/npm-css) and add `@import "hut-tabs"` to
your stylesheet. Use the selectors defined below for your own styling.

### `.hut-tabs`

The root of each tabs component. This contains the `.tabs-list` element and all
of the `.tabs-section` elements.

### `.tabs-list`

The list of tab headers. It must be a `ul` list with `li` child elements.

### `.tabs-list li`

The title/header for a tab. There should be a header for each `.tabs-section`
element, and the header elements must be in the same order as the section
elements.

### `.tabs-list li.tabs-selected`

The `.tabs-selected` class is added to the header element when the section for
that header is selected.

### `.tabs-section`

The content for a tab section. There should be a header (in `.tabs-list`) for
each section. Normally the `.tabs-section` is hid until it is selected.

### `.tabs-section.tabs-selected`

The `.tabs-selected` class is added to the section element when it is selected.
