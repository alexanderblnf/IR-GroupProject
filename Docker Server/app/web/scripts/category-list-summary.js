var list = {};
var response = {};

$(document).on('click', '#search-button', function () {
	var query = $('#query-input').val();
	query = checkQuery(query);

	$('#container').find('*').not('.spinner-div').remove();
	if (query !== null) {
        $('.spinner').show();
		var result = $.ajax({
			url: "/bing/search-category/" + query,
			type: "get"
		});

		result.done(function (res) {
            $('.spinner').hide();
			if (!started) {
				started = true;
				timer();
			}

			if (res.code !== 200) {
				console.log(result.response);
				return;
			}

			response = res.response;

			var container = document.getElementById('container');
			displayCategoryList(response, container, true, true, false);
		});

		result.fail(function (xhr, status, error) {
			console.log(xhr.responseText);
		});
	} else {
		var container = document.getElementById('container');
		displayCategoryList(response, container, true, true, false);
	}
});