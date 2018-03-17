var list = {};

$(document).on('click', '#search-button', function () {
	if (!started) {
		started = true;
		timer();
	}

	var query = $('#query-input').val();
	var response = $.ajax({
		url: "/search/categories/" + query,
		type: "get"
	});

	response.done(function (res) {
		if (res.code !== 200) {
			return;
		}

		var response = res.response;
		var keys = Object.keys(response);
		var container = document.getElementById('container');

		displayCategoryList(response, container, true, false);
	});

	response.fail(function (xhr, status, error) {
		console.log(xhr.responseText);
	});

});