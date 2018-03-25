var list = {};
var response = {};

$(document).on('click', '#search-button', function () {
	var query = $('#query-input').val();
	query = checkQuery(query);

	if (query !== null) {
		 var result = $.ajax({
			url: "/search/categories/" + query,
			type: "get"
		});

		result.done(function (res) {
			if (!started) {
				started = true;
				timer();
			}

			if (res.code !== 200) {
				return;
			}

			response = res.response;

			var container = document.getElementById('container');
			displayCategoryList(response, container, true, false, true);
		});


		result.fail(function (xhr, status, error) {
			console.log(xhr.responseText);
		});
	} else {
		var container = document.getElementById('container');
		displayCategoryList(response, container, true, false, true);
	}
});