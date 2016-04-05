var app = app || {};

(function () {
    app.router = Sammy(function () {
        var selector = $('h2');

        this.get('#/', function () {
            selector.html('Click on your favourite whiskey');
        });

        this.get('#/:name', function () {
            selector.html('Hello, ' + this.params['name'] + '. Nice choice!');
        });
    });

    app.router.run('#/');
}());