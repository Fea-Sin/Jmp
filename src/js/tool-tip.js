;(function($) {
	function _winMes() {
		var w = window,
				d = document,
				e = d.documentElement,
				g = d.getElementsByTagName('body')[0],
				wW = w.innerWidth || e.clientWidth || g.clientWidth,
				wH = w.innerHeight || e.clientHeight || g.clientHeight;
				return wW;
	}
	function _creatToolTip(element) {
		var html = 	'<div class="tip-content"><div class="arrow-box">this is another line</div></div>';

		// 插入元素，防止重复插入
		var label = $(element).children(".tip-content").length;
		label > 0 ? '' : $(element).append(html);
	}
	function _setArrowBox(element, settings, leftPosition) {
		$(element).find('.arrow-box').css({"backgroundColor":settings['background-color']});
		//$('body').append('<style id="toolTipStyle">.tool-tip .tip-content .arrow-box::after{border-bottom-color:' + settings['background-color'] + ';border-left-color:' + settings['background-color'] + ';left:'+ leftPosition +'px}</style>')
	}
  function _setArrowLocation(element) {
  	// tip 触发元素
  	var tipTouch = element.children[0];
  	var fontSize = parseInt(window.getComputedStyle(tipTouch, null).getPropertyValue('font-size'));
  	var rectMessage = tipTouch.getBoundingClientRect();
  	var width = rectMessage.width;
  	var touchRight = rectMessage.right;
  	var leftPosition = fontSize + (width / 2);
  	return {
  		touchWidth: width,
  		eleFontSize: fontSize,
  		leftPosition: leftPosition,
  		touchRight: touchRight
  	}
  }
  function _setTextBox(element, settings) {
  	var box = element.children[1];
    var ele = box.children[0];
    box.style.width = settings.width + 'px';
  	ele.innerHTML = settings.text || 'please insert text node';
  }

  function _setRightMode(element, eleBoxWidth, eleObj, settings) {
		var box = element.children[1];
		box.style.left = '-' + (eleBoxWidth - eleObj.touchWidth) + 'px';
		var leftPosition = eleObj.eleFontSize + eleBoxWidth - (eleObj.touchWidth / 2);
		$(element).addClass('arrow-right-mode');
		_setArrowBox(element, settings, leftPosition);
  }

	var methods = {
		init: function(options) {

		/*
		 * create some defaults, extending them with any options
		 * that were provided
		 * 
		 */
		var settings = $.extend({
			'width': '500'
		}, options);

			return this.each(function(index, element) {
				var eleObj = _setArrowLocation(element);
				var eleBoxWidth = Number(settings.width);
				var eleTouchWidth = eleObj.touchWidth;
				var eleTouchRight = eleObj.touchRight;
				var winWidth = _winMes();
				_creatToolTip(element);
				_setTextBox(element, settings);


				/*
				 * 左侧模式
				 * 判断左右侧模式需要三个值
				 * eleBoxWidth, eleTouchRight, winWidth, eleTouchWidth
				 * eleBoxWidth < winWidth - eleTouchRight  左模式
				 */
				
				/*
				 * 右侧模式
				 *
				 * eleBoxWidth > win - eleTouchRight  右模式
				 */
				 
				if (eleBoxWidth < (winWidth - eleTouchRight) ) {
					_setArrowBox(element, settings, eleObj.leftPosition);
				} else {
					_setRightMode(element, eleBoxWidth, eleObj, settings);
				}
				var eleBox = element.children[1];
				$(eleBox).hide();				
			})
		},
		destroy: function() {

		},
		hideShow: function() {
			return this.each(function(index, element) {
				var box = element.children[1];
				$(box).toggle();
			})
		}
	}

	$.fn.toolTip = function(method) {
	
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof mehtod === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method' + method + 'does not exist on jQuery.tooltip')
		}

	}

})(jQuery);