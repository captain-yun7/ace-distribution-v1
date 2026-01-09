<? $mod=menu07 ?>
<? $menu = "02"; ?>
<? include('../header.php');?>

<script language="javascript">
<!--
function sendit() {
	var form=document.banner_form;
	if(form.title.value=="") {
		alert("배너명을 입력해 주세요.");
		form.title.focus();
	} else if(form.display[0].checked==true && form.content.value=="") {
		alert("팝업창 내용을 입력해 주세요.");
		form.content.focus();
	} else {
		form.submit();
	}
}

//  웹FTP 새창 오픈
function ftpWinOpen() {
	window.open("../webftp.php","","scrollbars=yes, width=500, height=600");
}

// TEXTAREA 입력 폼 크기 조정
function textarea_resize( formname, size ) {
	if( size=='reset' ){
		formname.rows = 10;
	}else{
		var value = formname.rows + size;
		if(value>11) formname.rows = value;
		else return;
	}
}

function bannerReg() {
	var form=document.banner_form;
	if( form.display[0].checked ) {
		document.all.banner_view[0].style.display="none"; 
		document.all.banner_view[1].style.display="none"; 
		document.all.banner_view[2].style.display="none"; 
		document.all.banner_view[3].style.display=""; 
	} else if( form.display[1].checked ) {
		document.all.banner_view[0].style.display=""; 
		document.all.banner_view[1].style.display=""; 
		document.all.banner_view[2].style.display=""; 
		document.all.banner_view[3].style.display="none"; 
	}
}
//-->
</script>

<div class="span10">
<div>
	<h3 class="page-header">배너등록</h3>
</div>

	<form action="banner_add_ok.php" method="post" name="banner_form" enctype="multipart/form-data">
			
			<table class="table table-bordered table-hover ">
				<tr> 
					<td width="200" height="25" align="center" bgcolor="EFEFEF">형태 선택</td>
					<td>
					<input type="radio" name="display" value="0" onclick="bannerReg();"> HTML
					<input type="radio" name="display" value="1" onclick="bannerReg();" checked> 이미지(gif, jpg) 
					</td>
				</tr>
				<tr> 
					<td width="200" height="25" align="center" bgcolor="EFEFEF">배너 위치 선택</td>
					<td>
						<input type="radio" name="status" value="1" checked> 메인중앙&nbsp; 
						<input type="radio" name="status" value="2"> 메인하단&nbsp;
						<input type="radio" name="status" value="0"> 미사용
					</td>
				</tr>
				<tr> 
					<td width="200" height="25" align="center" bgcolor="EFEFEF">배너명</td>
					<td><input name="title" type="text" class="input" size="70"> (간단한 설명)</td>
				</tr>
				<tr id="banner_view" style="display:none;"> 
					<td width="200" height="25" align="center" bgcolor="EFEFEF">배너 링크URL</td>
					<td>HTTP://<input name="link_url" type="text" style="width:500px;"></td>
				</tr>
				<tr id="banner_view" style="display:none;"> 
					<td width="200" height="25" align="center" bgcolor="EFEFEF">링크URL 타겟</td>
					<td><input type="radio" name="target" value="0" checked> 새창 <input type="radio" name="target" value="1"> 현재창</td>
				</tr>
				<tr id="banner_view" style="display:none;"> 
					<td width="200" height="25" align="center" bgcolor="EFEFEF">배너이미지파일</td>
					<td><input name="banner_images" type="file" class="input" size="60"></td>
				</tr>
				<tr id="banner_view" style="display:none;"> 
					<td width="200" height="25" align="center" bgcolor="EFEFEF">배너 출력 내용</td>
					<td><textarea name="content" style="width:500px;height:300px;"></textarea>
				</tr>
				<tr align="center"> 
					<td height="25" colspan="2" bgcolor="EFEFEF"><img src="../images/arrow2.gif" width="7" height="7"> 등록하신 배너는 스킨에 따라 사용자화면에 다르게 출력되는 경우도 있습니다.</td>
				</tr>
			</table><br>
			<table width="100%" border="0" cellpadding="0" cellspacing="0" class="menu">
				<tr> 
					<td height="50" align="center"><a href="javascript:sendit();" class="btn btn-primary">등록</a></td>
				</tr>
			</table>
	</form>

</div>
</div>

<script language="JavaScript">
<!--
var form=document.banner_form;
if( form.display[0].checked ) {
	document.all.banner_view[0].style.display="none"; 
	document.all.banner_view[1].style.display="none"; 
	document.all.banner_view[2].style.display="none"; 
	document.all.banner_view[3].style.display=""; 
} else if( form.display[1].checked ) {
	document.all.banner_view[0].style.display=""; 
	document.all.banner_view[1].style.display=""; 
	document.all.banner_view[2].style.display=""; 
	document.all.banner_view[3].style.display="none"; 
}
//-->
</script>
<? include('../footer.php');?>
