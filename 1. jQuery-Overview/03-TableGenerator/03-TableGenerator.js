(function () {
    $('#button').on('click', function () {
        var userInput = $('#table-input').val(),
            tableObj = $.parseJSON(userInput);
        //console.log(tableObj);

        var table = $('<table>');
        var tH = Object.keys(tableObj[0]);

        tH.forEach(function (element) {
            table.append($('<th/>')
                .text(element)
                .css('textTransform', 'capitalize')
                .css('background-color', "green")
            );
        });

        $.each(tableObj, function (index, row) {
            var tr = $('<tr/>');

            $.each(row, function (key, value) {
                tr.append($('<td/>')
                    .text(value))
            });

            table.append(tr)
        });

        table
            .attr('border',1)
            .css('border-collapse', 'collapse')
        table.appendTo($('#tableDiv'))
    })
}());

//[{"manufacturer":"BMW","model":"E92 320i","year":2011,"price":50000,"class":"Family"},{"manufacturer":"Porsche","model":"Panamera","year":2012,"price":100000,"class":"Sport"},{"manufacturer":"Peugeot","model":"305","year":1978,"price":1000,"class":"Family"}]
