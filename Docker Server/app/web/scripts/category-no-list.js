$(document).on('click', '#search-button', function () {
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

		keys.forEach(function (category) {
			var list = response[category];
			console.log(list);
			var div = document.createElement('div');

			// category
			var h2 = document.createElement('h2');
			h2.innerHTML = category;
			div.appendChild(h2);

			list.forEach(function (value) {
				// Page
				var h4 = document.createElement('h4');
				// Link
				var a = document.createElement('a');
				a.href = value.url;
				a.target = "_blank";
				a.innerHTML = value.title;

				// Summary
				var divInner = document.createElement('div');
				var span = document.createElement('span');
				span.innerHTML = "DESCRIERE URIASA";

				div.appendChild(h4);
				h4.appendChild(a);
				div.appendChild(divInner);
				divInner.appendChild(span);
			});
			// Line break to separate categories
			var hr = document.createElement('hr');
			div.appendChild(hr);

			container.appendChild(div);
		});
	});

	response.fail(function (xhr, status, error) {
		console.log(xhr.responseText);
	});

});