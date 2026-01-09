<?
$oneNum = "0";
$twoNum = "1";
?>
<? include "../include/dtd.php"; ?>
<? include "../include/header.php"; ?>
	<div id="sub_visual">
		<div class="sv_1">
			<strong class="page-tit">ABOUT US</strong>
			<p class="sub-tit">최고로 엄선된 재료만을 <br> 제공해 드립니다.</p>
		</div>   
	</div>	
	<div class="menu-location location2 cm-drop-menu-box-JS" data-drop-event="click">
		<button class="cur-location cm-drop-open-btn-JS">
			<span>찾아오시는 길</span>
			<i class="xi-angle-down-min"></i>
		</button>
		<ul class="location-menu-con cm-drop-list-JS">
			<li><a href="/mobile/about/greeting.php">인사말</a></li>
			<li class="on"><a href="/mobile/about/location.php">찾아오시는 길</a></li>
		</ul>	
	</div>
     <div id="content" class="sub_cont">
          <div class="area-padding-m">
			<!-- contents -->
			<section class="contSec location">
				<div class="cont">
					<!-- * Daum 지도 - 지도퍼가기 -->
					<!-- 1. 지도 노드 -->
					<div id="daumRoughmapContainer1466149952570" class="root_daum_roughmap root_daum_roughmap_landing loca-box"></div>
					
					<!--
					    2. 설치 스크립트
					    * 지도 퍼가기 서비스를 2개 이상 넣을 경우, 설치 스크립트는 하나만 삽입합니다.
					-->
					<script charset="UTF-8" class="daum_roughmap_loader_script" src="http://dmaps.daum.net/map_js_init/roughmapLoader.js"></script>
					
					<!-- 3. 실행 스크립트 -->
					<script charset="UTF-8">
					    new daum.roughmap.Lander({
						   "timestamp" : "1466149952570",
						   "key" : "ben9",
						   "mapWidth" : "330",
						   "mapHeight" : "350"
					    }).render();
					</script>
					<table class="location_info">
					    <colgroup>
					    <col width="80px">
					    <col width="*">
					    </colgroup>
					    <tbody>
						   <tr>
							  <th>주소</th>
							  <td>경기도 하남시 샘재로119번길31(천현동 392-3)</td>
						   </tr>
						   <tr>
							  <th>연락처</th>
							  <td>Tel. 02) 471-1644~6<br />
								Fax. 02) 476-1372<br />
								Email. ace32865@hanmail.net</td>
						   </tr>
					    </tbody>
                        </table>
				</div>
			</section>
			  <!-- //contents -->
			
			<? include "../include/foot_inquiry.php"; ?>
		</div>
	</div>
		  
<? include "../include/footer.php"; ?>