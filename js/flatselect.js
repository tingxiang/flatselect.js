(function($) {
	/**
	 * `values` is array, each element is an dictionary with key `value` and
	 * `text`. The `value` is the <option>'s value, `text` is the <option>'s
	 * text. Example: values = [{value: 'a', text: 'Foo'}, {value: 'b', text:
	 * 'Bar'}];
	 */
	$.fn.flatselect = function(values, columns) {
		$(this).hide();
		$me = $(this);
		if (!values) {
			values = [];
			var $options = $('option', $(this));
			var length = $options.length;
			for ( var i = 0; i < length; i++) {
				values.push({
					value : $options[i]["value"],
					text : $options[i]["text"]
				});
			}
		}

		var $parent = $(
				'<div><div class="input-append">\
				<input type="text" class="span2"> \
					<span class="add-on"><i class="icon-chevron-down"></i></span></div> \
				</div>')
				.insertAfter(this);
		var $inputDiv = $('div[class=input-append]', $parent);
		var $inputBox = $('input[type=text]', $parent);
		generateDropDownContent(values, "", 3);
		var $popupDiv = $('ul', $parent);

		$inputDiv.bind('click', toggleDropdown);

		$parent.on('click', 'a', function() {
			var text = $(this).text();
			$inputBox.val(text);
			$me.val($(this).data('value'));
			$popupDiv.hide();
		});

		$inputBox.focus(function() {
			$(this).select();
		});
		var $origStr = "";
		$inputBox.keyup(function() {
			var $subStr = $(this).val();
			if ($subStr.length > $origStr.length) {
				if ($subStr.length > 3) {
					var $subStr = $(this).val();
					$popupDiv.remove();
					generateDropDownContent(values, $subStr, 3);
					$popupDiv = $('ul', $parent);
					toggleDropdown();
				}
			} else if ($subStr.length < $origStr.length) {
				$popupDiv.remove();
				generateDropDownContent(values, "", 3);
				$popupDiv = $('ul', $parent);
				toggleDropdown();
			}
			$origStr = $subStr;
		});

		function toggleDropdown() {
			$popupDiv.css({
				"top" : $inputDiv.offset().top + $inputDiv.height(),
				"left" : $inputDiv.offset().left
			});
			$popupDiv.toggle();
		}

		function generateDropDownContent(values, pattern, columns) {
			var matched;
			var show = $('<ul class="dropdown-menu"></ul>');
			var i = 0;
			var matches = $('<li></li>');
			 $.each(values, function(index, value) {
				if (value.text.indexOf(pattern) == 0) {
					matched = $('<a href="#" data-value="' + value.value + '">'
							+ value.text + '</a>');
					matches.append(matched);
					i++;
					if (i == columns) {
						i = 0;
						show.append(matches);
						matches = $('<li></li>');
					}
				}
			});
			if (i != 0) {
				show.append(matches);
			}
			if (matched != null) {
				show.insertAfter($inputDiv);
			}
		}
	};
})(jQuery);
