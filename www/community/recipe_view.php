<?
$oneNum = "2";
$twoNum = "2";
?>
<? include "../include/header.php"; ?>
		<? include "../include/sub_visual.php"; ?>	
        <div id="content" class="sub_cont">
        	<? include "left.php"; ?>
            <!-- contents -->
            <section class="contSec recipe">
                <h4>레시피</h4>
                <div class="path">커뮤니티<span class="path_bar">></span>레시피</div>
                <div class="cont">
                	<!-- View -->
                    <div class="board_view">						
                        <!-- 제목 -->
                        <div class="tit_sec">
                            <span class="tit">수수곡물 브레드 <img src="../images/board/icon_new.gif" alt="New"></span>
                            <div class="date">
                                <img src="../images/board/icon_writer.gif" alt=""> <strong>작성자</strong> : 관리자
                                <span>2015.07.10</span> <span>HIT 159</span>
                            </div>
                        </div>
                        <!-- 제목 //-->						
                        <!-- 내용 -->
                        <div class="con">
                            <!-- 첨부파일이 있을경우 노출 -->
                            <div class="attached">
                                <img src="../images/board/icon_attached.gif" alt="첨부파일"><a href="#">첨부파일.zip</a>
                            </div>
                            <!-- 첨부파일이 있을경우 노출 //-->
                            <p class="tc">
                            	<img src="../images/recipe_thumb1.jpg" alt="">
                            </p>
                            <p>
                                <strong>[만드는방법]</strong><br /><br />
                                1. 모든 재료를 넣고 믹싱한다. (반죽온도26℃) (믹싱1단 1분 -> 2단 8분)<br />
2. 반죽에 부재료를 넣고 고루 섞는다.<br />
3. 다 섞이면 동글게 말아 10분간 1차 발효한다.<br />
4. 발효된 반죽을 80g씩 분할한 다음 10분간 중간발효한다.<br />
5. 계란 모양으로 성형하고 50분간 2차 발효한다. (반죽온도 28℃, 습도 70%)<br />
6. 칼집을 한번 넣고 상 240℃, 하 190℃ 오븐에 스팀 주입 후 11분간 굽는다.<br />
                            <br />
                                <img src="../images/recipe_view_thumb.jpg" alt="">
                            </p>
                        </div>
                        <!-- 내용// -->		
                        <div class="btnSec tr">
                            <span class="button large blue"><a href="recipe.php">목록</a></span>
                        </div>	
                        <!-- 이전글,다음글 -->
                        <div class="prev_next mt50">
                            <table summary="">
                            <colgroup>
                            <col width="110px">
                            </colgroup>
                            <tr>
                                <th>PREV <img src="../images/board/btn_prev_arrow.png" alt=""></th>
                                <td>
                                    <a href="#">이전글이 없습니다.</a>
                                </td>
                            </tr>
                            <tr>
                                <th>NEXT <img src="../images/board/btn_next_arrow.png" alt=""></th>
                                <td>
                                    <a href="#">다음글이 없습니다.</a>
                                </td>
                            </tr>
                            </table>
                        </div>
                        <!-- 이전글,다음글 //-->					
                    </div>
                    <!-- View //-->
                </div>
            </section>
            <!-- //contents -->
        </div>
<? include "../include/footer.php"; ?>