var app = app || {};

app.answerController = (function () {
    function AnswerController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    AnswerController.prototype.getAllAnswersByQuestionId = function(data) {
        var _this = this;

        this._model.getAllAnswersByQuestionId(data.questionId)
            .then(function (answers) {
                var result = {
                    answers: []
                };

                answers.forEach(function (answer) {
                    result.answers.push(new AnswerInputModel(answer._id, answer.content, answer.question._id));
                });

                _this._viewBag.showAnswers(data.parent, result);
            }).done();
    };

    AnswerController.prototype.addAnswer = function(data) {
        var _this = this;
        var answerOutputModel = {
            content: data.content,
            question: {
                _type: 'KinveyRef',
                _id: data.questionId,
                _collection: 'questions'
            }
        };

        this._model.addAnswer(answerOutputModel)
            .then(function() {
                _this.getAllAnswersByQuestionId(data);
            })
    };

    return {
        load: function (model, viewBag, router) {
            return new AnswerController(model, viewBag, router);
        }
    }
}());