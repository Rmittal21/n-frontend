$(document).ready(function() {
	
	resize();
	
	$("#mobile-menu").mmenu({
		classes: "mm-light"
	});
	
	$(".fancybox").fancybox({
		padding:0,
		margin:0
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