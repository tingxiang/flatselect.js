(function($) {
	/**
	 * `values` is array, each element is an dictionary with key `value` and
	 * `text`. The `value` is the <option>'s value, `text` is the <option>'s
	 * text. Example: values = [{value: 'a', text: 'Foo'}, {value: 'b', text:
	 * 'Bar'}];
	 */
	$.fn.flatselect = function(options) {
		tmp = getDefaultValues($(this));
		var defaults = {
				selectOptions : tmp,
				columns : 3,
				minMatch : 3
		};
		var opts = $.extend(defaults, options);
		
		$(this).hide();
		$me = $(this);


		var $parent = $(
				'<div><div class="input-append">\
				<input type="text" class="span2"> \
					<span class="add-on"><i class="icon-chevron-down"></i></span></div> \
				</div>')
				.insertAfter(this);
		var $inputDiv = $('div[class=input-append]', $parent);
		var $inputBox = $('input[type=text]', $parent);
		generateDropDownContent(opts.selectOptions, "", opts.columns);
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
				if ($subStr.length > opts.minMatch) {
					var $subStr = $(this).val();
					$popupDiv.remove();
					generateDropDownContent(opts.selectOptions, $subStr, opts.columns);
					$popupDiv = $('ul', $parent);
					toggleDropdown();
				}
			} else if ($subStr.length < $origStr.length) {
				$popupDiv.remove();
				generateDropDownContent(opts.selectOptions, "", opts.columns);
				$popupDiv = $('ul', $parent);
				toggleDropdown();
			}
			$origStr = $subStr;
		});
		
		function getDefaultValues(select){
			var values = [];
			var $options = $('option', select);
			var length = $options.length;
			for ( var i = 0; i < length; i++) {
				values.push({
					value : $options[i]["value"],
					text : $options[i]["text"]
				});
			}
			return values;
		}
		
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
		
		return this;
	};
})(jQuery);
