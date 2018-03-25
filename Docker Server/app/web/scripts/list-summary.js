var list = [];

$(document).on('click', '#search-button', function () {
	var query = $('#query-input').val();
	query = checkQuery(query);

	if (query !== null) {
		var response = $.ajax({
			url: "/search/basic/" + query,
			type: "get"
		});

		response.done(function (res) {
			if (!started) {
				started = true;
				timer();
			}

			if (res.code !== 200) {
				return;
			}

			list = res.response;

			computeList();
		});

		response.fail(function (xhr, status, error) {
			console.log(xhr.responseText);
		});
	} else {
		computeList();
	}

});

function computeList() {
	var initialList = list.slice(0, 20);
	var leftFromList = list.length - initialList.length;
	var innerHTML = 'More(' + leftFromList + ')';
	var container = document.getElementById('container');
	container.className = 'margin-left-3';

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
	container.appendChild(divCategory);

	var pageContainer = document.createElement('div');
	pageContainer.id = 'page-container';
	pageContainer.className = 'margin-left-2';

	createList(initialList, pageContainer, false);
	container.appendChild(pageContainer);
}