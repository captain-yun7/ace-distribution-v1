<?
$oneNum = "2";
$twoNum = "0";
?>
<? include "../include/dtd.php"; ?>
<? include "../include/header.php"; ?>

	<div id="sub_visual">
		<div class="sv_3">
			<strong class="page-tit">COMMUNITY</strong>
			<p class="sub-tit">최고로 엄선된 재료만을 <br> 제공해 드립니다.</p>
		</div>   
	</div>
	<div class="menu-location location2 cm-drop-menu-box-JS" data-drop-event="click">
		<button class="cur-location cm-drop-open-btn-JS">
			<span>공지사항</span>
			<i class="xi-angle-down-min"></i>
		</button>
		<ul class="location-menu-con cm-drop-list-JS">
			<li class="on"><a href="/mobile/community/notice.php">공지사항</a></li>
			<li><a href="/mobile/community/press.php">보도자료</a></li>
			<li><a href="/mobile/community/recipe.php">레시피</a></li>
			<li><a href="/mobile/community/qna.php">QNA</a></li>
		</ul>	
	</div>
	<div id="content" class="sub_cont">
          <div class="area-padding-m">

<?
$code = "notice";

switch($bgu){
	case "list":
		include $_SERVER['DOCUMENT_ROOT']."/bbs/bbs_list_m.php";
	break;

	case "view":
		include $_SERVER['DOCUMENT_ROOT']."/bbs/bbs_view.php";
	break;

	case "write":
		include $_SERVER['DOCUMENT_ROOT']."/bbs/bbs_write.php";
	break;

	case "edit":
		include $_SERVER['DOCUMENT_ROOT']."/bbs/bbs_edit.php";
	break;

	case "pass":
		include $_SERVER['DOCUMENT_ROOT']."/bbs/bbs_passwd.php";
	break;

	default :
		include $_SERVER['DOCUMENT_ROOT']."/bbs/bbs_list_m.php";
	break;
}
?>


<!--

			<div class="board_list">
				<div class="titSec">
					<span class="totalNo">Total : 5</span>
				</div>						
						<!-- 리스트 ->
				<table>
					<colgroup>
						<col width="40px">
						<col width="*">
						<col width="s">
						<col width="40px">
					</colgroup>
					<thead>
						<tr>
							<th>번호</th>
							<th>제목</th>
							<th>등록일</th>
							<th>조회</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>공지</td>
							<td class="tl">
								<a href="notice_view.php" class="notice">공지사항입니다.</a> <img src="/images/board/icon_new.gif" alt="New"> <!-- 공지글 class="notice" ->
							</td>
							<td data-label="등록일">2015.07.10</td>
							<td data-label="조회">189</td>
						</tr>
						<tr>
							<td>19</td>
							<td class="tl">
								<a href="#">신규 제휴처 안내</a>
							</td>
							<td data-label="등록일">2015.07.10</td>
							<td data-label="조회">189</td>
						</tr>
						<tr>
							<td>18</td>
							<td class="tl">
								<a href="#">사무실 이전 공지드립니다.</a>
							</td>
							<td data-label="등록일">2015.07.10</td>
							<td data-label="조회">98</td>
						</tr>
					</tbody>
				</table>
				<!-- 페이징 ->
				<div class="pagination">
					<!-- <a href="#" class="first"><img src="../images/board/btn_first.gif" alt="First"></a> ->
					<a href="#" class="prev"><img src="/images/board/btn_prev.gif" alt="Previous"></a>
					<a href="#">1</a>
					<strong>2</strong>
					<a href="#">3</a>
					<a href="#">4</a>
					<a href="#" class="next"><img src="/images/board/btn_next.gif" alt="Next"></a>
					<!-- <a href="#" class="last"><img src="../images/board/btn_last.gif" alt="Last"></a> ->							
				</div>
				<!-- 페이징 //->	
				<!-- 검색 ->
				<form id="" name="" action="">
					<div class="srh_b">
						<div class="select_search">
							<select name="">
								<option value="">제목</option>
								<option value="">등록일</option>
							</select>
							<input type="text" class="ib170" placeholder="검색어를 입력하세요">
							<input type="image" src="/images/mobile/search_icon_box.png" title="검색" class="btn_sch"></input>
						</div>
					</div>
				</form>
				<!-- 검색 //-->
			</div>
			<? include "../include/foot_inquiry.php"; ?>
		</div>
	</div>
<? include "../include/footer.php"; ?>