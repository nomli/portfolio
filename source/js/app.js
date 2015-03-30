/*Main JS*/
;var myApp = myApp || {};
(function ($, $window) {
    myApp ={
        getDevice: function(){
		
            var envs = ['xs', 'sm', 'md', 'lg'],
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
		layout: function(){
			var doc = $("html,body"),
				mh  = $('.mainheader'),
				mc = $(".maincontent"),
				p = $("#portfolio"),
				nav = $(".nav li"),
				fh = $("footer").outerHeight();
			
			function scrollTo(x){
				doc.animate({
					scrollTop:x
				},500);
			}
			if($window.scrollTop() > 5){
				mh.addClass("headfix");
			}
			if( this.getDevice() != "xs" ){
				mc.css({
					minHeight:$window.height() - 255
				});
				p.css({
					minHeight:$window.height() - (fh+80)
				});
			}
			nav.each(function(i,e){
				var $this = $(e);
				$this.on("click",function(){
					$(".current").removeClass("current");
					if(i != 4){
						$this.find('a').addClass("current");
					}
					if(i === 0){
						scrollTo(0);
						return false;
					}else if( i === 1){
						scrollTo(p.offset().top-80);
						return false;
					}
				
				});
			});
		},
		scroll_fn: function(){
				var mh  = $('.mainheader'),
					rr = $('.roller'),
					scrollTimeout;
			$window.scroll(function () {
				if (scrollTimeout) {
					// clear the timeout, if one is pending
					clearTimeout(scrollTimeout);
					scrollTimeout = null;
				}
				scrollTimeout = setTimeout(scrollHandler.apply(myApp),50);
			});

			var scrollHandler = function () {
				if( $window.scrollTop() > mh.outerHeight() && this.getDevice() != "xs" ){
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
				},'fast', 'linear');
			});
		},
		init: function(){
            var self = this;
            $.each(self,function(i,ele){
                if(i !== "init" && typeof(ele) === "function"){
                    setTimeout(function(){
						ele.apply(myApp);
					},0);
                }
            });
        }
	};
	myApp.init();
}(jQuery,jQuery(window)));