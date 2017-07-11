;(function($) {

	function _getCommon(element) {
		var obj = {};
		obj.text = $.trim($(element).children("#text").text());
		obj.rect = element.getBoundingClientRect();
		return obj;	
	}

	function _setDecoration(element) {
		var htmlDecoration = '<span id="decoration"><i class="iconfont icon-icon_fankui"></i></span>';
		$(element).append(htmlDecoration);
	}	

	function _onMouseEnter(element, settings) {
		_setPopLayer(element, settings);
	}

	function _onMouseLeave(element) {
		$(element).next(".pop-layer").remove();
	}

	function _onMouseMove(element) {
		console.log('mouse move');
	}

	function _setPopLayer(element, settings) {
		var popWidth = settings.popWidth;
		var popTop = settings.popTop;
		var $popLayer = $(element).next(".pop-layer");
		var label = $popLayer.length;
		if (!label) {
			var htmlPopLayer = '<div class="pop-layer"></div>';
			var obj = _getCommon(element);
			var text = obj.text;		
			var rect = obj.rect;
			var left = rect.left;
			var top = rect.top;
			$(element).after(htmlPopLayer);
			var popLayer = $(element).next(".pop-layer")[0];	
			popLayer.style.width = popWidth + 'px';
			$(popLayer).text(text);
			popLayer.style.top = (top + popTop) + 'px';
		} else {
			$popLayer.show();
		}

	}


	var methods = {

		init: function(options) {

			/*
			 * create some defaults, extending them with out options
			 * that were provided
			 */
			var settings = $.extend({
				'width': '10',
				'popWidth': '188'
			}, options);

			return this.each(function(index, element) {
				var text = _getCommon(element).text;
		    var textLength = text.length;
		    var setLength = Number(settings.width);
				element.style.width = Number(settings.width) + 1.5 + 'em';
				$(element).children("#text").width(settings.width + "em");

				if (textLength > setLength ) {
					_setDecoration(element);

					$(element).mouseenter(function() {
						_onMouseEnter(element, settings);
					})

					$(element).mouseleave(function() {
						_onMouseLeave(element);
					})

/*					$(element).mousemove(function() {
						_onMouseMove(element);
					})*/
				}
				
			})

		},

		destroy: function() {

		}
	}
	$.fn.overflowShow = function(method) {
		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method' + method + 'does not exist on jQuery.overflowShow')
		}
	}
})(jQuery);