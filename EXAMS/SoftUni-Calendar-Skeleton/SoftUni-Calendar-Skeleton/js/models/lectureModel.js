var app = app || {};

app.lectureModel = (function () {
    function LectureModel(requester) {
        this._requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/lectures';
    }

    LectureModel.prototype.getAllLectures = function () {
        var requestUrl = this.serviceUrl;
        return this._requester.get(requestUrl, true);
    };

    LectureModel.prototype.addNewLecture = function (data) {
        return this._requester.post(this.serviceUrl, data, true);
    };

    LectureModel.prototype.editLecture = function (lectureId, data) {
        var requestUrl = this.serviceUrl + "/" + lectureId;
        return this._requester.put(requestUrl, data, true);
    };

    LectureModel.prototype.deleteLecture = function (lectureId) {
        var requestUrl = this.serviceUrl + "/" + lectureId;
        return this._requester.delete(requestUrl, true);
    };

    return {
        load: function (requester) {
            return new LectureModel(requester);
        }
    }
}());

