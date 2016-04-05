(function () {
    var inputData = {
        'data': [
            {
                name: 'Minka The Blow',
                jobTitle: 'pornstar',
                website: 'http://minkablow.com'
            },
            {
                name: 'Oliver Stone',
                jobTitle: 'director',
                website: 'http://stoned.com'
            },
            {
                name: 'Garry Finch',
                jobTitle: 'operator',
                website: 'http://garyGaaaaaaaryGary.com'
            }
        ]
    };

    $.get('tableTemplate.html', function (template) {
        var outputHtml = Mustache.render(template, inputData);
        $('#wrapper').html(outputHtml)
    })
}());
