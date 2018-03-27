var tasks = ["Jaguar", "Motorola", "Apple",
	"Convolution", "Samsung", "Toyota", "Gradient"];

$(document).ready(function () {
	var result = $.ajax({
		url: "/interaction/getNewTask",
		type: "get"
	});

	$('#control-window').load('../controlWindow.html');

	result.done(function (res) {
		if (res.code === 200) {
			$('#task-content').text(res.response);
		}
	});
});

$(document).on("keyup", '#query-input', function (event) {
	if(event.key !== "Enter") return; // Use `.key` instead.
	document.getElementById("search-button").click(); // Things you want to do.
	event.preventDefault(); // No need to `return false;`.
});

$(document).on('click', '#finish-button', function () {
	var data = {
        click: linksClicked,
        hover: linksHovered,
        time: hours * 3600 + minutes * 60 + seconds,
        status: 1
    };
	var result = $.ajax({
		url: "/interaction/finish",
		type: "post",
		data: JSON.stringify(data),
        contentType: 'application/json'
	});

	result.done(function (res) {
		if (res.code === 200) {
            location.reload();
        } else {
			console.log(res.response);
		}
	});

	result.fail(function (xhr) {
		console.log(xhr.responseText);
	})
});

$(document).on('click', '#abandon-button', function () {
    var data = {
        click: linksClicked,
        hover: linksHovered,
        time: hours * 3600 + minutes * 60 + seconds,
        status: 0
    };
    var result = $.ajax({
        url: "/interaction/finish",
        type: "post",
        data: JSON.stringify(data),
        contentType: 'application/json'
    });

    result.done(function (res) {
        if (res.code === 200) {
            location.reload();
        } else {
            console.log(res.response);
        }
    });

    result.fail(function (xhr) {
        console.log(xhr.responseText);
    })
});