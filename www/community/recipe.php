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

<?
$code = "receip";

switch($bgu){
	case "list":
		include "../bbs/bbs_list.php";
	break;

	case "view":
		include "../bbs/bbs_view.php";
	break;

	case "write":
		include "../bbs/bbs_write.php";
	break;

	case "edit":
		include "../bbs/bbs_edit.php";
	break;

	case "pass":
		include "../bbs/bbs_passwd.php";
	break;

	default :
		include "../bbs/bbs_list.php";
	break;
}
?>						

                	<!-- List ->
					<div class="gallery">
						<div class="titSec">
							<span class="totalNo">1 / 340pages</span>
						</div>						
						<!-- 리스트 ->
						<div class="gy_lists">
							<ul>
								<li>
									<a href="recipe_view.php">
										<img src="../images/recipe_thumb1.jpg" alt="">
										<h4>수수곡물 브레드</h4>
										<span class="id_date">
											<span>2015.07.10</span>
										</span>
									</a>
								</li>
								<li>
									<a href="#">
										<img src="../images/recipe_thumb2.jpg" alt="">
										<h4>수수프로방스</h4>
										<span class="id_date">
											<span>2015.07.10</span>
										</span>
									</a>
								</li>
								<li>
									<a href="#">
										<img src="../images/recipe_thumb3.jpg" alt="">
										<h4>수수팥 치즈고로케</h4>
										<span class="id_date">
											<span>2015.07.10</span>
										</span>
									</a>
								</li>
								<li class="mrLast">
									<a href="#">
										<img src="../images/recipe_thumb4.jpg" alt="">
										<h4>콘수수 브레드</h4>
										<span class="id_date">
											<span>2015.07.10</span>
										</span>
									</a>
								</li>
								<li>
									<a href="#">
										<img src="../images/recipe_thumb5.jpg" alt="">
										<h4>수수팥빵</h4>
										<span class="id_date">
											<span>2015.07.10</span>
										</span>
									</a>
								</li>
								<li>
									<a href="#">
										<img src="../images/recipe_thumb6.jpg" alt="">
										<h4>보리 베이글</h4>
										<span class="id_date">
											<span>2015.07.10</span>
										</span>
									</a>
								</li>
								<li>
									<a href="#">
										<img src="../images/recipe_thumb7.jpg" alt="">
										<h4>보리빵</h4>
										<span class="id_date">
											<span>2015.07.10</span>
										</span>
									</a>
								</li>
								<li class="mrLast">
									<a href="#">
										<img src="../images/recipe_thumb8.jpg" alt="">
										<h4>건포도호두 보리빵</h4>
										<span class="id_date">
											<span>2015.07.10</span>
										</span>
									</a>
								</li>
							</ul>
						</div>
						<!-- 리스트 //-->				
						<!-- 페이징 ->
						<div class="pagination">
							<a href="#" class="first"><img src="../images/board/btn_first.gif" alt="First"></a>
							<a href="#" class="prev"><img src="../images/board/btn_prev.gif" alt="Previous"></a>
							&nbsp;
							<a href="#">1</a>
							<strong>2</strong>
							<a href="#">3</a>
							<a href="#">4</a>
							<a href="#">5</a>
							<a href="#">6</a>
							<a href="#">7</a>
							<a href="#">8</a>
							<a href="#">9</a>
							<a href="#">10</a>
							&nbsp;
							<a href="#" class="next"><img src="../images/board/btn_next.gif" alt="Next"></a>
							<a href="#" class="last"><img src="../images/board/btn_last.gif" alt="Last"></a>							
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
									<input type="image" src="../images/board/btn_search_01.gif" title="검색" class="btn_sch"></input>
								</div>
							</div>
						</form>
						<!-- 검색 //->
					</div>
					<!-- List //-->
                </div>
            </section>
            <!-- //contents -->
        </div>
<? include "../include/footer.php"; ?>