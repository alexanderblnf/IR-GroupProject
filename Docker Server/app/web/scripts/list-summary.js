$(document).on('click', '#search-button', function () {
	var query = $('#query-input').val();
	var response = $.ajax({
		url: "/search/basic/" + query,
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

		response.forEach(function (val, index) {
			var div = document.createElement('div');
			//div.className = 'box';

			var h3 = document.createElement('h3');

			var a = document.createElement('a');
			a.href = val.url;
			a.target = "_blank";
			a.innerHTML = val.title;
			// a.className = 'a-title';

			var divInner = document.createElement('div');

			var span = document.createElement('span');
			span.innerHTML = "DESCRIERE URIASA";

			divInner.appendChild(span);
			h3.appendChild(a);
			div.appendChild(h3);
			div.appendChild(divInner);
			container.appendChild(div);
		});
	});

	response.fail(function (xhr, status, error) {
		console.log(xhr.responseText);
	});

});