'use strict';

var tape = require('tape'),
    tabs = require('./'),
    create = require('chi-create'),
    events = require('chi-events'),
    classes = require('chi-classes'),
    body = window.document.body;

function createStructure() {
    return create('div', { 'class': 'chi-create' },
        create('ul', { 'class': 'tabs-list' },
            create('li', { 'class': 'general-header' }, 'General'),
            create('li', { 'class': 'advanced-header' },  'Advanced')),
        create('div', { 'class': 'tabs-section general-content' },
            create('p', 'General content')),
        create('div', { 'class': 'tabs-section advanced-content' },
            create('p', 'Advanced content')));
}

function test(name, func) {
    tape(name, function(t) {
        var dom = createStructure();
        body.appendChild(dom);
        func(t, dom);
        body.removeChild(dom);
    });
}

test('automatically select first tab', function(t, el) {
    var item = tabs(el);
    t.equal(item.selected, el.querySelector('.general-content'));
    t.end();
});

test('select a section by DOM node', function(t, el) {
    var advanced = el.querySelector('.advanced-content'),
        item = tabs(el);
    item.select(advanced);
    t.equal(item.selected, advanced);
    t.end();
});

test('select a section by index', function(t, el) {
    var advanced = el.querySelector('.advanced-content'),
        item = tabs(el);
    item.select(1);
    t.equal(item.selected, advanced);
    t.end();
});

test('emit the select event', function(t, el) {
    var advanced = el.querySelector('.advanced-content'),
        selected = null,
        item = tabs(el);
    item.on('select', function(section) { selected = section; });
    item.select(1);
    t.equal(selected, advanced);
    t.end();
});

test('add the tabs-selected class', function(t, el) {
    var general = el.querySelector('.general-content'),
        generalHeader = el.querySelector('.general-header'),
        advanced = el.querySelector('.advanced-content'),
        advancedHeader = el.querySelector('.advanced-header'),
        item = tabs(el);

    // First section is automatically selected
    t.ok(classes(general).has('tabs-selected'));
    t.ok(classes(generalHeader).has('tabs-selected'));

    // Select another section
    item.select(advanced);
    t.ok(classes(advanced).has('tabs-selected'));
    t.ok(classes(advancedHeader).has('tabs-selected'));
    t.notOk(classes(general).has('tabs-selected'));
    t.notOk(classes(generalHeader).has('tabs-selected'));

    t.end();
});

test('select a section by clicking the header', function(t, el) {
    var advanced = el.querySelector('.advanced-content'),
        advancedHeader = el.querySelector('.advanced-header'),
        item = tabs(el);
    events(advancedHeader).trigger('click');
    t.equal(item.selected, advanced);
    t.end();
});
