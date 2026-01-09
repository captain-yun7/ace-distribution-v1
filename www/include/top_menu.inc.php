<script language='javascript'>
// 관리자에게 메일보내기
function openSendMail(mail) {
	window.open("../member/mail_to_admin.php?user_mail=<?=$admin_stat->admin_mail;?>", "","scrollbars=no, width=484, height=500");
}

//-->
</script>

<script language="javascript">
<!--
//스크롤메뉴 스크립트
//var stmnLEFT = 100; // 왼쪽 여백 (메뉴가 왼쪽에서 10픽셀 떨어진 곳에 보여집니다)
var stmnGAP1 = 5; // 위쪽 여백 (메뉴가 위에서 10픽셀 떨어진 곳에 보여집니다)
var stmnGAP2 = 5; // 스크롤시 브라우저 위쪽과 떨어지는 거리
var stmnBASE = 5; // 스크롤 시작위치 
var stmnActivateSpeed = 200;
var stmnScrollSpeed = 10;

var stmnTimer;

function ReadCookie(name)
{
	var label = name + "=";
	var labelLen = label.length;
	var cLen = document.cookie.length;
	var i = 0;

	while (i < cLen) {
		var j = i + labelLen;
		if (document.cookie.substring(i, j) == label) {
			var cEnd = document.cookie.indexOf(";", j);
			if (cEnd == -1) cEnd = document.cookie.length;
			return unescape(document.cookie.substring(j, cEnd));
		}

		i++;
	}
	return "";
}

function SaveCookie(name, value, expire)
{
	var eDate = new Date();
	eDate.setDate(eDate.getDate() + expire);
	document.cookie = name + "=" + value + "; expires=" +  eDate.toGMTString()+ "; path=/";
}

function RefreshStaticMenu()
{
	var stmnStartPoint, stmnEndPoint, stmnRefreshTimer;

	stmnStartPoint = parseInt(STATICMENU.style.top, 10);
	stmnEndPoint = document.body.scrollTop + stmnGAP2;
	if (stmnEndPoint < stmnGAP1) stmnEndPoint = stmnGAP1;
	stmnRefreshTimer = stmnActivateSpeed;
	if ( stmnStartPoint != stmnEndPoint ) {
		stmnScrollAmount = Math.ceil( Math.abs( stmnEndPoint - stmnStartPoint ) / 15 );
		STATICMENU.style.top = parseInt(STATICMENU.style.top, 10) + ( ( stmnEndPoint<stmnStartPoint ) ? -stmnScrollAmount : stmnScrollAmount );
		stmnRefreshTimer = stmnScrollSpeed;
	}

	stmnTimer = setTimeout ("RefreshStaticMenu();", stmnRefreshTimer);
}

function ToggleAnimate()
{
	val=document.getElementById("ANIMATE").getAttribute("toggle");

	if (val=='off') {
		RefreshStaticMenu();
		SaveCookie("ANIMATE", "true", 300);
		document.getElementById("ANIMATE").setAttribute("src","../images/bt_scroll_off.gif")
		document.getElementById("ANIMATE").setAttribute("toggle","on")
	} else {
		clearTimeout(stmnTimer);
		STATICMENU.style.top = stmnGAP1;
		SaveCookie("ANIMATE", "false", 300);
		document.getElementById("ANIMATE").setAttribute("src","../images/bt_scroll_on.gif")
		document.getElementById("ANIMATE").setAttribute("toggle","off")
	}
}

function InitializeStaticMenu()
{
//	STATICMENU.style.left = stmnLEFT;
	if (ReadCookie("ANIMATE") == "false") {
		ANIMATE.checked = false;
		STATICMENU.style.top = document.body.scrollTop + stmnGAP1;
	} else {
		ANIMATE.checked = true;
		STATICMENU.style.top = document.body.scrollTop + stmnBASE;
		RefreshStaticMenu();
	}
}
//-->
</script>


<div id="STATICMENU" style="position: absolute">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><table width="83" cellpadding="0" cellspacing="0" border="0">
			<tr>
				<td align="right"><table width="82" cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td height="50"><img src="../images/tm_top.gif" border="0"></td>
					</tr>
					<tr>
						<td height="74"><? if($_SESSION[USERID]) {?><a href="../member/login_ok.php?logout=1"><img src="../images/tm6.gif" border="0"></a><? }else{?><a href="../member/login.php"><img src="../images/tm1.gif" border="0"></a><?}?></td>
					</tr>
					<tr>
						<td height="67"><? if($_SESSION[USERID]) {?><a href="../member/my_member_edit.php"><img src="../images/tm7.gif" border="0"></a><? }else{?><a href="../member/join.php"><img src="../images/tm2.gif" border="0"></a><?}?></td>
					</tr>
					<tr>
						<td height="67"><a href="javascript:openIdpass();"><img src="../images/tm3.gif" border="0"></a></td>
					</tr>
					<tr>
						<td height="89"><a href="javascript:openSendMail()"><img src="../images/tm5.gif" border="0"></a></td>
					</tr>
					<tr>
						<td height="30" align="center"><img id="ANIMATE" src="../images/bt_scroll_off.gif" border="0" align="absmiddle"  onclick="ToggleAnimate();" toggle="on" style="cursor:hand"></td>
					</tr>
				</table></td>
			</tr>
		</table></td>
	</tr>
	<tr>
	  <td><? include('../include/banner_right.inc.php');?></td>
	</tr>
</table>
</div>
<script language="javascript">
<!--
InitializeStaticMenu();
//-->
</script>