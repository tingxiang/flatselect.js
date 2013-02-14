(function($) {
	/**
	 * `values` is array, each element is an dictionary with key `value` and
	 * `text`. The `value` is the <option>'s value, `text` is the <option>'s
	 * text. Example: values = [{value: 'a', text: 'Foo'}, {value: 'b', text:
	 * 'Bar'}];
	 */
	$.fn.flatselect = function(values, columns) {
		// console.log('select2');
		$(this).hide();
		$me = $(this);
		if (!values) {
			values = [];
			var $options = $('option', $(this));
			// console.log($options);
			var length = $options.length;
			for ( var i = 0; i < length; i++) {
				values.push({
					value : $options[i]["value"],
					text : $options[i]["text"]
				});
				// console.log('option: ' + $options[i].text);
			}
		}

		var $parent = $(
				'<div><div class="input-append">\
				<input type="text" class="span2"> \
					<span class="add-on"><i class="icon-chevron-down"></i></span></div> \
				<ul id="list1" class="dropdown-menu"></ul></div>')
				.insertAfter(this);

		// var $parent = this.parent();
		// this.replaceWith('<div><div class="input-append">\
		// <input type="text" class="span2"> \
		// <span class="add-on"><i class="icon-chevron-down"></i></span></div> \
		// <ul id="list1" class="dropdown-menu">Hello</ul></div>');

		var $inputDiv = $('div[class=input-append]', $parent);
		var $inputBox = $('input[type=text]', $parent);
		var $popupDiv = $('ul', $parent);

//		console.log($inputDiv);
//		console.log($inputBox);
//		console.log($popupDiv);

		$inputDiv.bind('click', showDropdown);

		$parent.on('click', 'a', function() {
			//console.log("$('a', $inputDiv).click");
			var text = $(this).text();
			$inputBox.val(text);
			$me.val($(this).data('value'));
			//console.log('set select value to ' + $(this).data('value'));
			$popupDiv.hide();
		});

		$inputBox.click(function() {
			//console.log('$inputBox.click');
			$(this).val("");
		});

		$popupDiv.html(generateDropDownContent(values));

		$inputBox.keyup(function() {
			//console.log('$inputBox.keyup');
			var content = $(this).val();
			var matched = new Array();
			var show = "";
			var i = 0;
			if (content.length > 3) {
				// $.each(array,
				// function(){console.log($(this).text())})
				for (x in values) {
					if (values[x].indexOf(content) == 0) {
						matched.push('<a href="#" data-value="' + values[value]
								+ '">' + values[x].text + '</a>');
						i++;
						if (i == 2) {
							i = 0;
							tmp = '<li>' + matched.join("") + '</li>';
							matched.splice(0);
							show += tmp;
						}
					}
				}
				if (i == 1) {
					show += '<li>' + matched[0] + '</li>';
				}
				if (show.length > 0) {
					show = '<ul id="list1" class="dropdown-menu hide">' + show
							+ '</ul>';
					//console.log(show);
					$('#list1').remove();
					$('body').append(show);
					showDropdown();
				}
			}
		});

		function showDropdown() {
			//console.log('showDropdown: ');
			var $iconTop = $inputDiv.offset().top;
			var $iconHeight = $inputDiv.height();
			var $iconLeft = $inputDiv.offset().left;

			$popupDiv.css('top', $iconTop + $iconHeight);
			$popupDiv.css('left', $iconLeft);
			//console.log('showDropdown: ' + $popupDiv);
			$popupDiv.toggle();
		}

		function generateDropDownContent(values) {
			var content = '';
			for ( var index in values) {
				content += '<li><a href="#" data-value="' + values[index].value
						+ '">' + values[index].text + '</a></li>';
			}

			return content;
		}
	};
})(jQuery);
