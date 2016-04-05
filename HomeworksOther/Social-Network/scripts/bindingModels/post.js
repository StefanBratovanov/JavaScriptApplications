var Post = (function() {
    function Post (content, authorId, id) {
        this.content = content;
        this.authorId = authorId;
        this._id = id;
    }

    return Post
}());