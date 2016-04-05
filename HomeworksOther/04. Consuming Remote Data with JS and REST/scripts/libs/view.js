define([], function () {
	function appendCountry(country) {
		var countryItem = $('<li>').data('country', country);
		$('<span>').addClass('country')
			.text(country.name)
			.attr('id', country._id)
			.appendTo(countryItem);
		var div = $('<span>').addClass('buttons')
			.append($('<button class="add-town" title="add town">+</button>' +
					  '<button class="edit-country" title="edit country">e</button>' +
					  '<button class="remove-country" title="remove country">x</button>'));
		div.appendTo(countryItem);
		countryItem.hide().appendTo($("#countries")).fadeIn(500);
	}

	return {
	    loadCountries: function loadCounties(data) {
			$.each($(data), function(key, country){
				appendCountry(country);
			});
	    },
		addCountry: function (data) {
			appendCountry(data);
		},
		removeCountry: function (countryId) {
			$('#' + countryId).parent().remove();
		},
		editCountry: function (countryId, name) {
			$('#' + countryId).text(name);
		},
		loadCountryTowns: function (data, countryId) {
			$(this).empty();

			if (data) {
				var towns = $('<ul>').addClass('towns');

				$.each($(data), function (key, town) {
					var townItem = $('<li>').data('town', town);
					$('<span>').addClass('town').attr('id', town._id).text(town.name).appendTo(townItem);
					var div = $('<span>').addClass('town-buttons')
						.append($('<button class="edit-town" title="edit town">e</button>' +
								  '<button class="remove-town" title="remove town">x</button>'));
					div.appendTo(townItem);
					townItem.appendTo(towns);
				});

				towns.hide().appendTo($('#' + countryId)).slideToggle();
			};
		},
		addTown: function (town) {
			var townId = town._id;
			var townItem = $('<li>').data('town', {name: town.name, _id: townId});
			$('<span>').addClass('town')
					.text(town.name)
					.attr('id', townId)
					.appendTo(townItem);
			var div = $('<span>').addClass('buttons')
					.append($('<button class="edit-town" title="edit town">e</button>' +
							  '<button class="remove-town" title="remove town">x</button>'));
			div.appendTo(townItem);
			townItem.hide().appendTo($(".towns")).fadeIn(500);
		},
		removeTown: function (townId) {
			$('#' + townId).parent().remove();
		},
		editTown: function (townId, name) {
			$('#' + townId).text(name);
		}
	}
});