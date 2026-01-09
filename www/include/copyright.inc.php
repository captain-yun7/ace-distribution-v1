<script language='javascript'>
// 무단이메일수집거부창
function openAlertEmail() {
	window.open("../include/alert_email.php", "","scrollbars=no, width=345, height=270");
}
//-->
</script>
<table width="956" border="0" cellspacing="0" cellpadding="0">
	<tr>
		<td height="3" bgcolor="#D5D5D5"></td>
	</tr>
	<tr>
		<td>
		  <table width="956" border="0" cellpadding="5" cellspacing="0" class="menu">
			<tr>
				<td width="200" align="center"><img src="/images/logo.gif"></td>
				<td style="padding-left:50">
				  <a href="../etc/pageview.php?url=company">회사소개</a> | <? if($_SESSION[USERID]) {?><a href="../member/my_member_edit.php">개인정보변경</a><?} else {?><a href="../member/join.php">회원가입</a><?}?> | <a href="javascript:openIdpass();">아이디/비밀번호찾기</a> | <a href="../etc/pageview.php?url=safeguard">개인정보보호정책</a>
				  <br><br>
				  서울시 영등포구 당산동3가 397번지 | 대표전화:02)2633-1930 | 팩스:02)2633-1939
				  <br>
				  Copyrightⓒ 서울사랑 All Rights Reserved. Contact <?=$admin_stat->shop_email;?> for more Information.
                  <LAYER name="lyrTop" z-Index="2" right="230" top="-100"><a href="#"><img id="imgTop" src="./../images/top.gif" border=0 style="position:absolute;right=230;top=-100;z-index:2;"></a></LAYER>
				</td>
				<td align="right" valign="top"><a href="javascript:openAlertEmail()"><img src="../images/bt_alert_email.gif" border="0" align="absmiddle"></a></td>
			</tr>
		</table></td>
	</tr>
</table>