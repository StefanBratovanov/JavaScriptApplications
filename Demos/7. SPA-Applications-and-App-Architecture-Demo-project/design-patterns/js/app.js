var app = app || {};

(function () {
    app.router = $.sammy(function () {
        var requester = app.requester.config('kid_-yLWl1ga0g', '3b5ebc0f78a74ab881fc409f68142ac1');
        var selector = '#wrapper';

        var userModel = app.userModel.load(requester);
        var questionModel = app.questionModel.load(requester);
        var answerModel = app.answerModel.load(requester);

        var userViewBag = app.userViews.load();
        var questionViewBag = app.questionViews.load();
        var answerViewBag = app.answerViews.load();
        var homeViewBag =app.homeViews.load();

        var userController = app.userController.load(userModel, userViewBag);
        var questionController = app.questionController.load(questionModel, questionViewBag);
        var answerController = app.answerController.load(answerModel, answerViewBag);
        var homeController = app.homeController.load(homeViewBag);


        this.before({except: {path: '#\/(register|login)?'}}, function () {
            var sessionId = sessionStorage['sessionAuth'];
            if (!sessionId) {
                this.redirect('#/login');
                return false;
            } else {
                this.redirect('#/questions');
            }
        });

        this.get('#/', function () {
            homeController.loadHomePage(selector);
        });

        this.get('#/login', function () {
            userController.loadLoginPage(selector);
        });

        this.get('#/questions', function () {
            questionController.getAllQuestions(selector);
        });

        this.get('#/logout', function () {
            var _this = this;
            userController.logout()
                .then(function() {
                    _this.redirect('#/');
                })
        });

        this.bind('redirectUrl', function(e, data) {
            this.redirect(data.url);
        });

        this.bind('login', function(e, data) {
            userController.login(data)
        });

        this.bind('get-answers', function (e, data) {
            answerController.getAllAnswersByQuestionId(data);
        });

        this.bind('add-answer', function (e, data) {
            answerController.addAnswer(data);
        });
    });

    app.router.run('#/');
}());

