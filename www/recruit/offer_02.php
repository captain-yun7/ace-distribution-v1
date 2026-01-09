<?
$oneNum = "3";
$twoNum = "1";
?>
<? include "../include/header.php"; ?>
<? if($_SESSION[USERID]==""){ $tools->javaGo("/member/login.php"); exit; } ?>
<div class="sub_visual">
	<div class="test"></div>
</div>
	<div id="content" class="sub_cont">
        	<? include "left.php"; ?>
			<!-- contents -->
			<section class="contSec q_a">
                <h4>구직</h4>
                <div class="path">구인구직<span class="path_bar">></span>구직</div>
                <div class="cont">

<?
$mem_row = $db->object("cs_member","where userid='$_SESSION[USERID]'");

$code = "gujik";

switch($bgu){
	case "list":
		include $_SERVER['DOCUMENT_ROOT']."/bbs/bbs_list.php";
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
		include $_SERVER['DOCUMENT_ROOT']."/bbs/bbs_list.php";
	break;
}
?>


                	<!-- Write 
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
									<td colspan="2"><textarea name="" style="width:100%;height:350px;margin-left:-10px" placeholder="내용을 입력해주세요!"></textarea> <!-- 에디터로 대체 </td>
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
					</div>
					<!-- Write //-->
                </div>
            </section>
		
<? include "../include/footer.php"; ?>