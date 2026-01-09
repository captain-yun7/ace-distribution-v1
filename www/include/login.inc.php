<script language="javascript">
<!--
// 메인 로그인
function loginSend() {
	var form=document.login_form;
	if(form.userid.value=="") {
		alert("아이디를 입력해 주십시오.");
		form.userid.focus();
	} else if(form.userid.value.length < 4 || form.userid.value.length > 21) {
			alert("회원 아이디는 4~20자로 입력 주세요.");
			form.userid.focus();
	} else if(form.passwd.value=="") {
		alert("패스워드를 입력해 주십시오.");
		form.passwd.focus();
	} else if(form.passwd.value.length < 4 || form.passwd.value.length > 21) {
		alert("패스워드는 4~20자로 입력 주세요.");
		form.passwd.focus();
	} else {
		form.submit();
	}
}

function loginInputSendit() {
	if(event.keyCode==13) { 
		loginSend();
	}
}
//-->
</script>
<table width="169" border="0" cellpadding="0" cellspacing="0" id="login">
	<tr> 
		<td width="169" height="27"><img src="images/bar_login.gif" width="169" height="27"></td>
	</tr>
	<tr> 
		<td align="center"><table width="160" border="0" cellpadding="0" cellspacing="0" class="menu">
			<form name="login_form" method="post" action="login_ok.php" onsubmit="loginInputSendit();event.returnValue = false;">
			<input type="hidden" name="login" value="1">
			<?if($_SESSION[USERID] && $_SESSION[PASSWD]) {?>
			<tr> 
				<td height="12" align="center"></td>
			</tr>
			<tr> 
				<td height="25">&nbsp;&nbsp;&nbsp;&nbsp;<? if($_SESSION[LEVEL]==1) {?><img src="images/icon_member1.gif"alt="일반회원" border="0" align="absmiddle"><?} else if($_SESSION[LEVEL]==2) {?><img src="images/icon_member2.gif"alt="특별회원" border="0" align="absmiddle"><?}?>&nbsp;<font color="#5A86D6"><strong><?=$_SESSION[NAME];?></strong></font>님</td>
			</tr>
			<tr> 
				<td height="25" align="right">즐거운 쇼핑을 하세요&nbsp;&nbsp;</td>
			</tr>
			<tr> 
				<td height="33" align="center"><a href="login_ok.php?logout=1"><img src="images/bt_logout.gif" width="75" height="22" border=0 alt="로그아웃"></a>&nbsp;<a href="my_member_edit.php"><img src="images/bt_memedit.gif" width="75" height="22" border=0 alt="정보변경"></a></td>
			</tr>
			<?} else {?>
			<tr> 
				<td height="12" align="center"></td>
			</tr>
			<tr> 
				<td height="25" align="center"><img src="images/id.gif" width="54" height="19" align="absmiddle"> 
				<input name="userid" type="text" class="input" size="14"></td>
			</tr>
			<tr> 
				<td height="25" align="center"><img src="images/passwd.gif" width="54" height="19" align="absmiddle"> 
				<input name="passwd" type="password" class="input" size="14" onKeyDown="loginInputSendit();"></td>
			</tr>
			<tr> 
				<td height="33" align="center"><a href="javascript:loginSend();"><img src="images/bt_login.gif" width="75" height="22" border="0"></a>&nbsp;<a href="join.php"><img src="images/bt_join.gif" width="75" height="22" border="0"></a></td>
			</tr>
			<?}?>
			</form>
		</table></td>
	</tr>
	<tr height="1"> 
		<td height="1" bgcolor="B5B6B5"></td>
	</tr>
</table>