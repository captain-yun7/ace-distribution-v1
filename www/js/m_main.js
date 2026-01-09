
$(function() {

	var jqb_vGo = 1;

	$('#slides').slidesjs({
		width:412, 
		height:515,
		navigation: {
		  active:false, 
		 },
		 pagination: {
			active: true,
		 },
		effect: {
		  fade: {
			speed: 600
		  }
		}
	});
 
	$('.pro-list').slidesjs({
		width:375,
		height:136,
		navigation: {
		  active:false, 
		},
		pagination:false,
	});
	
	$("#btn_prev").click(function() {
		jqb_vGo = -1;
		jqb_fnLoop();
	});
		
	$("#btn_next").click(function() {
		jqb_vGo = 1;
		jqb_fnLoop();
	});


	// Top Scroll
	$(document).ready(function(){

		$("#gototop").hide();
		
		$(function () {
			$(window).scroll(function () {
				if ($(this).scrollTop() > 100) {
					$('#gototop').fadeIn();
				} else {
					$('#gototop').fadeOut();
				}
			});

			$('#gototop a').click(function () {
				$('body,html').animate({
					scrollTop: 0
				}, 1000);
				return false;
			});
		});

	});
});