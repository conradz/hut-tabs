'use strict';

var tabs = require('../'),
    events = require('chi-events'),
    document = window.document;

var myTabs = tabs(document.querySelector('#my-tabs'));

events(document.querySelector('#select-first')).on('click', function() {
    myTabs.select(0);
});

events(document.querySelector('#select-kittens')).on('click', function() {
    myTabs.select(document.querySelector('#kittens'));
});
