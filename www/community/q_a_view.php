<?
$oneNum = "2";
$twoNum = "3";
?>
<? include "../include/header.php"; ?>
		<? include "../include/sub_visual.php"; ?>	
        <div id="content" class="sub_cont">
        	<? include "left.php"; ?>
            <!-- contents -->
            <section class="contSec q_a">
                <h4>Q&amp;A</h4>
                <div class="path">커뮤니티<span class="path_bar">></span>Q&amp;A</div>
                <div class="cont">
                	<!-- View -->
					<div class="board_view">						
						<!-- 제목 -->
						<div class="tit_sec">
							<span class="tit">Q&amp;A 게시판입니다. <img src="../images/board/icon_new.gif" alt="New"></span>
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
							<p class="mt10">Q&A 게시판입니다.<br /><br /></p>
						</div>
						<!-- 내용// -->						
						<div class="btnSec tr">
							<span class="button large blue"><a href="#">삭제</a></span>
							<span class="button large blue"><a href="#">답글</a></span>
							<span class="button large blue"><a href="#">수정</a></span>
							<span class="button large blue"><a href="q_a.php">목록</a></span>
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