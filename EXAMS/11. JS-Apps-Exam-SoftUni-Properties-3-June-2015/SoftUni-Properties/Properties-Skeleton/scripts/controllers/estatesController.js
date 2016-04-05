var app = app || {};

app.estatesController = (function () {
    function EstatesController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    EstatesController.prototype.loadAllEstates = function (selector) {
        var _this = this;

        this._model.getAllEstates()
            .then(function (successData) {
                var result = {
                    estates: []
                };

                successData.forEach(function (estate) {
                    result.estates.push({
                        name: estate.name,
                        category: estate.category["_obj"].type,
                        price: estate.price,
                        id: estate._id,
                        creator: estate._acl.creator
                    });
                });

                //console.log(result.estates);

                _this._viewBag.showAllEstates(selector, result);
            })
    };

    EstatesController.prototype.loadAddEstate = function (selector) {
        this._viewBag.showAddEstate(selector);
    };

    EstatesController.prototype.addEstate = function (data) {
        var _this = this;

        this._model.getCategoryByName(data.category)
            .then(function (cat) {
                //console.log(catId);
                var estate = {
                    name: data.name,
                    price: Number(data.price),
                    category: {
                        _type: 'KinveyRef',
                        _id: cat[0]._id,
                        _collection: 'categories'
                    }
                };

                noty({
                    theme: 'relax',
                    text: 'Estate added!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });

                _this._model.addNewEstate(estate)
                    .then(function () {
                        Sammy(function () {
                            this.trigger('redirectUrl', {url: '#/estates/list'});
                        })
                    })
            });

    };

    EstatesController.prototype.loadEditEstate = function (selector, data) {
        this._viewBag.showEditEstate(selector, data);
    };

    EstatesController.prototype.editEstate = function (data) {
        var _this = this;

        this._model.getCategoryByName(data.category)
            .then(function (cat) {
                var estate = {
                    name: data.name,
                    price: Number(data.price),
                    category: {
                        _type: 'KinveyRef',
                        _id: cat[0]._id,
                        _collection: 'categories'
                    }
                };

                noty({
                    theme: 'relax',
                    text: 'Estate added!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });

                var estateId = data.id;

                _this._model.editEstate(estateId, estate)

            });
    };

    EstatesController.prototype.loadDeleteEstate = function (selector, data) {
        this._viewBag.showDeleteEstate(selector, data);
    };

    EstatesController.prototype.deleteEstate = function (estateId) {
        this._model.deleteEstate(estateId)
            .then(function () {
                noty({
                    theme: 'relax',
                    text: 'Estate deleted!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });

                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/estates/list'});
                })
            });

    };

    EstatesController.prototype.filterEstates = function (selector, data) {
        var _this = this;
        var catId = null;

        if (data.category !== 'All') {
            this._model.getCategoryByName(data.category)
                .then(function (cat) {
                    catId = cat[0]._id;
                    _this._model.filterEstates(Number(data.minPrice), Number(data.maxPrice), catId)
                        .then(function (estatesData) {
                            var result = {
                                estates: []
                            };

                            estatesData.forEach(function (estate) {
                                result.estates.push({
                                    name: estate.name,
                                    category: cat[0].type,
                                    price: estate.price
                                });
                            });

                            _this._viewBag.showAllEstates(selector, result);
                        });
                });
        }
        else {
            this._model.filterEstates(Number(data.minPrice), Number(data.maxPrice))
                .then(function (estatesData) {
                    var result = {
                        estates: []
                    };

                    estatesData.forEach(function (estate) {
                        result.estates.push({
                            name: estate.name,
                            category: data.category,
                            price: estate.price
                        });
                    });

                    console.log(result);
                    _this._viewBag.showAllEstates(selector, result);
                });
        }
    };

    return {
        load: function (model, viewBag) {
            return new EstatesController(model, viewBag);
        }
    };
}());


//EstatesController.prototype.editEstate = function (data) {
//    var estateId = data.id;
//    delete data.id;
//    this._model.editEstate(estateId, data)
//        .then(function () {
//            Sammy(function () {
//                this.trigger('redirectUrl', {url: '#/estates/list'});
//            })
//        })
//};


//else {
//    this._model.filterEstates(Number(data.minPrice), Number(data.maxPrice))
//        .then(function (estatesData) {
//            var result = {
//                estates: []
//            };
//
//            estatesData.forEach(function (estate) {
//                var catId = estate.category["_id"];
//                _this._model.getCategoryById(catId)
//                    .then(function (data) {
//                        result.estates.push({
//                            name: estate.name,
//                            category: data.type,
//                            price: estate.price
//                        });
//                    })
//            });
//
//            console.log(result);
//            _this._viewBag.showAllEstates(selector, result);
//        });
//}