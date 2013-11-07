'use strict';

var Emitter = require('emitter-component'),
    classes = require('chi-classes'),
    events = require('chi-events'),
    inheritPrototype = require('mout/lang/inheritPrototype'),
    indexOf = require('mout/array/indexOf');

module.exports = tabs;
function tabs(element) {
    return new Tabs(element);
}

function Tabs(element) {
    Emitter.call(this);

    this.element = element;
    this.selected = null;
    this._current = null;

    this.select(0);

    var self = this;
    events(element)
        .children('.tabs-list li')
        .on('click', function(e) {
            e.preventDefault();
            self.select(this);
        });
}

inheritPrototype(Tabs, Emitter);

Tabs.prototype.select = function(section) {
    var sections = this.element.querySelectorAll('.tabs-section'),
        headings = this.element.querySelectorAll('.tabs-list li');

    var index;
    if (typeof section === 'number') {
        index = section;
    } else {
        index = indexOf(sections, section);
        if (index === -1) {
            index = indexOf(headings, section);
        }
    }


    var heading = headings[index];
    section = sections[index];
    if (!heading || !section) {
        throw new Error('Invalid tab selection');
    }

    this._select(heading, section);
};

Tabs.prototype._select = function(heading, section) {
    if (this._current) {
        classes(this._current).remove('tabs-selected');
    }

    classes(heading, section).add('tabs-selected');
    this._current = [heading, section];
    this.selected = section;
    this.emit('select', section);
};
