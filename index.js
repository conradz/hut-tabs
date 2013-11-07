'use strict';

var Emitter = require('emitter-component'),
    classes = require('chi-classes'),
    events = require('chi-events'),
    zip = require('mout/array/zip'),
    find = require('mout/array/find'),
    inheritPrototype = require('mout/lang/inheritPrototype');

module.exports = tabs;
function tabs(element) {
    return new Tabs(element);
}

function getSections(element) {
    return zip(
        element.querySelectorAll('.tabs-list li'),
        element.querySelectorAll('.tabs-section'));
}

function Tabs(element) {
    Emitter.call(this);

    this.selected = null;
    this._section = null;
    this._sections = getSections(element);

    this.select(0);

    var self = this;
    this._sections.forEach(function(section, i) {
        var header = section[0];
        events(header).on('click', function(e) {
            e.preventDefault();
            self.select(i);
        });
    });
}

inheritPrototype(Tabs, Emitter);

Tabs.prototype.select = function(section) {
    if (typeof section === 'number') {
        section = this._sections[section];
    } else {
        section = find(
            this._sections,
            function(s) { return s[1] === section; });
    }

    if (section) {
        this._select(section);
    }
};

Tabs.prototype._select = function(section) {
    if (this._section) {
        classes(this._section).remove('tabs-selected');
    }

    classes(section).add('tabs-selected');
    this._section = section;
    
    var content = section[1];
    this.selected = content;
    this.emit('select', content);
};
