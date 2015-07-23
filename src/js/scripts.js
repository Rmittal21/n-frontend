$(document).ready(function() {

	resize();

	$("#mobile-menu").mmenu({
        navbar: false
	});

	$("a.fancybox").fancybox({
		type: 'image',
		padding: 0,
		hideOnContentClick: true,
		helpers: { title: false }
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

    if ( $( "#filter-grid" ).length ) {

        $("#filter-grid").isotope({
	        itemSelector: '.item'
	    });

	    $("#filter-list").on( "click", "a", function(e) {
          e.preventDefault();
	      $("#filter-list > li > a").each(function() {
	        $(this).removeClass("active");
	      });
	      $(this).addClass("active");
	      var filterValue = $(this).attr("data-filter");
	      $("#filter-grid").isotope({ filter: filterValue });
	    });

        $("#filter-grid").isotope().on( 'layoutComplete', function( event, laidOutItems ) {
            console.log( laidOutItems.length );
        });

    }

    if ( $( "#google-maps" ).length ) {

	    var map;
	    var geocode;
	    var marker = 'Ferdinand Lousbergskaai 103, Gent';
	    var markerIcon = 'http://www.urbanlink.local/wp-content/themes/urbanlink/images/icons/icon_map.png';
	    var center = new google.maps.LatLng(51.209348, 3.224700);
	    var MY_MAPTYPE_ID = 'n-frontend-style';
	    var customLayoutOptions = {	name: 'N-frontend' 	};

		function initialize() {

		  var customLayout =
		[{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},		{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];

		  geocoder = new google.maps.Geocoder();

		  map = new google.maps.Map(document.getElementById('google-maps'), {
		    zoom: 15,
		    center: center,
		    mapTypeControl: false,
		    scrollwheel: false,
 			disableDoubleClickZoom: true,
 			mapTypeId: MY_MAPTYPE_ID
		  });

		  var customMapType = new google.maps.StyledMapType(customLayout, customLayoutOptions);
		  map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

		  showMarker();
		}

		function showMarker() {
			geocoder.geocode( { 'address': marker }, function(results, status) {
			    if (status == google.maps.GeocoderStatus.OK) {
			      map.setCenter(results[0].geometry.location);
			      window.setTimeout(function() {
		    		new google.maps.Marker({
		      			position: results[0].geometry.location,
		      			map: map,
		      			icon: markerIcon,
		      			animation: google.maps.Animation.DROP
		    		}),3000 });
			    }
			});
		}

		google.maps.event.addDomListener(window, 'load', initialize);
	}

	/*
	$(window).on('scroll',function() {
		if ( $(window).scrollTop() >= $('header').outerHeight() ) 	{
			setTimeout( function() {
				$('header').addClass('p-fixed sh-light-grey')
			}, 200 );
		}
		else {
			setTimeout( function() {
				$('header').removeClass('p-fixed sh-light-grey')
			}, 200 );
		}
	});
	*/

	if ( $( ".video" ).length ) {

        $(".video").get(0).play();

    }

    if ( $("#auto-popup").length && document.cookie.indexOf("state_popup") <= 0) {

        setTimeout(function() {
            $("#auto-popup").modal();
        }, 7500);

        $("#popup-close").on("click",function(e) {
            e.preventDefault();
            $("#auto-popup").modal('hide');
        });

        $("#auto-popup").on('hidden.bs.modal', function (e) {
            document.cookie="state_popup=closed";
        });

    }


});


function resize() {

	$(".js-full-screen").height($(window).height());

}