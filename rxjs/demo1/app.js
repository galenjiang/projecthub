'use strict';

// setp1
const $input = $('#input');
const $results = $('#results');

/* Only get the value from each key up */
var keyups = Rx.Observable.fromEvent($input, 'keyup')
    .pluck('target', 'value')
    .filter(text => text.length > 2);

/* Now debounce the input for 500ms */
var debounced = keyups
    .debounce(500 /* ms */ );

/* Now get only distinct values, so we eliminate the arrows and other control characters */
var distinct = debounced
    .distinctUntilChanged();


// setp2
function searchWikipedia(term) {
    return $.ajax({
        url: 'https://en.wikipedia.org/w/api.php',
        dataType: 'jsonp',
        data: {
            action: 'opensearch',
            format: 'json',
            search: term
        }
    }).promise();
}

// setp3
var suggestions = distinct
    .flatMapLatest(searchWikipedia);

// setp4
suggestions.subscribe(
    data => {
        $results
            .empty()
            .append($.map(data[1], value => $('<li>').text(value)))
    },
    error => {
        $results
            .empty()
            .append($('<li>'))
            .text('Error:' + error);
    });
