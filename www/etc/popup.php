<?
include('../common.php');
$_GET=&$HTTP_GET_VARS;
$popup_stat = $db->object("cs_popup", "where idx='$_GET[idx]'");
$COOKIE_NAME="POPUP_COOKIE_".$popup_stat->idx;
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title><?=$popup_stat->title_bar;?></title>

<link href="../gsadmin/codeshop.css" rel="stylesheet" type="text/css">
</head>

<script language="JavaScript">
<!--
function setCookie( name, value, expiredays )
{
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

<? if($popup_stat->live==0) {?>
function closeWin(){
	if ( document.popup_form.popup_end.checked ) {
		setCookie( '<?=$COOKIE_NAME;?>', 'NO', 1 );//쿠기 저장 기간은 1일로 한다.
	}
	window.close();
} 
<?} else if($popup_stat->live==1) {?>
function closeWin(){
	if ( document.popup_form.popup_end.checked ) {
		setCookie( '<?=$COOKIE_NAME;?>', 'NO', 365 );//쿠기 저장 기간은 1일로 한다.
	}
	window.close();
} 
<?}?>

function closeGo(url){
	opener.parent.window.location.href='http://'+url;
	window.close();
} 
//-->
</script>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="100%" height="100%" valign="top"><? if($popup_stat->display==0) {?><?=$tools->strHtml($popup_stat->content);?><?} else if($popup_stat->display==1) {?><? if($popup_stat->link_url) {?><a href="javascript:closeGo('<?=$popup_stat->link_url;?>')"><img src='../data/designImages/<?=$popup_stat->popup_images;?>' border='0'></a><?} else {?><img src='../data/designImages/<?=$popup_stat->popup_images;?>' border='0'><?}?><?}?></td>
  </tr>
  <tr>
    <td height="2" bgcolor="D6D7D6"></td>
  </tr>
<form name="popup_form">
  <tr>
    <td height="20" align="right" bgcolor="D6D7D6" class="menu" valign="bottom"><input type=checkbox name="popup_end" onclick="closeWin();"><? if($popup_stat->live==0) {?>
오늘 하루 이창을 열지 않음<?} else if($popup_stat->live==1) {?>이창은 다시는 띄우지 않음<?}?>&nbsp;&nbsp;<a href="javascript:closeWin();"><img src="../images/bt_pop_close.gif" width="60" height="19" align="absbottom" border="0"></a>&nbsp;</td>
  </tr>
  <tr>
    <td height="2" bgcolor="D6D7D6"></td>
  </tr>
  </form>
</table>
</body>
</html>
