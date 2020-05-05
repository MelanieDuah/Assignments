$(document).ready(function () {

    var currentTime = moment().format('[Today],LLLL');
    $('#currentDay').html(currentTime);

    var currentHour = parseInt(moment().format('H'));

    $('.time').each(function () {

        var timeBlockValue = parseInt($(this).attr('data-Time'));

        var existingDescription = localStorage.getItem(timeBlockValue);

        var descriptionColumn = $(this).next();
        var descriptionInput = $(descriptionColumn).children().first();

        $(descriptionInput).val(existingDescription);

        if (timeBlockValue < currentHour) {
            $(this).next().addClass('past');
        }
        else if (timeBlockValue == currentHour) {
            $(this).next().addClass('present');
        }
        else {
            $(this).next().addClass('future');
        }
    });

    $(".saveButton").on('click', function () {

        var columns = $(this).parents('tr').children();
        var time = $(columns[0]).attr('data-Time');

        if (parseInt(time) < currentHour) {
            alert("Your event should be in the present or future");
            $(columns[1].firstChild).val('');
        } else {
            var description = $(columns[1].firstChild).val();
            localStorage.setItem(time, description);
        }

    });


});