var app = app || {};

app.estateModel = (function () {
    function EstateModel(requester) {
        this._requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/estates';
        this.categorySearchUrl = requester.baseUrl + 'appdata/' + requester.appId + '/categories';
    }

    EstateModel.prototype.getAllEstates = function () {
        var requestUrl = this.serviceUrl + '?resolve=category';
        return this._requester.get(requestUrl, true);
    };

    EstateModel.prototype.addNewEstate = function (data) {
        return this._requester.post(this.serviceUrl, data, true);
    };

    EstateModel.prototype.getCategoryByName = function (categoryName) {
        var requestUrl = this.categorySearchUrl + '/?query={"type":"' + categoryName + '"}';
        return this._requester.get(requestUrl, true);
    };

    EstateModel.prototype.getCategoryById = function (id) {
        var requestUrl = this.categorySearchUrl + '/' + id;
        return this._requester.get(requestUrl, true);
    };

    EstateModel.prototype.editEstate = function (estateId, data) {
        var requestUrl = this.serviceUrl + "/" + estateId;
        return this._requester.put(requestUrl, data, true);
    };

    EstateModel.prototype.deleteEstate = function (estateId) {
        var requestUrl = this.serviceUrl + "/" + estateId;
        return this._requester.delete(requestUrl, true);
    };

    EstateModel.prototype.filterEstates = function (minPrice, maxPrice, categoryId) {
        var requestUrl = this.serviceUrl;
        if (minPrice || maxPrice || categoryId) {
            requestUrl += '/?query=';
            var objQuery = {};
            if (minPrice || maxPrice) {
                objQuery.price = {
                    $gte: minPrice,
                    $lte: maxPrice
                };
            }

            if (categoryId) {
                objQuery["category._id"] = categoryId
            }
            return this._requester.get(requestUrl + JSON.stringify(objQuery), true);
        }

    };


    return {
        load: function (requester) {
            return new EstateModel(requester);
        }
    }
}());

//EstateModel.prototype.getAllEstates = function () {
//    return this._requester.get(this.serviceUrl, true);
//};

//EstatesController.prototype.loadAllEstates = function (selector) {
//    var _this = this;
//
//    this._model.getAllEstates()
//        .then(function (successData) {
//            var result = {
//                estates: []
//            };
//
//            successData.forEach(function (estate) {
//                result.estates.push({
//                    name: estate.name, category: estate.category, price: estate.price
//                });
//            });
//
//            _this._viewBag.showAllEstates(selector, result);
//        })
//};