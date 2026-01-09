<? $mod=menu02 ?>
<?
include("../header.php");
include($ROOT_DIR.'/lib/style_class.php');
?>

<script language="JavaScript">
<!--
// 폼 전송
function bbsSendit() {
	var form=document.bbs_reg_form;
	if(form.name.value=="") {
		alert("게시판 제목을 입력해 주십시오.");
		form.name.focus();
	} else if( form.code.value=="") {
		alert("게시판 코드를 입력해 주십시오.");
		form.code.focus();
	} else {
		form.submit();			
	}
}

// 뉴 마크
function newCheck() {
	var form=document.bbs_reg_form;
	if(form.new_check.checked  == true ) {
		form.new_mark.disabled = false;
	} else {
		form.new_mark.disabled = true;			
	}
}

// 쿨 마크
function coolCheck() {
	var form=document.bbs_reg_form;
	if(form.cool_check.checked  == true ) {
		form.cool_mark.disabled = false;
	} else {
		form.cool_mark.disabled = true;			
	}
}

// 게시판 형태
function artCheck() {
	var form=document.bbs_reg_form;
	if(form.bbs_type[0].checked ) {
		form.list_width.disabled = true;
		form.list_width.value="0";
		form.list_height.value = 15;
	} else if(form.bbs_type[1].checked ) {
		form.list_width.value="0";
		form.list_width.disabled = true;
		form.bbs_coment[1].checked = true;
		form.bbs_pds[1].checked = true;
		form.list_height.value = 15;
	} else if(form.bbs_type[2].checked ) {
		form.bbs_pds[0].checked = true;
		form.list_width.disabled = false;
		form.list_width.value = 4;
		form.list_height.value = 16;
	}
}
//-->
</script>

<div class="span10">
			
			<form name="bbs_reg_form" action="bbs_admin_reg_ok.php" method="post">
			<input type="hidden" name="bbs_admin_reg" value="true">
			<input type=hidden name="new_check" value="1">
			<input type=hidden name="new_mark" value="24">
			<input type=hidden name="view" value="0">
			
						<table class="table table-bordered table-condensed ">

							<tr> 
								<th><strong>게시판명</strong></th>
								<td> <input name="name" type="text" class="form-control2" size="30" maxlength="50" ></td>
								<th><strong>게시판코드</strong></th>
								<td> <input name="code" type="text" class="form-control2" maxlength="20" ></td>
							</tr>

							<tr> 
								<th><strong>게시판타입</strong></th>
								<td> <input type="radio" name="bbs_type" value="1" onClick="artCheck()" checked> 답변형 <input type="radio" name="bbs_type" value="2" onClick="artCheck()"> 공지사항형 <input type="radio" name="bbs_type" value="3" onClick="artCheck()"> 갤러리형 <input type="radio" name="bbs_type" value="4" onClick="artCheck()"> FAQ형</td>
								<th><strong>비밀글기능</strong></th>
								<td><input type="radio" name="bbs_secret" value="1"> 사용함 <input type="radio" name="bbs_secret" value="0" checked> 사용안함</td>
							</tr>
							
							<tr> 
								<th><strong>자료실사용</strong></td>
								<td> 
								<input type="radio" name="bbs_pds" value="1"> 사용함  
								<select name="bbs_pds_ea" class="form-control2">
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								</select>개&nbsp;
								<input type="radio" name="bbs_pds" value="0" checked> 사용안함
								</td>
								<th><strong>코멘트기능</strong></td>
								<td> <input type="radio" name="bbs_coment" value="1"> 사용함 <input type="radio" name="bbs_coment" value="0" checked> 사용안함	</td>
							</tr>
							
							<tr> 
								<th><strong>접근권한</strong></th>
								<td> <input type="radio" name="bbs_access" value="0" checked> 비회원 <input type="radio" name="bbs_access" value="1"> 회원 </td>
								<th><strong>읽기권한</strong>
								<td> <input type="radio" name="bbs_read" value="0" checked> 비회원 <input type="radio" name="bbs_read" value="1"> 회원</td>
							</tr>

								<th><strong>쓰기권한</strong></th>
								<td> <input type="radio" name="bbs_write" value="0" checked> 비회원 <input type="radio" name="bbs_write" value="1"> 회원 <input type="radio" name="bbs_write" value="9"> 관리자 </td>
								<th><strong>가로목록수</strong></td>
								<td height="25"> <input name="list_width" type="text" class="form-control2" > 개 (갤러리형 경우) <script language="javascript">	document.bbs_reg_form.list_width.disabled = true;	document.bbs_reg_form.list_width.value="0";</script></td>
							</tr>

							<tr> 
								<th><strong>리스트수</strong></th>
								<td > <input name="list_height" type="text" class="form-control2" value="15" >줄(갤러리는 개수)</td>
								<th><strong>페이지수</strong></th>
								<td> <input name="list_page" type="text" class="form-control2"  value="10" >페이지</td>
							</tr>



							
							<tr> 
								<th><strong>편집게시판사용</strong></th>
								<td height="25">
								<input type="checkbox" name="editor" value="1"> 사용함
								</td>
								<th><strong>스팸처리</strong></th>
								<td> <input type="checkbox" name="nospam" value="1"> 스팸차단사용</td>
							</tr>

							

						</table>

						<div style="text-align:center;" class="submitBtn">
							<div class="submitBtnBtn">
								
								<a href="javascript:bbsSendit();" class="btn btn-primary btn-large">저장하기</a>
								
							</div>
						</div>

						<br><br>



		</form>
</div>

</div>

<? include('../footer.php');?>