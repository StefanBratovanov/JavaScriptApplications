(function () {
    $('#button').on('click', function () {
        var userClassInput = $('#className').val(),
            userColorInput = $('#color').val(),
            selectedElements = $('.' + userClassInput);

        selectedElements.css('background-color', userColorInput);
    })
}());
