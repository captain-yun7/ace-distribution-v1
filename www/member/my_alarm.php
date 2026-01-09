<?
$page_num = "10";
$sub_num = "06";
$page_section = "member";
$sub_section = "login";
$page_info = "회원서비스";
$sub_info = "MY 알림";
include $_SERVER["DOCUMENT_ROOT"]."/lib/config.php";
include "../lib/config.php";
$sub_description = ""; // 페이지 설명(서브페이지) *필요시 사용
include "../lib/sub.php";
include $_SERVER["DOCUMENT_ROOT"].$site_directory."/include/dtd.php";
?>
<style>
/* 기본셋팅(지우셔도 됩니다.) */
#mypageCon{padding: 20px; max-width: 480px; margin: 0 auto;}
.order-prd-con-tit {letter-spacing: -0.3px; color: #444; font-size: 18px; line-height: 24px; margin-bottom: 10px; font-weight: 600;}
/* 알림설정 */
.alarm-setting-con{}
.alarm-setting-item{padding: 10px 0; border-bottom: 1px solid #ddd;}
.alarm-setting-con .alarm-setting-item:first-child{padding: 15px 0; border-top: 1px solid #ddd;}
.alarm-setting-tit{float: left; font-size: 14px; line-height: 30px; font-weight: 600; color: #444;}
.alarm-setting-tit.total{float: none; font-size: 15px; line-height: 1;}
.alarm-setting-tit span{display: inline-block; color: #ccc; font-size: 11px; line-height: 30px;}
.alarm-setting-tit span:before{margin: 0 10px; display: inline-block; content: '|'; display: inline-block; line-height: 30px; font-size: 10px; color: #ccc;}
.alarm-setting-tit i{display: inline-block; margin-left: 3px; color: #0ca5a6;}
.alarm-setting-txt{margin-top: 10px; font-size: 11px; line-height: 1.4; color: #999; font-weight: 400; -ms-word-break: keep-all; word-break: keep-all;}
.alarm-setting-btn{float: right; width: 50px;}
.alarm-setting-btn:before{display: block; content: '\e9cb'; font-family: xeicon; font-size: 30px; color: #ddd; -webkit-transition: all 0.3s; transition: all 0.3s;}
.alarm-setting-btn.on:before{content: '\e9cd'; color: #0ca5a6;}
.new-setting-btn{float: right; width: 70px; border: 1px solid #ddd; margin-top: 3px; font-size: 11px; height: 27px; letter-spacing: -0.25px; color: #ddd; -webkit-border-radius: 5px; border-radius: 5px;}
.new-setting-btn.on{border-color: #0ca5a6; color: #0ca5a6;}
</style>

<? include $_SERVER["DOCUMENT_ROOT"].$site_directory."/include/top.php"; ?>

	<section id="mypageCon" class="clearfix">
		<article id="shoppingCon">
			<!-- 알림 설정 -->
			<h4 class="order-prd-con-tit">알림 설정</h4>
			<article class="alarm-setting-con">
				<div class="alarm-setting-item clearfix">
					<h5 class="alarm-setting-tit total">알림<i class="xi-info-o"></i></h5>
					<p class="alarm-setting-txt">쿠폰, 이벤트 정보 등 ○○가 전달하는 새로운 메시지에 대한 PUSH 알림을 받을 수 있습니다.</p>
				</div>
				<div class="alarm-setting-item clearfix">
					<h5 class="alarm-setting-tit">SMS알림</h5>
					<button class="alarm-setting-btn on"></button><!-- 클릭하면 on클래스 붙혀주세요. -->
				</div>
				<div class="alarm-setting-item clearfix">
					<h5 class="alarm-setting-tit">푸시알림</h5>
					<button class="alarm-setting-btn"></button>
				</div>
				<div class="alarm-setting-item clearfix">
					<h5 class="alarm-setting-tit">이메일알림</h5>
					<button class="alarm-setting-btn"></button>
				</div>
				<div class="alarm-setting-item clearfix">
					<h5 class="alarm-setting-tit">캐시삭제<span>20.3MB 사용 중</span></h5>
					<button class="new-setting-btn on">삭제하기</button><!-- 사용할수 있을때 on클래스 붙혀주세요.(캐시삭제 할게 있거나 업데이트 할게 있을때) -->
				</div>
				<div class="alarm-setting-item clearfix">
					<h5 class="alarm-setting-tit">최신버전 4.4.4<span>현재버전 4.4.5</span></h5>
					<button class="new-setting-btn">업데이트</button>
				</div>
			</article>
			<!-- // -->
		</article>
	</section>

<? include $_SERVER["DOCUMENT_ROOT"].$site_directory."/include/bottom.php"; ?>