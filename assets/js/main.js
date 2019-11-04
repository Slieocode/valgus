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

	/* Shopping Cart Animations */
   	let tl = new TimelineMax();
   	function swipeAnimate(){
		tl
    	.to(".page-swipe", 0.4, {x:"100%"})
    	.to(".page-swipe", 0.4, {x:"200%"})
    	.to('.page-swipe', 0,  {x:"-100%"})
   		$('.page-swipe').css({zIndex:9999999999999});
   	}

   	let tl2 = new TimelineMax();
   	function animateCart(){
   		$('.pulse-button').css({
   			animation:"none",
   			transform:"none",
   			transition:"all 0s ease 0s"
   		})
   		tl2
   		 .from(".pulse-button", 0.1, {y: "20%"})
   		 .to(".pulse-button", 0.3, {y:"-100%"})
   		 .to(".pulse-button", 1, {y:"20%", ease: Elastic.easeOut.config(1, 0.3), onComplete:function(){

		   		$('.pulse-button').css({
		   			animation:"pulse 1.5s infinite",
		   			transition:".3s"
		   		})
		   		$('.pulse-button').on('hover', function(){
		   			$(this).css({transform:"scale(1.5)"})
		   		})
   		 }})
   	}

   		function swipeAnimateClick(){
		   	$('.snipcart-add-item').on('click', function(){
		   		animateCart();
		   	});

		   	$('.pulse-button').on('click', function(){
		   		swipeAnimate();
		   	})
   		}


	Barba.Pjax.getTransition = function() {
	  /**
	   * Here you can use your own logic!
	   * For example you can use different Transition based on the current page or link...
	   */ 

    	// tl
    	// .to(".page-swipe", 1, {x:"200%"})
    	// .to('.page-swipe', 0,  {x:"-100%"})

		  $("html, body").animate({ scrollTop: 0 }, 0);

	  return FadeTransition;
	};


	/*Header*/	
	/*Typing Effect*/
	function typingStart(){
		let span = $(".txyping .landingH1 span");
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
		if(!$('.vl-qs').length){
			let images = $('.header-media img');
		let i = 0;
		$(images[i]).fadeIn().siblings().fadeOut();
		setInterval(function(){
			if(i >= 3){
				i = 0;
			}
			
			$(images[i]).fadeIn().siblings().fadeOut();

			i = i + 1;
		},3000)
		}
		// color switch
		// if we are on /store then:
		if($('.store').length){
			$(".ul-nav > li a").addClass('color-switch')
			$("#headerText").css({fill:"#FFF"})
			$("nav").css({paddingTop:"12px"})
		}
	}


	Barba.Dispatcher.on('transitionCompleted', function(currentStatus, oldStatus, container) {

		navMenu();
		productPageHandler();
		$.getScript( "https://cdn.snipcart.com/themes/v3.0.0/default/snipcart.js", function( data, textStatus, jqxhr ) {
		});
		swipeAnimateClick();
		bubbleAnimation();
		goBackScroll();
	});
	slideShowStart();
	typingStart();
	navMenu();
	swipeAnimateClick();
	/*Nav Menu*/
	function navMenu(){
	// home page effects
	//hero 
	 let tl3 = new TimelineMax({repeat:-1});
	 tl3.
	  to('.landingH1 .underline:nth-child(1)', 1.5, {y:"0%", ease: Elastic.easeOut.config(2, 1.5), delay:0, stagger:1})
	  .to('.landingH1 .underline:nth-child(1)', 1.2, {y:"-200%", ease:Power4.easeIn, delay:0.5, stagger:1})
	  .to('.landingH1 .underline:nth-child(2)', 1.5, {y:"0%", ease: Elastic.easeOut.config(2, 1.5), delay:0, stagger:1})
	  .to('.landingH1 .underline:nth-child(2)', 1.2, {y:"-200%", ease:Power4.easeIn, delay:0.5, stagger:1})
	  .to('.landingH1 .underline:nth-child(3)', 1.5, {y:"0%", ease: Elastic.easeOut.config(2, 1.5), delay:0, stagger:1})
	  .to('.landingH1 .underline:nth-child(3)', 1.2, {y:"-200%", ease:Power4.easeIn, delay:0.5, stagger:1})
	  .to('.landingH1 .underline:nth-child(4)', 1.5, {y:"0%", ease: Elastic.easeOut.config(2, 1.5), delay:0, stagger:1})
	  .to('.landingH1 .underline:nth-child(4)', 1.2, {y:"-200%", ease:Power4.easeIn, delay:0.5, stagger:1})

	sal()

	/*home page style*/
	 if($(".bgStore").length){

		$('nav').css('z-index','9')
		$('.textStore').css('z-index','9')
		$('nav .ul-nav > li a').css('color','#FFF')
		$('#headerText').css('fill','#FFF')
		$('.offer').css({
			zIndex:9,
			position:"relative"
		}) 
		

	 }
	/*blog post nav */
	if($(".blog-text-holder, .h-product").length){
		$('nav').css('background',"white")
	}
	let mediaCheckIfMobile = window.matchMedia('(max-width: 767px)').matches;
		$('.productsLink, .productDrop').on('mouseover', function(){
			$('.productDrop').fadeIn().css({display:"flex"})
		})

		$('.productDrop').on('mouseleave', function(){
			$('.productDrop').fadeOut();		
		})

		$('.ul-nav li:not(.productsLink)').on('mouseover', function(){
			$('.productDrop').fadeOut();		
		})		

 	if(mediaCheckIfMobile){
 		$('.productsLink, .productDrop').off();
	 	$('ul .sub').removeClass('linq');
	 	if($('.textStore').length){
	 		$('nav a').removeClass('color-switch')
	 	}

 	  }

	 $(window).on('resize', function(){
	 	if(window.matchMedia('(max-width: 767px)').matches){
	 	if($('.textStore').length){
	 		$('nav a').removeClass('color-switch')
	 	}else{
	 		$('nav a').addClass('color-switch')	 		
	 	}
	
	 		$('.productsLink, .productDrop').off();
	 		$('ul .sub').removeClass('linq');

			// $('html').click(function() {
			//     $('nav').animate({left:"-100%"}) 
			// });
			// $('nav').click(function(event){
			//     event.stopPropagation(); // prevents executing the above event
			// }); 	  			


	 	}else{
		    $('nav').animate({left:"0%"})
	 		$('.triggerProducts').css({display:"none"})
	 		$('.productsLink > a').off('click')
	 	}
	 })
	// sub products
	$('.triggerProducts a').on('click', function(){
		// show sub product panel 
			$('.productDrop').fadeIn().css({display:"flex"})
			$('.productDrop' +' .'+ $(this).text()).css({display:"flex", zIndex:99999999})
			.siblings().not('.im').css({display:"none !important", zIndex:99});			
	});

	// hide sub product
	$('.productDrop > i').on('click', function(){
		$(this).parent().fadeOut();
	})

	// show trigger buttons for sub product
	$('.productsLink > a').on('click', function(e){
		if(mediaCheckIfMobile){
			e.preventDefault();
			$('.triggerProducts').fadeToggle();
			return false;		
		}
	});

		$('.im-menu').on('click', function(){
			let nav = $('.cl-effect-12');
			TweenMax.to('.cl-effect-12',  1, {left:0, ease:Power4.easeOut})
			$('html').click(function() {
			    $('nav').animate({left:"-100%"})
			});

			$('nav').click(function(event){
			    event.stopPropagation(); // prevents executing the above event
			}); 	  			

		})

	/*FAQ PAGE*/
	var accordion = (function(){
  
  var $accordion = $('.js-accordion');
  var $accordion_header = $accordion.find('.js-accordion-header');
  var $accordion_item = $('.js-accordion-item');
 
  // default settings 
  var settings = {
    // animation speed
    speed: 400,
    
    // close all other accordion items if true
    oneOpen: false
  };
    
  return {
    // pass configurable object literal
    init: function($settings) {
      $accordion_header.on('click', function() {
        accordion.toggle($(this));
      });
      
      $.extend(settings, $settings); 
      
      // ensure only one accordion is active if oneOpen is true
      if(settings.oneOpen && $('.js-accordion-item.active').length > 1) {
        $('.js-accordion-item.active:not(:first)').removeClass('active');
      }
      
      // reveal the active accordion bodies
      $('.js-accordion-item.active').find('> .js-accordion-body').show();
    },
    toggle: function($this) {
            
      if(settings.oneOpen && $this[0] != $this.closest('.js-accordion').find('> .js-accordion-item.active > .js-accordion-header')[0]) {
        $this.closest('.js-accordion')
               .find('> .js-accordion-item') 
               .removeClass('active')
               .find('.js-accordion-body')
               .slideUp()
      }
      
	      // show/hide the clicked accordion item
	      $this.closest('.js-accordion-item').toggleClass('active');
	      $this.next().stop().slideToggle(settings.speed);
	    }
	  }
	})();
  	accordion.init({ speed: 300, oneOpen: true });

	

	}

	/*Header*/

	/* Product Page */
	function productPageHandler(){
		let className;
		if($('.single-product').length){
			$('.btn-prod button').on('click', function(){
				className = $(this).data('role');
				$(this).addClass('active').siblings().removeClass('active');
				$('.'+className).css({
					opacity:1
				}).siblings().not('.btn-prod').css({
					opacity:0
				})
			});

			// product image magnifier
			let img;
			img = $(".single-product .product-media img");
	
			$(img).lightzoom();
			
			$(img).lightzoom({
				  glassSize   : 175
			});
			
			$(img).lightzoom({
			  zoomPower   : 1
			});
		}		
	}

	if($('.single-product').length){
		productPageHandler();
	}

	/* add to cart button effects */
	var animateButton = function(e) {
		// if(e){
		// }
		let btn = $(this);

		$(btn).removeClass('animate');
		$(btn).addClass('animate');

	  setTimeout(function(){
		$(btn).removeClass('animate');
	  },700);
	};

	function bubbleAnimation(){
		var bubblyButtons = document.getElementsByClassName("bubbly-button");

		for (var i = 0; i < bubblyButtons.length; i++) {
		  bubblyButtons[i].addEventListener('click', animateButton, false);
		}
		$('.bubbly-button i').on('click', function(){
			animateButton()
		});		
	}
	bubbleAnimation()

 	function goBackScroll(){
  		$('.snipcart-checkout').on('click', function(){	
   			goBackScroll();
   		})
   		$('.snipcart-add-item').on('click', function(){
   			if(!Number($('.snipcart-items-count').text())){
   				swipeAnimate()
   			}
   		})

	let scrollPos = $(document).scrollTop();
 	setTimeout(function(){
		$(".snipcart-modal__close").on('click', function(){
			$('html, body').animate({
				scrollTop:scrollPos,
				transition:"ease-in"
			}, 500);
		});

 	},1000)

}

goBackScroll();

});