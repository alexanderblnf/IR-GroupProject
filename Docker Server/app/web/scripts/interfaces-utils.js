function createListInCategory(list, appendTo) {
	list.forEach(function (value) {
		// Page Title
		var h5   = document.createElement('h5');
		h5.className = 'margin-top-1';

		// Page link
		var a = document.createElement('a');
		a.href = value.url;
		a.target = "_blank";
		a.innerHTML = value.title;

		appendTo.appendChild(h5);
		h5.appendChild(a);

		// Used for summary
		var divInner = document.createElement('div');
		var p = document.createElement('p');
		p.innerHTML = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.";
		divInner.appendChild(p);
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

function displayCategoryList(response, container, hasCategory, hasList, isTooltip) {
	var keys = Object.keys(response);

	keys.forEach(function (category, index) {
		list[index] = response[category];
		var initialList = list[index].slice(0, 3);
		var leftFromList = list[index].length - initialList.length;
		var innerHTML = 'More(' + leftFromList + ')';
		var div = document.createElement('div');

		if (!hasList && !isTooltip) {
			innerHTML = 'Show(' + list[index].length + ')';
		}

		// Category
		var divCategory = document.createElement('div');
		divCategory.className = 'align-heading margin-bottom-1';

		// Category name
		if (hasCategory) {
			var h4 = document.createElement('h4');
			h4.innerHTML = category;
			h4.className = 'vertical-align';
			divCategory.appendChild(h4);
		}

		// Subcategory button
		var subcategory = document.createElement('button');
		subcategory.type = 'button';
		subcategory.className = 'btn btn-outline-primary';
		subcategory.id = 'subcategory-' + index;
		subcategory.innerHTML = 'Subcategory';

		// More button
		var more = document.createElement('button');
		more.type = 'button';
		more.id = 'more-' + index;
		more.className = 'btn btn-outline-primary more-button-cat';
		more.innerHTML = innerHTML;

		divCategory.appendChild(subcategory);
		divCategory.appendChild(more);
		div.appendChild(divCategory);

		// List of pages
		var divPages = document.createElement('div');
		divPages.id = 'pages-' + index;
		divPages.className = 'pages margin-left-2';

		if(hasList && !isTooltip) {
			createListInCategory(initialList, divPages);
		} else if (isTooltip && !hasList) {
			createListTooltip(initialList, divPages);
		}

		div.appendChild(divPages);
		div.appendChild(document.createElement('hr'));
		container.appendChild(div);

		$('[data-toggle="tooltip"]').tooltip({
			trigger : 'hover'
		});
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

		$('[data-toggle="tooltip"]').tooltip({
			trigger : 'hover'
		});
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
	// document.getElementById('more-button').innerHTML = 'More(' + 0 + ')';

	if (nextClass === 'tooltip-class') {
		createListTooltip(list, document.getElementById('page-container'));

		$('[data-toggle="tooltip"]').tooltip({
			trigger : 'hover'
		});
	} else if (after !== undefined) {
		createList(list, document.getElementById('page-container'), true);
	} else {
		createList(list, document.getElementById('page-container'), false);
	}
});


