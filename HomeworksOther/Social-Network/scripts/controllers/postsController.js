var app = app || {};

app.postsController = (function () {
    function PostsController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    PostsController.prototype.getAllPosts = function(selector) {
        var _this = this;

        this._model.getAllPosts()
            .then(function (posts) {
                var result = {
                    posts: []
                };

                posts.forEach(function (post) {
                    result.posts.push(new Post(
                        post.content,
                        post.authorId,
                        post._id));
                });

                _this._viewBag.showPostsPage(selector, result);
            }).done();
    };


    PostsController.prototype.getPostById = function(selector, data) {
        var _this = this;

        this._model.getPostById(data._id)
            .then(function (posts) {
                var result = {
                    posts: []
                };

                posts.forEach(function (post) {
                    result.posts.push(new Post(
                        post.content,
                        post.authorId,
                        post._id));
                });

                _this._viewBag.showPostsPage(selector, result);
            }).done();
    };

    PostsController.prototype.addPost = function(data) {
        var _this = this;
        var post = {
            content: data.url,
            author: {
                _type: 'KinveyRef',
                _id: sessionStorage.userId,
                _collection: 'users'
            }
        };

        this._model.addPost(post)
            .then(function() {
                //reload page with all books after added new one
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/Posts'});
                })
            })
    };


    return {
        load: function (model, viewBag, router) {
            return new PostsController(model, viewBag, router);
        }
    }
}());
