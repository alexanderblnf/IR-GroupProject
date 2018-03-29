
$(document).ready(function () {
    $('.spinner').hide();
	var result = $.ajax({
		url: "/interaction/getNewTask",
		type: "get"
	});


	result.done(function (res) {
		if (res.code === 200) {
            $('#control-window').load('../controlWindow.html', function () {
                $('#task-content').text(res.response);
            });
		}
	});
});

$(document).on("keyup", '#query-input', function (event) {
	if(event.key !== "Enter") return; // Use `.key` instead.
	document.getElementById("search-button").click(); // Things you want to do.
	event.preventDefault(); // No need to `return false;`.
});

$(document).on('click', '#finish-button', function () {
    clicked ++;

    if (clicked <= 1) {
        var data = {
            click: linksClicked,
            hover: linksHovered,
            time: hours * 3600 + minutes * 60 + seconds,
            status: 1
        };

	    if (data.time === 0) {
	        $('#error-int').text('Try to find an answer before moving to the next task!');
	        $('.alert').show();
	        clicked = 0;
	        return;
        }
        var result = $.ajax({
            url: "/interaction/finish",
            type: "post",
            data: JSON.stringify(data),
            contentType: 'application/json'
        });

        result.done(function (res) {
            hours = 0; minutes = 0; seconds = 0;
            if (res.code === 200) {
                location.reload();
            } else {
                console.log(res.response);
            }
        });

        result.fail(function (xhr) {
            console.log(xhr.responseText);
        })
    }

});

$(document).on('click', '#abandon-button', function () {
    clicked ++;

    if (clicked <= 1) {
        var data = {
            click: linksClicked,
            hover: linksHovered,
            time: hours * 3600 + minutes * 60 + seconds,
            status: 0
        };

	    if (data.time === 0) {
		    $('#error-int').text('You will easily find an answer for your task! Don\'t give up yet!');
		    $('.alert').show();
		    clicked = 0;
		    return;
	    }

        var result = $.ajax({
            url: "/interaction/finish",
            type: "post",
            data: JSON.stringify(data),
            contentType: 'application/json'
        });

        result.done(function (res) {
            hours = 0; minutes = 0; seconds = 0;
            if (res.code === 200) {
                location.reload();
            } else {
                console.log(res.response);
            }
        });

        result.fail(function (xhr) {
            console.log(xhr.responseText);
        })
    }
});