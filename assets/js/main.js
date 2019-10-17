$(document).ready(function(){
	/* Page Transition */
	Barba.Pjax.start();
   	var FadeTransition = Barba.BaseTransition.extend({
	  start: function() {
	    /**
	     * This function is automatically called as soon the Transition starts
	     * this.newContainerLoading is a Promise for the loading of the new container
	     * (Barba.js also comes with an handy Promise polyfill!)
	     */

	    // As soon the loading is finished and the old page is faded out, let's fade the new page
	    Promise
	      .all([this.newContainerLoading, this.fadeOut()])
	      .then(this.fadeIn.bind(this));
	  },

	  fadeOut: function() {
	    /**
	     * this.oldContainer is the HTMLElement of the old Container
	     */

	    return $(this.oldContainer).animate({ opacity: 0 }).promise();
	  },

	  fadeIn: function() {
	    /**
	     * this.newContainer is the HTMLElement of the new Container
	     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
	     * Please note, newContainer is available just after newContainerLoading is resolved!
	     */

	    var _this = this;
	    var $el = $(this.newContainer);

	    $(this.oldContainer).hide();

	    $el.css({
	      visibility : 'visible',
	      opacity : 0
	    });

	    $el.animate({ opacity: 1 }, 400, function() {
	       _this.done();
			slideShowStart();
			typingStart();
	    });
	  }
	});

	/**
	 * Next step, you have to tell Barba to use the new Transition
	 */

	Barba.Pjax.getTransition = function() {
	  /**
	   * Here you can use your own logic!
	   * For example you can use different Transition based on the current page or link...
	   */
   	let tl = new TimelineMax();
    	tl
    	.to(".page-swipe", 0.4, {x:"100%"})
    	.to(".page-swipe", 0.4, {x:"200%"})
    	.to('.page-swipe', 0,  {x:"-100%"})


	  return FadeTransition;
	};


	/*Header*/	
	/*Typing Effect*/
	function typingStart(){
		let span = $(".typing .landingH1 span");
		if(span.length){
			var typed = new Typed(".typing .landingH1 span", {
			  strings: ["Feet", "Knee", " lower back", "legs"],
			  typeSpeed: 100,
			  backSpeed:100,
			  loop:true
			});
		}
	}

	/*Image Effect*/
	function slideShowStart(){
		console.log(!$('.vl-qs').length)
		if(!$('.vl-qs').length){
			let images = $('.header-media img');
		let i = 0;
		$(images[i]).fadeIn().siblings().fadeOut();
		setInterval(function(){
			if(i >= 3){
				i = 0;
			}
			console.log(images[i])
			
			$(images[i]).fadeIn().siblings().fadeOut();

			i = i + 1;
		},3000)
	}

	}

	slideShowStart();
	typingStart();

	
	/*Nav Menu*/

	$('.productsLink, .productDrop').on('mouseover', function(){
		$('.productDrop').fadeIn().css({display:"flex"})
	})

	$('.productDrop').on('mouseleave', function(){
		$('.productDrop').fadeOut();		
	})

	$('.ul-nav li:not(.productsLink)').on('mouseover', function(){
		$('.productDrop').fadeOut();		
	})

	/*Header*/


});
