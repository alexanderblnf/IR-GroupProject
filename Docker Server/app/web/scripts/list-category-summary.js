var list = [];

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
		if (res.code !== 200) {
			return;
		}

		list = res.response;
		var initialList = list.slice(0, 20);
		var leftFromList = list.length - initialList.length;
		var innerHTML = 'More(' + leftFromList + ')';
		var container = document.getElementById('container');

		// More button
		var more = document.createElement('button');
		more.type = 'button';
		more.id = 'more-button';
		more.className = 'more-button-list';
		more.innerHTML = innerHTML;
		container.appendChild(more);

		var pageContainer = document.createElement('div');
		pageContainer.id = 'page-container';
		pageContainer.className = 'margin-left-3';

		createList(initialList, pageContainer, true);
		container.appendChild(pageContainer);
	});

	response.fail(function (xhr, status, error) {
		console.log(xhr.responseText);
	});

});