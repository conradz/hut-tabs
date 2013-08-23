var EventEmitter = require('events').EventEmitter,
    _ = require('lodash'),
    classes = require('chi-classes'),
    events = require('chi-events');

function tabs(element) {
    return new Tabs(element);
}

module.exports = tabs;

function getSections(element) {
    var headers = element.querySelectorAll('.tabs-list li'),
        content = element.querySelectorAll('.tabs-section'),
        count = Math.min(headers.length, content.length),
        sections = [];

    for (var i = 0; i < count; i++) {
        sections.push({
            header: headers[i],
            content: content[i]
        });
    }

    return sections;
}

function Tabs(element) {
    EventEmitter.call(this);

    this._sections = getSections(element);
    this.selected = null;
    this.select(0);

    var self = this;
    this._sections.forEach(function(section, i) {
        events(section.header).on('click', function(e) {
            e.preventDefault();
            self.select(i);
        });
    });
}

Tabs.prototype = Object.create(EventEmitter.prototype);
Tabs.prototype.constructor = Tabs;

Tabs.prototype.select = function(section) {
    if (typeof section === 'number') {
        section = this._sections[section];
    } else if (section) {
        section = _.find(this._sections, { content: section });
    }

    if (!section) {
        return;
    }

    if (this.selected) {
        var current = this.selected;
        classes(current.header, current.content).remove('tabs-selected');
    }

    classes(section.header, section.content).add('tabs-selected');
    this.selected = section;
    this.emit('select', section);
};
