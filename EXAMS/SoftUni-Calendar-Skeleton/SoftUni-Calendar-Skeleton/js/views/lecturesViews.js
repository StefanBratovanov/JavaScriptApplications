var app = app || {};

app.lecturesViews = (function () {
    function showAllLectures(selector, data) {
        $.get('templates/calendar.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            window.location.assign("#/calendar/add/")
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    //console.log(calEvent);
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);

                        $('#editLecture').on('click', function () {

                            var lectureId = calEvent._id;

                            var lecture = data.filter(function (a) {
                                return a._id == lectureId;
                            });

                            if (lecture && lecture[0]._acl.creator === sessionStorage['userId']) {
                                Sammy(function () {
                                    this.trigger('showEditLecture', calEvent);
                                });
                            }
                            else {
                                Sammy(function () {
                                    window.location.assign("#/home/")
                                });
                                noty({
                                    theme: 'relax',
                                    text: 'You are not owner of this lecture!!',
                                    type: 'error',
                                    timeout: 2000,
                                    closeWith: ['click']
                                });

                            }

                        });
                        $('#deleteLecture').on('click', function () {
                            var lectureId = calEvent._id;

                            var lecture = data.filter(function (a) {
                                return a._id == lectureId;
                            });

                            if (lecture && lecture[0]._acl.creator === sessionStorage['userId']) {
                                Sammy(function () {
                                    this.trigger('showDeleteLecture', calEvent);
                                });
                            }
                            else {
                                Sammy(function () {
                                    window.location.assign("#/home/")
                                });
                                noty({
                                    theme: 'relax',
                                    text: 'You are not owner of this lecture!!',
                                    type: 'error',
                                    timeout: 2000,
                                    closeWith: ['click']
                                });

                            }

                        })
                    });
                    $('#events-modal').modal();
                }
            });

        })
    }

    function showAddLecture(selector) {
        $.get('templates/add-lecture.html', function (templ) {
            $(selector).html(templ);

            $('#addLecture').on('click', function () {
                var title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val();

                Sammy(function () {
                    this.trigger('addLecture', {title: title, start: start, end: end});
                })
            })
        })
    }

    function showEditLecture(selector, data) {
        $.get('templates/edit-lecture.html', function (templ) {
            $(".modal-backdrop").remove();
            //console.log(data);
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('#editLecture').on('click', function () {
                var title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val(),
                    id = data._id;

                Sammy(function () {
                    this.trigger('editLecture', {title: title, start: start, end: end, id: id});
                })
            })
        })
    }

    function showDeleteLecture(selector, data) {
        $.get('templates/delete-lecture.html', function (templ) {
            $(".modal-backdrop").remove();
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('#deleteLecture').on('click', function () {
                var id = data._id;

                Sammy(function () {
                    this.trigger('deleteLecture', {id: id});
                })
            })
        })
    }

    return {
        load: function () {
            return {
                showAllLectures: showAllLectures,
                showAddLecture: showAddLecture,
                showEditLecture: showEditLecture,
                showDeleteLecture: showDeleteLecture
            }
        }
    }
}());