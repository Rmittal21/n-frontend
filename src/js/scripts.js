$(document).ready(function() {
	
	resize();
	
	$("#mobile-menu").mmenu({
		classes: "mm-light"
	});
	
	$("a.fancybox").fancybox({
		type: 'image',
		padding: 0,
		hideOnContentClick: true,
		helpers: { title: false } 
	});
	
	$("#mobile-menu-button").click(function(e) {
		e.preventDefault();
        $("#mobile-menu").trigger("open.mm");
    });
    
    $(".gallery").slick({
    	infinite: true,
  		slidesToShow: 3,
  		slidesToScroll: 3,
  		arrows: false
  	});
  	
  	$("#gallery-next").click(function(e){
  		e.preventDefault();
	    $('.gallery').slick('slickNext');
	});
	
	$("#gallery-prev").click(function(e){
		e.preventDefault();
	    $('.gallery').slick('slickPrev');
	});
    
	$(window).resize(function() {
		resize();
	});
    
    var isotopeContainer = $('.grid').isotope({
        itemSelector: '.item'
    });
    
    // filter items on button click
    $('#filter-list').on( 'click', 'a', function() {
      $('#filter-list > li > a').each(function() {
        $(this).removeClass("active"); 
      });
      $(this).addClass("active");
      var filterValue = $(this).attr('data-filter');
      isotopeContainer.isotope({ filter: filterValue });
    });
	
});


function resize() {
	
	$(".js-full-screen").height($(window).height());
	
	if($(window).width() >= 992){
		$("#mobile-menu").trigger("close.mm");
	}
	
}