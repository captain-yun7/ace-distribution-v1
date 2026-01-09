function activeMenuIdx () {
	if ( oneNum > 0 && twoNum > 0) {
		$gnbItem.eq(oneNum-1).addClass("on");
		$gnbMList.eq(oneNum-1).addClass("on");
		$snb.each(function  () {
			$(this).children("li").eq(twoNum-1).addClass("on");
		});
		$snbMenu.find(".menu-location").each(function  () {
			// 2depth ON
			if ( $(this).is(".location1") ) {
				$(this).find(".location-menu-con").children("li").eq(oneNum-1).addClass("on");
			}else if( $(this).is(".location2")) {
				$(this).find(".location-menu-con").children("li").eq(twoNum-1).addClass("on");
			}else if( $(this).is(".location3")) {
				$(this).find(".location-menu-con").children("li").eq(dep3-1).addClass("on");
			}
		});
	}
}

/*function getWindowWidth () {
	return $(window).outerWidth() + getScrollBarWidth() ;
}*/

$(".cm-drop-menu-box-JS").each(function  () {
	var $dropBox = $(this);
	var $dropOpenBtn = $(this).find(".cm-drop-open-btn-JS");
	var $dropList = $(this).find(".cm-drop-list-JS");
	var eventState = $dropBox.data("drop-event");
	
	if ( eventState === "click" ) {
		$dropOpenBtn.click(function  () {
			$dropList.slideToggle(500);
			$dropBox.toggleClass("open");
			$dropBox.on("mouseleave", function  () {
				dropClose ();
			});
			return false;
		});
		$("body").click(function  () {
			dropClose();
		});
	}else if ( eventState === "hover" ) {
		$dropBox.hover(function  () {
			$dropList.slideDown(500);
			$dropBox.addClass("open");
		},function  () {
			dropClose ();
		});
	}
	function dropClose () {
		if ( $dropBox.data("drop-width") ) {
			if ( getWindowWidth () < $dropBox.data("drop-width")+1 ) {
				$dropList.slideUp(500);
				$dropBox.removeClass("open");
			}
		}else {
			$dropList.slideUp(500);
			$dropBox.removeClass("open");
		}
	}
	$(window).resize(function  () {
		if ( getWindowWidth () > $dropBox.data("drop-width") ) {
			$dropList.removeAttr("style");
		}else {
			$dropList.hide();
		}
	});
});

/* ************************
  * 갯수체크 함수
  * @param selector : 선택자
  * 1개이상 있으면 return true
  ************************ */
$.exists = function(selector) {
	return ($(selector).length > 0);
}