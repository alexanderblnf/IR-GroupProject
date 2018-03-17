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
			console.log(result.response);
			return;
		}

		var response = res.response;
		var container = document.getElementById('container');

		displayCategoryList(response, container, true, true);
	});

	response.fail(function (xhr, status, error) {
		console.log(xhr.responseText);
	});

});