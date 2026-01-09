var oneNum = 1;
var twoNum = 2;

var $gnb = $("#gnb");
var $gnbList = $gnb.children("ul");
var $menuBtn = $("#header .nav-open-btn");
var $gnbM = $("#gnbM");
var $gnbMList = $gnbM.find("#navigation");
var $gnbMBg = $('.gnb-overlay-bg-m');
var menuState = false;

$(document).ready(function(){

	// gnb 메뉴 복사
	/*function cloneMenu () {
		$gnbMList.html($gnbList.html());
	}*/	

	// Mobile Menu
	if ( $.exists("#gnbM") ) {
		toggleNavButton();
		//calcMenuHeight();
		toggleDepth2Menu();
		//addClassFullMenu();
	}
	
	//activeMenuIdx();
	
	// gnbM Nav Button Click
	function toggleNavButton () {
		$menuBtn.click(function  () {
			if ( menuState ) {
				closeMobileMenu();
			}else {
				openMobileMenu();
			}
			return false;
		});
		$gnbMBg.click(function  () {
			closeMobileMenu();
		});
	}

	//  gnbM 메뉴열기
	function openMobileMenu () {
		menuState = true;
		$menuBtn.addClass("active");
		$gnbM.addClass("open");
		$gnbMBg.fadeIn();
		$("body").css({'height':$(window).height(), 'overflow':'hidden'});
		if ( oneNum> 0 && twoNum> 0 ) {
			$gnbMList.children("li").eq(oneNum-1).addClass("active").find("ul").show().find("li").eq(twoNum-1).addClass("on");
		}
	}

	// gnbM 메뉴닫기
	function closeMobileMenu () {
		menuState = false;
		$menuBtn.removeClass("active");
		$gnbM.removeClass("open");
		$gnbMBg.hide();
		$("body").css({'height':'auto', 'overflow':'auto'});
		if ( oneNum> 0 && twoNum> 0 ) {
			$gnbMList.children("li").removeClass("active").find("ul").hide();
		}
	}

	// gnbM 2DEPTH 클래스  및 오픈
	function toggleDepth2Menu () {
		$gnbMList.children("li:has('.gnb-2dep')").addClass("has-2dep");
		$gnbMList.children("li:has('.gnb-2dep')").children("a").click(function(event){
			/* 2dep가 열려있을때 */		
			if ( $(this).parent("li").hasClass("active") ){
				$(this).parent("li").removeClass("active");
				$(this).children(".open-icon").hide();
				$(this).children(".close-icon").show();
				$(this).siblings(".gnb-2dep").slideUp(400);					
			}
			/* 2dep가 닫혀있을때 */ 
			else{
				$gnbMList.children("li:has('.gnb-2dep')").each(function() {
					if ( $(this).hasClass("active") ){
						$(this).removeClass("active");
						$(this).find(".open-icon").hide();
						$(this).find(".close-icon").show();
						$(this).children(".gnb-2dep").slideUp(400);
					}
				});	
				$(this).parent("li").addClass("active");
				$(this).children(".close-icon").hide();
				$(this).children(".open-icon").show();
				$(this).siblings(".gnb-2dep").slideDown(400);
			}
			return false;
			//$(this).parent("li").addClass("active");
			//$(this).siblings(".gnb-2dep").slideUp(400);
		});
	}
});