$(document).on('click', '#search-button', function () {
	if (!started) {
		started = true;
		timer();
	}

	var query = $('#query-input').val();
	var response = $.ajax({
		url: "/search/basic/" + query,
		type: "get"
	});

	response.done(function (res) {
		var result = res;
		if (result.code !== 200) {
			console.log(result.response);
			return;
		}

		var response = result.response;
		var container = document.getElementById('container');

		response.forEach(function (val, index) {
			var div = document.createElement('div');
			//div.className = 'box';

			// Used for summary
			var tooltip = createTooltip(val);
			div.appendChild(tooltip);
			container.appendChild(div);
		});

        $('[data-toggle="tooltip"]').tooltip();
	});

	response.fail(function (xhr, status, error) {
		console.log(xhr.responseText);
	});

});