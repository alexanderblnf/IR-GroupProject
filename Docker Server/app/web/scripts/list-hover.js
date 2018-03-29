var list = [];

$(document).on('click', '#search-button', function () {
	var query = $('#query-input').val();
	query = checkQuery(query);

	$('#container').find('*').not('.spinner-div').remove();
	if (query !== null) {
        $('.spinner').show();
		var response = $.ajax({
			url: "/bing/search-list/" + query,
			type: "get"
		});

		response.done(function (res) {
            $('.spinner').hide();
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
		trigger: 'hover'
	});
}
