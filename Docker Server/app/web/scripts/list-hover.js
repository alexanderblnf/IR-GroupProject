list = [];

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
		container.className = 'margin-left-3';
		var div = document.createElement('div');

		// Category
		var divCategory = document.createElement('div');
		divCategory.className = 'align-heading margin-bottom-1';

		// More button
		var more = document.createElement('button');
		more.type = 'button';
		more.id = 'more-button';
		more.className = 'btn btn-outline-primary more-button-list';
		more.innerHTML = innerHTML;

		divCategory.appendChild(more);
		div.appendChild(divCategory);

		var pageContainer = document.createElement('div');
		pageContainer.id = 'page-container';
		pageContainer.className = 'margin-left-2';

		createListTooltip(initialList, pageContainer);

		div.appendChild(pageContainer);
		container.appendChild(div);

		$('[data-toggle="tooltip"]').tooltip({
			trigger : 'hover'
		});
	});

	response.fail(function (xhr, status, error) {
		console.log(xhr.responseText);
	});

});