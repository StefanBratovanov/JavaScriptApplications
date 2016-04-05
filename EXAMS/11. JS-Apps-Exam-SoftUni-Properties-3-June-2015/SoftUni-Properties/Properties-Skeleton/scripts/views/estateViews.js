var app = app || {};

app.estatesViews = (function () {

    function showAllEstates(selector, data) {
        $.get('templates/estates-list.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('.edit-button').on('click', function () {
                var estateId = $(this).parent().parent().attr('data-id');

                var estate = data.estates.filter(function (a) {
                    return a.id == estateId;
                });

                if (estate && estate[0].creator === sessionStorage['userId']) {
                    Sammy(function () {
                        this.trigger('showEditEstate', estate[0]);
                    })
                }
                else {
                    noty({
                        theme: 'relax',
                        text: 'You are not owner of this estate!!',
                        type: 'error',
                        timeout: 2000,
                        closeWith: ['click']
                    });
                }
            });

            $('.delete-button').on('click', function () {
                var estateId = $(this).parent().parent().attr('data-id');

                var estate = data.estates.filter(function (a) {
                    return a.id == estateId;
                });

                if (estate && estate[0].creator === sessionStorage['userId']) {
                    Sammy(function () {
                        this.trigger('showDeleteEstate', estate[0]);
                    })
                }
                else {
                    noty({
                        theme: 'relax',
                        text: 'You are not owner of this estate!!',
                        type: 'error',
                        timeout: 2000,
                        closeWith: ['click']
                    });
                }
            });

            $('#filter').click(function() {
                var name = $('#search-bar').val();
                var minPrice = $('#min-price').val();
                var maxPrice = $('#max-price').val();
                var category = $('#category').val();

                $.sammy(function() {
                    this.trigger('filterEstates', {name : name, minPrice : minPrice, maxPrice : maxPrice, category : category})
                })
            })
        })
    }

    function showAddEstate(selector) {
        $.get('templates/add-estate.html', function (templ) {
            $(selector).html(templ);

            $('#add-estate-button').on('click', function () {
                var name = $('#name').val(),
                    category = $('#category').val(),
                    price = $('#price').val();

                Sammy(function () {
                    this.trigger('addEstate', {name: name, category: category, price: price});
                })
            })
        })
    }

    function showEditEstate(selector, data) {
        $.get('templates/edit-estate.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('#edit-estate-button').on('click', function () {
                var name = $('#item-name').val(),
                    category = $('#category').val(),
                    price = $('#price').val(),
                    id = $(this).attr('data-id');

                Sammy(function () {
                    this.trigger('editEstate', {name: name, price: price, id: id, category: category});
                })
            })
        })
    }

    function showDeleteEstate(selector, data) {
        $.get('templates/delete-estate.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('#delete-estate-button').on('click', function () {
                var id = $(this).attr('data-id');

                Sammy(function () {
                    this.trigger('deleteEstate', {id: id});
                })
            })
        })
    }

    return {
        load: function () {
            return {
                showAllEstates: showAllEstates,
                showAddEstate: showAddEstate,
                showEditEstate: showEditEstate,
                showDeleteEstate: showDeleteEstate
            }
        }
    }
}());