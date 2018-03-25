var tasks = ["Jaguar", "Motorola", "Apple",
	"Convolution", "Samsung", "Toyota", "Gradient"];

$(document).ready(function () {
	var result = $.ajax({
		url: "/interaction/getNewTask/2",
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
	var result = $.ajax({
		url: "url/success",
		type: "post"
	});

	result.done(function (res) {
		$('#task-content').text(res);
	});

	result.fail(function (xhr) {
		console.log(xhr.responseText);
	})
});

$(document).on('click', '#abandon-button', function () {
	var result = $.ajax({
		url: "url/fail",
		type: "post"
	});

	result.done(function (res) {
		$('#task-content').text(res);
	});

	result.fail(function (xhr) {
		console.log(xhr.responseText);
	})
});