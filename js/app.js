var tim ="";
(function ($){
	tim ={
		getDevice:function(){
            var envs = ['xs', 'sm', 'md', 'lg'];

            $el = $('<div>');
            $el.appendTo($('body'));

            for (var i = envs.length - 1; i >= 0; i--) {
                var env = envs[i];

                $el.addClass('hidden-'+env);
                if ($el.is(':hidden')) {
                    $el.remove();
                    return env;
                }
            }
    },
		scroll_fn:function(){
			var $window = $(window),
				mh  = $('.mainheader'),
				rr = $('.roller'),
				scrollTimeout;
			$window.scroll(function () {
				if (scrollTimeout) {
					// clear the timeout, if one is pending
					clearTimeout(scrollTimeout);
					scrollTimeout = null;
				}
				scrollTimeout = setTimeout(scrollHandler,50);
			});

			scrollHandler = function () {
				if( $window.scrollTop() > mh.outerHeight() && tim.getDevice() != "xs" ){
                    mh.addClass("headfix");
					rr.addClass('show');
                }else{
                    mh.removeClass("headfix");
					rr.removeClass('show');
                }
			};
			rr.on("click",function(){
				$('html,body').animate({
					scrollTop:0
				},'fast', 'linear')
			})
		},
		init:function(){
            var self = this;
            $.each(self,function(i,ele){
                if(i !== "init"){
                    setTimeout(ele,0);
                }
            });
			
        }
	};
	tim.init();
}(jQuery));