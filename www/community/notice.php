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


<?
$code = "notice";

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
					<div class="board_list">
						<div class="titSec">
							<span class="totalNo">1 / 340pages</span>
						</div>						
						<!-- 리스트 ->
						<table>
						<colgroup>
						<col width="60px">
						<col width="*">
						<col width="80px">
						<col width="60px">
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
									<a href="notice_view.php" class="notice">공지사항입니다.</a> <img src="../images/board/icon_new.gif" alt="New"> <!-- 공지글 class="notice" ->
								</td>
								<td>2015.07.10</td>
								<td>189</td>
							</tr>
							<tr>
								<td>19</td>
								<td class="tl">
									<a href="#">신규 제휴처 안내</a>
								</td>
								<td>2015.07.10</td>
								<td>189</td>
							</tr>
							<tr>
								<td>18</td>
								<td class="tl">
									<a href="#">사무실 이전 공지드립니다.</a>
								</td>
								<td>2015.07.10</td>
								<td>98</td>
							</tr>
							<tr>
								<td>17</td>
								<td class="tl">
									<a href="#">베스트 제품 추천!</a>
								</td>
								<td>2015.07.10</td>
								<td>98</td>
							</tr>
							<tr>
								<td>16</td>
								<td class="tl">
									<a href="#">새로운 제품이 나왔습니다~</a>
								</td>
								<td>2015.07.10</td>
								<td>98</td>
							</tr>
							<tr>
								<td>15</td>
								<td class="tl">
									<a href="#">홈페이지 오픈 안내!</a>
								</td>
								<td>2015.07.10</td>
								<td>98</td>
							</tr>
							<tr>
								<td>14</td>
								<td class="tl">
									<a href="#">게시글입니다.</a>
								</td>
								<td>2015.07.10</td>
								<td>98</td>
							</tr>
							<tr>
								<td>13</td>
								<td class="tl">
									<a href="#">게시글입니다.</a>
								</td>
								<td>2015.07.10</td>
								<td>98</td>
							</tr>
							<tr>
								<td>12</td>
								<td class="tl">
									<a href="#">게시글입니다.</a>
								</td>
								<td>2015.07.10</td>
								<td>98</td>
							</tr>
							<tr>
								<td>11</td>
								<td class="tl">
									<a href="#">게시글입니다.</a>
								</td>
								<td>2015.07.10</td>
								<td>98</td>
							</tr>
						</tbody>
						</table>
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