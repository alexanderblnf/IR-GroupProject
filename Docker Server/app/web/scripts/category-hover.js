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
		var keys = Object.keys(response);
		var container = document.getElementById('container');

		keys.forEach(function (val, index) {
			var list = response[val];
			var div = document.createElement('div');

			var h2 = document.createElement('h2');
			h2.innerHTML = val;
			div.appendChild(h2);

			list.forEach(function (value, index) {
				var divInner = document.createElement('div');
                var tooltip = createTooltip(value);

				divInner.appendChild(tooltip);
				div.appendChild(divInner);
			});

			var hr = document.createElement('hr');
			div.appendChild(hr);

			container.appendChild(div);
		});

        $('[data-toggle="tooltip"]').tooltip();
	});


	response.fail(function (xhr, status, error) {
		console.log(xhr.responseText);
	});

});