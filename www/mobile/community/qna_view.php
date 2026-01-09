<?
$oneNum = "2";
$twoNum = "3";
?>
<? include "../include/dtd.php"; ?>
<? include "../include/header.php"; ?>
<div id="sub_visual">
	<div class="sv_3">
		<strong class="page-tit">COMMUNITY</strong>
		<p class="sub-tit">최고로 엄선된 재료만을 <br> 제공해 드립니다.</p>
	</div>   
</div>
<div id="content" class="sub_cont">
	<div class="area-padding-m">
		<div class="qna-view-page">
			<!-- View -->
					<div class="board_view">						
						<!-- 제목 -->
						<div class="tit_sec">
							<span class="tit">Q&amp;A 게시판입니다. <img src="/images/board/icon_new.gif" alt="New"></span>
							<div class="date">
								<img src="/images/board/icon_writer.gif" alt=""> <strong>작성자</strong> : 관리자
								<span>2015.07.10</span> <span>HIT 159</span>
							</div>
						</div>
						<!-- 제목 //-->						
						<!-- 내용 -->
						<div class="con">
							<!-- 첨부파일이 있을경우 노출 -->
							<div class="attached">
								<img src="/images/board/icon_attached.gif" alt="첨부파일"><a href="#">첨부파일.zip</a>
							</div>
							<!-- 첨부파일이 있을경우 노출 //-->
							<p class="mt10">Q&A 게시판입니다.<br /><br /></p>
						</div>
						<!-- 내용// -->						
						<div class="btnSec tr">
							<!-- <span class="btn"><a href="#">삭제</a></span>
							<span class="btn"><a href="#">답글</a></span>
							<span class="btn"><a href="#">수정</a></span> -->
							<span class="btn"><a href="qna.php">목록</a></span>
						</div>					
                        <!-- 이전글,다음글 -->
                        <div class="prev_next mt50">
                            <table summary="">
                            <colgroup>
                            <col width="110px">
                            </colgroup>
                            <tr>
                                <th>PREV <img src="/images/board/btn_prev_arrow.png" alt=""></th>
                                <td>
                                    <a href="#">이전글이 없습니다.</a>
                                </td>
                            </tr>
                            <tr>
                                <th>NEXT <img src="/images/board/btn_next_arrow.png" alt=""></th>
                                <td>
                                    <a href="#">다음글이 없습니다.</a>
                                </td>
                            </tr>
                            </table>
                        </div>
                        <!-- 이전글,다음글 //-->						
					</div>
					<!-- View //-->
			<? include "../include/foot_inquiry.php"; ?>
		</div>
	</div>
</div>
<? include "../include/footer.php"; ?>