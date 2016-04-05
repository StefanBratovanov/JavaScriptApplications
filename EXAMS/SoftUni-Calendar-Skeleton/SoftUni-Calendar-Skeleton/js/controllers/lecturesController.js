var app = app || {};

app.lecturesController = (function () {
    function LecturesController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    LecturesController.prototype.loadAllLectures = function (selector) {
        var _this = this;

        this._model.getAllLectures()
            .then(function (successData) {
                var result = {
                    lectures: []
                };

                successData.forEach(function (lecture) {
                    result.lectures.push(lecture);
                });

                _this._viewBag.showAllLectures(selector, result.lectures);
            })
    };

    LecturesController.prototype.loadAddLecture = function (selector) {
        this._viewBag.showAddLecture(selector);
    };

    LecturesController.prototype.addLecture = function (data) {
        var _this = this;

        var lecture = {
            title: data.title,
            start: data.start,
            end: data.end,
            lecturer: sessionStorage['username']
        };

        _this._model.addNewLecture(lecture)
            .then(function () {
                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/calendar/list/'});
                });
                noty({
                    theme: 'relax',
                    text: 'Lecture added!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });
            })
    };

    LecturesController.prototype.loadEditLecture = function (selector, data) {
        this._viewBag.showEditLecture(selector, data);
    };

    LecturesController.prototype.editLecture = function (data) {
        data.lecturer = sessionStorage['username'];
        var lectureId = data.id;
        delete data.id;

        this._model.editLecture(lectureId, data)
            .then(function () {
                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/calendar/list/'});
                });
                noty({
                    theme: 'relax',
                    text: 'Lecture edited!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });
            })
    };


    LecturesController.prototype.loadDeleteLecture = function (selector, data) {
        this._viewBag.showDeleteLecture(selector, data);
    };

    LecturesController.prototype.deleteLecture = function (lectureId) {
        this._model.deleteLecture(lectureId)
            .then(function () {
                noty({
                    theme: 'relax',
                    text: 'Lecture deleted!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });

                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/calendar/list/'});
                })
            });
    };

    return {
        load: function (model, viewBag) {
            return new LecturesController(model, viewBag);
        }
    };
}());
