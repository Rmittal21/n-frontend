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
    
    
	$(window).resize(function() {
		resize();
	})
	
});


function resize() {
	
	$(".js-full-screen").height($(window).height());
	
	if($(window).width() >= 992){
		$("#mobile-menu").trigger("close.mm");
	}
	
}