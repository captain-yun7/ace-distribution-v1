var lnbInterval, lnbDuration = 1000;
var curTwoNum;

$(function(){
	getURL();

	// on 붙은 게 포커싱
	//console.log(twoNum);
	curTwoNum = twoNum;
	if (twoNum > -1) {
		$("#lnb>ul>li").eq(twoNum).find(".lnbTwo").stop(true, true).slideDown(300).end().addClass("on");
		//$("#lnb>ul>li").eq(twoNum).find(".lnbTwo>a").eq(threeNum).addClass("on");
	}
	$("#lnb>ul>li").each(function(q){
		$(this).children("a").click(function(e){
			// 하위 메뉴가 없을 경우 링크를 태우고
			// 하위 메뉴가 있을 경우 링크 X 2014-01-23
			if ($(this).next("div").size()>0) {
				e.preventDefault();

				if(q != curTwoNum) {
					if (curTwoNum > -1) {
						$("#lnb>ul>li").eq(curTwoNum).removeClass("on");
						$("#lnb>ul>li").eq(curTwoNum).find(".lnbTwo").stop(true, true).slideUp(300);
					}
					curTwoNum = q;
					$("#lnb>ul>li").eq(curTwoNum).addClass("on");
					$("#lnb>ul>li").eq(curTwoNum).find(".lnbTwo").stop(true, true).slideDown(300);
				}
			}
		})
	})

	$("#lnb").mouseleave(function(){
		clearInterval(lnbInterval);
		lnbInterval = setInterval("lnbOut()", lnbDuration);
	}).mouseenter(function(){
		clearInterval(lnbInterval);
	});

})

function lnbOut()
{
	if (twoNum > -1) {
		if(curTwoNum != twoNum) {
			$("#lnb>ul>li").eq(curTwoNum).removeClass("on");
			$("#lnb>ul>li").eq(curTwoNum).find(".lnbTwo").stop(true, true).slideUp(300);
			curTwoNum = twoNum;
			$("#lnb>ul>li").eq(curTwoNum).addClass("on");
			$("#lnb>ul>li").eq(curTwoNum).find(".lnbTwo").stop(true, true).slideDown(300);
		}
	}
}

function getURL()
{
	// 회사소개
	if(location.pathname.indexOf("/mobile/about/greeting.php") > -1) {oneNum = 0; twoNum = 0;};
	//if(location.pathname.indexOf("/about/history.php") > -1) {oneNum = 0; twoNum = 1;};
	if(location.pathname.indexOf("/mobile/about/location.php") > -1) {oneNum = 0; twoNum = 1;};
	
	// 제품소개
	if(location.pathname.indexOf("/mobile/product/all_list.php") > -1) {oneNum = 1; twoNum = 0;};
	if(location.pathname.indexOf("/mobile/product/product_list.php") > -1) {
		oneNum = 1; twoNum = 1;

		var aak = location.href;
		var bbk = aak.split('/');
		var cck = bbk[4];
		var ddk = cck.split("=");
		if(ddk[1]){
		var eek = ddk[1];
		var ffk = eek.split("&");
		var ggk = ffk[0];
		}


		if(ggk=='1') {
			twoNum = 1;
		} else if(ggk=='2') {
			twoNum = 2;
		} else if(ggk=='3') {
			twoNum = 3;
		} else if(ggk=='12') {
			twoNum = 4;
		} else {
			twoNum = 0;
		};

	};
	
	// 커뮤니티
	if(location.pathname.indexOf("/mobile/community/notice.php") > -1) {oneNum = 2; twoNum = 0;};
	if(location.pathname.indexOf("/mobile/community/press.php") > -1) {oneNum = 2; twoNum = 1;};
	if(location.pathname.indexOf("/mobile/community/recipe.php") > -1) {oneNum = 2; twoNum = 2;};
	if(location.pathname.indexOf("/mobile/community/q_a.php") > -1) {oneNum = 2; twoNum = 3;};
	
	// 온라인 문의
	if(location.pathname.indexOf("/mobile/inquiry/inquiry.php") > -1) {oneNum = 3; twoNum = 0;};
			
};