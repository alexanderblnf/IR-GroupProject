function createListInCategory(list, appendTo) {
	list.forEach(function (value) {
		// Page Title
		var h4 = document.createElement('h4');
		h4.className = 'margin-top-1';

		// Page link
		var a = document.createElement('a');
		a.href = value.url;
		a.target = "_blank";
		a.innerHTML = value.title;

		h4.appendChild(a);
		appendTo.appendChild(h4);

		// Used for summary
		var divInner = document.createElement('div');
		var span = document.createElement('span');
		span.innerHTML = "DESCRIERE URIASA";

		divInner.appendChild(span);
		appendTo.appendChild(divInner);

	});
}

function createList(list, container, hascategory){
	list.forEach(function (val, index) {
		var div = document.createElement('div');

		// Page title
		var h3 = document.createElement('h3');
		div.appendChild(h3);

		// Page link
		var a = document.createElement('a');
		a.href = val.url;
		a.target = "_blank";
		a.innerHTML = val.title;
		h3.appendChild(a);

		// Category
		if (hascategory) {
			var h4 = document.createElement('h4');
			h4.className = 'category';
			h4.innerHTML = "Category: " + val.category;
			div.appendChild(h4);
		}

		// Description
		var divInner = document.createElement('div');
		div.appendChild(divInner);

		var span = document.createElement('span');
		span.innerHTML = "DESCRIERE URIASA";
		divInner.appendChild(span);

		container.appendChild(div);
	});
}

function displayCategoryList(response, container, hasCategory, hasList) {
	var keys = Object.keys(response);

	keys.forEach(function (category, index) {
		list[index] = response[category];
		var leftFromList = list[index].length;
		var innerHTML = 'Show(' + leftFromList + ')';

		if (hasList) {
			var initialList = list[index].slice(0, 3);
			leftFromList = list[index].length - initialList.length;
			innerHTML = 'More(' + leftFromList + ')';
		}
		var div = document.createElement('div');

		// Category
		var divCategory = document.createElement('div');
		divCategory.className = 'align-heading';

		// Category name
		if (hasCategory) {
			var h2 = document.createElement('h2');
			h2.innerHTML = category;
			divCategory.appendChild(h2);
		}

		// Subcategory button
		var subcategory = document.createElement('button');
		subcategory.type = 'button';
		subcategory.id = 'subcategory-' + index;
		subcategory.innerHTML = 'Subcategory';

		// More button
		var more = document.createElement('button');
		more.type = 'button';
		more.id = 'more-' + index;
		more.className = 'more-button-cat';
		more.innerHTML = innerHTML;

		divCategory.appendChild(subcategory);
		divCategory.appendChild(more);
		div.appendChild(divCategory);

		// List of pages
		var divPages = document.createElement('div');
		divPages.id = 'pages-' + index;
		divPages.className = 'pages margin-left-1';

		if(hasList) {
			createListInCategory(initialList, divPages);
		}

		div.appendChild(divPages);
		div.appendChild(document.createElement('hr'));
		container.appendChild(div);
	});

}

function createListTooltip(list, divPages) {
	list.forEach(function (value, index) {
		var divInner = document.createElement('div');
		divInner.className = 'tooltip-class';
		var tooltip = createTooltip(value);

		divInner.appendChild(tooltip);
		divPages.appendChild(divInner);
	});

	$('[data-toggle="tooltip"]').tooltip();
}

$(document).on('click', '.more-button-cat', function () {
	var id = $(this).attr('id');
	var parent = $(this).closest('div').next('.pages');
	var nextClass = parent.find(">:first-child").attr('class');

	var parentId = parent.attr('id');
	var index = parentId.split('-')[1];

	$('#' + parentId).empty();

	document.getElementById(id).innerHTML = 'More(0)';

	if (nextClass == 'tooltip-class') {
		createListTooltip(list[index], document.getElementById(parentId));
	} else {
		createListInCategory(list[index], document.getElementById(parentId), false);
	}
});

$(document).on('click', '.more-button-list', function () {
	var id = $(this).attr('id');
	var next = $('#page-container').find(">:first-child");
	var nextClass = next.attr('class');
	var after = next.find('h4').attr('class');

	$('#page-container').empty();
	document.getElementById('more-button').innerHTML = 'More(' + 0 + ')';

	if (nextClass === 'tooltip-class') {
		createListTooltip(list, document.getElementById('page-container'));
	} else if (after !== undefined) {
		createList(list, document.getElementById('page-container'), true);
	} else {
		createList(list, document.getElementById('page-container'), false);
	}
});


