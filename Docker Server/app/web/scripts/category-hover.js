var list = {};

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
		if (res.code !== 200) {
			return;
		}

		var response = res.response;
		var keys = Object.keys(response);
		var container = document.getElementById('container');

		keys.forEach(function (category, index) {
			list[index] = response[category];
			var initialList = list[index].slice(0, 3);
			var leftFromList = list[index].length - initialList.length;
			var div = document.createElement('div');

			// Category
			var divCategory = document.createElement('div');
			divCategory.className = 'align-heading';

			// Category name
			var h2 = document.createElement('h2');
			h2.innerHTML = category;

			// Subcategory
			var subcategory = document.createElement('button');
			subcategory.type = 'button';
			subcategory.id = 'subcategory-' + index;
			subcategory.innerHTML = 'Subcategory';

			// More
			var more = document.createElement('button');
			more.type = 'button';
			more.id = 'more-' + index;
			more.className = 'more-button';
			more.innerHTML = 'More(' + leftFromList + ')';

			divCategory.appendChild(h2);
			divCategory.appendChild(subcategory);
			divCategory.appendChild(more);
			div.appendChild(divCategory);

			// List of pages
			var divPages = document.createElement('div');
			divPages.id = 'pages-' + index;
			divPages.className = 'pages';

			initialList.forEach(function (value, index) {
				var divInner = document.createElement('div');
				var tooltip = createTooltip(value);

				divInner.appendChild(tooltip);
				div.appendChild(divInner);
			});
			div.appendChild(divPages);
			div.appendChild(document.createElement('hr'));
			container.appendChild(div);
		});

        $('[data-toggle="tooltip"]').tooltip();
	});


	response.fail(function (xhr, status, error) {
		console.log(xhr.responseText);
	});
});