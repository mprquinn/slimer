/*-----------------------

	Blur Header

	original code:
	http://bassta.bg/2013/12/medium-com-like-blurred-header-effect/

	Slightly modified

------------------------*/

var HeaderBlur = (function () {
	var s;

	return {

		settings: {

			//cache selectors
			$window: $(window),
  			$body: $('body'),            
  			$bgBlur: $('.bg-blur'),

  			//actual settings
  			bgBlurHeight: $('.bg-blur').height(),
  			scrollFlag: false,
  			scrollThreshold: 0.25, //used to debounce pointer events 
  			blurWhenReach: 3.5 //blur factor, 3 means the imahe will be blurred when you scroll 1/3 of the div

		},

		init: function () {
			s = this.settings;
			this.engage();
		},

		engage: function () {

			s.$window.on('scroll', function(event){
				var scrollTop = s.$window.scrollTop(); 
	               
			  	if (!s.scrollFlag) {
					s.scrollFlag = true;
			    	s.$body.addClass('disable-pointer-events');
			  	}
		               
		  		HeaderBlur.debouncePointerEvents();
		        console.log('Scroll Top: ' + scrollTop);
		        console.log('Blur Height: ' + s.bgBlurHeight);
		  		if (scrollTop < s.bgBlurHeight) {
		    		var _alpha = (scrollTop / s.bgBlurHeight) * s.blurWhenReach;
		    		console.log(_alpha);
		    		if (_alpha > 1) { _alpha = 1 }
			  		TweenMax.set(s.$bgBlur, {alpha: _alpha });
		  		}
				

			});

		},

		 // Speed up things by disabling pointer events. I use TweenMax 
		 // delayedCall instead JS native setInterval just for the sake of showing how to use this method.
		 // See more at http://www.thecssninja.com/javascript/pointer-events-60fps
				
		debouncePointerEvents: function(){
			TweenMax.killDelayedCallsTo(HeaderBlur.addPointerEvents);
			TweenMax.delayedCall(s.scrollThreshold, HeaderBlur.addPointerEvents);
		},
						
		addPointerEvents: function(){
			s.scrollFlag = false;
			s.$body.removeClass('disable-pointer-events');
		}
	}

})();
