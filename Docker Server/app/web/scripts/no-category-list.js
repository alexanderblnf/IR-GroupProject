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
		console.log(res);
		var result = res;
		if (result.code !== 200) {
			console.log(result.response);
			return;
		}

		var response = result.response;
		var container = document.getElementById('container');

		displayCategoryList(response, container, false, true, false);
	});

	response.fail(function (xhr, status, error) {
		console.log(xhr.responseText);
	});

});