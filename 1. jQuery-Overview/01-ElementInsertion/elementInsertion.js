(function () {
    $('#btn-after, #btn-before').click(function () {
        var current = $('#current-element');
        var tagType = $('#tagType').val();

        var tag = $('<' + tagType + '>');

        if (this.id === "btn-after") {
            tag.text('new shit after').appendTo(current);
        }

        if (this.id === "btn-before") {
            tag.text('new shit after').prependTo(current);
        }
    });
})();
