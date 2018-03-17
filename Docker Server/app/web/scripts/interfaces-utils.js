function createList(list, appendTo, summary) {
	list.forEach(function (value) {
		// Page Title
		var h4 = document.createElement('h4');
		h4.className = 'margin-left-1';

		// Page link
		var a = document.createElement('a');
		a.href = value.url;
		a.target = "_blank";
		a.innerHTML = value.title;

		h4.appendChild(a);
		appendTo.appendChild(h4);

		// Used for summary
		if (summary) {
			var divInner = document.createElement('div');
			var span = document.createElement('span');
			span.innerHTML = "DESCRIERE URIASA";

			divInner.appendChild(span);
			appendTo.appendChild(divInner);
		}
	});
}

function displayCategoryList(response, container, summary) {
	var keys = Object.keys(response);

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
		createList(initialList, divPages, summary);

		div.appendChild(divPages);
		div.appendChild(document.createElement('hr'));
		container.appendChild(div);
	});

}

$(document).on('click', '.more-button', function () {
	var id = $(this).attr('id');
	var parent = $(this).closest('div').next('.pages');
	var parentId = parent.attr('id');
	var index = parentId.split('-')[1];

	$('#' + parentId).empty();

	document.getElementById(id).innerHTML = 'More(0)';
	createList(list[index], document.getElementById(parentId), false);
});