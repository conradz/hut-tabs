var test = require('tape'),
    tabs = require('./'),
    create = require('chi-create'),
    events = require('chi-events'),
    classes = require('chi-classes');

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

test('automatically select first tab', function(t) {
    var el = createStructure(),
        item = tabs(el);
    t.equal(item.selected.content, el.querySelector('.general-content'));
    t.equal(item.selected.header, el.querySelector('.general-header'));
    t.end();
});

test('select a section by DOM node', function(t) {
    var el = createStructure(),
        advanced = el.querySelector('.advanced-content'),
        advancedHeader = el.querySelector('.advanced-header'),
        item = tabs(el);
    item.select(advanced);
    t.equal(item.selected.content, advanced);
    t.equal(item.selected.header, advancedHeader);
    t.end();
});

test('select a section by index', function(t) {
    var el = createStructure(),
        advanced = el.querySelector('.advanced-content'),
        item = tabs(el);
    item.select(1);
    t.equal(item.selected.content, advanced);
    t.end();
});

test('emit the select event', function(t) {
    var el = createStructure(),
        advanced = el.querySelector('.advanced-content'),
        selected = null,
        item = tabs(el);
    item.on('select', function(section) { selected = section.content; });
    item.select(1);
    t.equal(selected, advanced);
    t.end();
});

test('add the tabs-selected class', function(t) {
    var el = createStructure(),
        general = el.querySelector('.general-content'),
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

test('select a section by clicking the header', function(t) {
    var el = createStructure(),
        advanced = el.querySelector('.advanced-content'),
        advancedHeader = el.querySelector('.advanced-header'),
        item = tabs(el);
    events(advancedHeader).trigger('click');
    t.equal(item.selected.content, advanced);
    t.end();
});
