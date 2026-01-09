<?
$oneNum = "4";
$twoNum = "0";
?>
<? include "../include/dtd.php"; ?>
<? include "../include/header.php"; ?>
<div id="sub_visual">
	<div class="sv_4">
		<strong class="page-tit">RECRUIT</strong>
		<p class="sub-tit">최고로 엄선된 재료만을 <br> 제공해 드립니다.</p>
	</div>  
</div>
<div class="menu-location location2 cm-drop-menu-box-JS" data-drop-event="click">
	<button class="cur-location cm-drop-open-btn-JS">
		<span>구직</span>
		<i class="xi-angle-down-min"></i>
	</button>
	<ul class="location-menu-con cm-drop-list-JS">
		<li><a href="/mobile/recruit/offer_01.php">구인</a></li>
		<li class="on"><a href="/mobile/recruit/offer_02.php">구직</a></li>
	</ul>	
</div>
<div id="content" class="sub_cont">
	<div class="area-padding-m">
		<div class="recruit-page">


<?
$code = "gujik";

switch($bgu){
	case "list":
		include $_SERVER['DOCUMENT_ROOT']."/bbs/bbs_list_m.php";
	break;

	case "view":
		include $_SERVER['DOCUMENT_ROOT']."/bbs/bbs_view.php";
	break;

	case "write":
		include $_SERVER['DOCUMENT_ROOT']."/bbs/bbs_write_m.php";
	break;

	case "edit":
		include $_SERVER['DOCUMENT_ROOT']."/bbs/bbs_edit_m.php";
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
					<div>
						<form id="" name="" action="q_a.php">
							<fieldset>
								<legend>글쓰기</legend>
								<table class="board_write">
								<colgroup>
								<col width="125px" />
								<col width="" />
								</colgroup>
								<tbody>
								<tr>
									<th scope="row">제목</th>
									<td>
										<input type="text" class="ib500">
									</td>
								</tr>
								<tr>
									<th scope="row">업체</th>
									<td class="myid"><input type="text" class="ib170" /></td>
								</tr>
								<tr>
									<th scope="row">첨부파일</th>
									<td>
										<input type="file" class="500">
									</td>
								</tr>
								<tr>
									<th scope="row">이름</th>
									<td>
										<input type="text" class="ib500">
									</td>
								</tr>
								<tr>
									<th scope="row">연락처</th>
									<td>
										<input type="text" class="ib500">
									</td>
								</tr>
								<tr>
									<th scope="row">경력사항</th>
									<td>
										<input type="text" class="ib500">
									</td>
								</tr>
								<tr>
									<th scope="row">기타사항</th>
									<td>
										<input type="text" class="ib500">
									</td>
								</tr>
								<tr>
									<td colspan="2"><textarea name="" style="width:100%;height:350px;margin-left:-10px" placeholder="내용을 입력해주세요!"></textarea> <!-- 에디터로 대체 -></td>
								</tr>
								<tr>
									<th scope="row">비밀번호</th>
									<td>
										<input type="password" class="ib50" /> <span class="add_tx">※ 수정/삭제 시 필요</span>
									</td>
								</tr>
								</tbody>
								</table>
							</fieldset>
							<div class="btnSec tr">
								<span class="button large blue"><input type="submit" value="확인"></span>
							</div>
						</form>
					</div>-->
		</div>
		<? include "../include/foot_inquiry.php"; ?>
	</div>
</div>
<? include "../include/footer.php"; ?>