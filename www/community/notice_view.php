<?
$oneNum = "2";
$twoNum = "0";
?>
<? include "../include/header.php"; ?>
		<? include "../include/sub_visual.php"; ?>	
        <div id="content" class="sub_cont">
        	<? include "left.php"; ?>
            <!-- contents -->
            <section class="contSec notice">
                <h4>공지사항</h4>
                <div class="path">커뮤니티<span class="path_bar">></span>공지사항</div>
                <div class="cont">
                	<!-- View -->
					<div class="board_view">						
						<!-- 제목 -->
						<div class="tit_sec">
							<span class="tit">공지사항입니다. <img src="../images/board/icon_new.gif" alt="New"></span>
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
							<p class="mt10">
                            	공지사항입니다.<br><br><br><br>
                            </p>
						</div>
						<!-- 내용// -->						
						<div class="btnSec tr">
							<span class="button large blue"><a href="#">삭제</a></span>
							<span class="button large blue"><a href="#">답글</a></span>
							<span class="button large blue"><a href="#">수정</a></span>
							<span class="button large blue"><a href="notice.php">목록</a></span>
						</div>						
					</div>
					<!-- View //-->
                </div>
            </section>
            <!-- //contents -->
        </div>
<? include "../include/footer.php"; ?>