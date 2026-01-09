<?
$oneNum = "2";
$twoNum = "2";
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
		<span>레시피</span>
		<i class="xi-angle-down-min"></i>
	</button>
	<ul class="location-menu-con cm-drop-list-JS">
		<li><a href="/mobile/community/notice.php">공지사항</a></li>
		<li><a href="/mobile/community/press.php">보도자료</a></li>
		<li class="on"><a href="/mobile/community/recipe.php">레시피</a></li>
		<li><a href="/mobile/community/qna.php">QNA</a></li>
	</ul>	
</div>
<div id="content" class="sub_cont">
	<div class="area-padding-m">
		<div class="recipe-page">


<?
$code = "receip";

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


			<!-- List ->
					<div class="gallery">
						<div class="titSec">
							<span class="totalNo">Total : 9</span>
						</div>						
						<!-- 리스트 ->
						<div class="gy_lists">
							<ul>
								<li>
									<a href="recipe_view.php">
										<img src="/images/recipe_thumb1.jpg" alt="">
										<div class="info-bottom">
											<h4>수수곡물 브레드</h4>
											<span class="id_date">
												<span>2015.07.10</span>
											</span>
										</div>
									</a>
								</li>
								<li>
									<a href="#">
										<img src="/images/recipe_thumb2.jpg" alt="">
										<h4>수수프로방스</h4>
										<div class="info-bottom">
											<span class="id_date">
												<span>2015.07.10</span>
											</span>
										</div>
									</a>
								</li>
								<li>
									<a href="#">
										<img src="/images/recipe_thumb3.jpg" alt="">
										<h4>수수팥 치즈고로케</h4>
										<div class="info-bottom">
											<span class="id_date">
												<span>2015.07.10</span>
											</span>
										</div>
									</a>
								</li>
								<li class="mrLast">
									<a href="#">
										<img src="/images/recipe_thumb4.jpg" alt="">
										<h4>콘수수 브레드</h4>
										<div class="info-bottom">
											<span class="id_date">
												<span>2015.07.10</span>
											</span>
										</div>
									</a>
								</li>								
							</ul>
						</div>
						<!-- 리스트 //-->				
						<!-- 페이징 ->
						<div class="pagination">
							<a href="#" class="prev"><img src="/images/board/btn_prev.gif" alt="Previous"></a>
							<a href="#">1</a>
							<strong>2</strong>
							<a href="#">3</a>
							<a href="#">4</a>
							<a href="#" class="next"><img src="/images/board/btn_next.gif" alt="Next"></a>						
						</div>
						<!-- 페이징 //-->				
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
					<!-- List //-->
		</div>
		<? include "../include/foot_inquiry.php"; ?>
	</div>
</div>

<? include "../include/footer.php"; ?>