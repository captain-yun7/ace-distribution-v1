<?
$oneNum = "0";
$twoNum = "1";
?><? include "../include/header.php"; ?>
<? include "../include/sub_visual.php"; ?>	
        <div id="content" class="sub_cont">
        	<? include "left.php"; ?>
            <!-- contents -->
            <section class="contSec about">
                <h4>찾아오시는길</h4>
                <div class="path">회사소개<span class="path_bar">></span>찾아오시는길</div>
                <div class="cont">
                    <!-- * Daum 지도 - 지도퍼가기 -->
                    <!-- 1. 지도 노드 -->
                    <div id="daumRoughmapContainer1466149952570" class="root_daum_roughmap root_daum_roughmap_landing"></div>
                    
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
                            "mapWidth" : "760",
                            "mapHeight" : "350"
                        }).render();
                    </script>
                        <table class="location_info">
                        <colgroup>
                        <col width="120px">
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
        </div>
<? include "../include/footer.php"; ?>