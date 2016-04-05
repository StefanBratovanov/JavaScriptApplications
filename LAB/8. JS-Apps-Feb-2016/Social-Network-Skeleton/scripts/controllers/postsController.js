var app = app || {};

app.postsController = (function () {
    function PostsController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    //PostsController.prototype.loadHeader = function (selector) {
    //    this._viewBag.showHeader(selector);
    //};


    //PostsController.prototype.getAllPosts = function (selector) {
    //    var _this = this;
    //
    //    this._model.getAllPosts()
    //        .then(function (successData) {
    //            var result = {
    //                posts: []
    //            };
    //
    //            successData.forEach(function (post) {
    //                result.posts.push(new PostInputBindingModel(post._id, post.content));
    //            });
    //
    //            _this._viewBag.showAllPosts(selector, result);
    //        })
    //        .done();
    //};

    //QuestionController.prototype.addQuestion = function(data) {
    //    var _this = this;
    //
    //    var questionOutputModel = {
    //        title: data.title
    //    };
    //
    //    this._model.addQuestion(questionOutputModel)
    //        .then(function() {
    //            _this.getAllQuestions();
    //        })
    //};
    //
    return {
        load: function(model, viewBag) {
            return new PostsController(model, viewBag);
        }
    };
}());