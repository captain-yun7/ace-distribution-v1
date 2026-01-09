<? include('../common.php');?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>업로드-웹FTP</title>
<link href="codeshop.css" rel="stylesheet" type="text/css">
</head>
<SCRIPT LANGUAGE="JavaScript">
<!--
function regSendit() {
	var form=document.reg_form;
	if(form.upload.value=="") {
		alert("등록할 파일을 선택해 주세요.");
		form.upload.focus();
	} else {
		form.submit();
	}
}
function delSendit() {
	var form=document.del_form;
	form.submit();
}
// 전체 선택 반전
var toggle=0;
function checkAll() {
	toggle=1-toggle;
	var form=document.del_form;
	if( toggle ) {
	<? $webftp_js_result = $db->select("cs_webftp", "");	while( $webftp_js_row = @mysql_fetch_object($webftp_js_result)) {	?>
		form.check_<?=$webftp_js_row->idx;?>.checked  = true;
	<? }?>
	} else {
	<? $webftp_js_result = $db->select("cs_webftp", "");	while( $webftp_js_row = @mysql_fetch_object($webftp_js_result)) {	?>
		form.check_<?=$webftp_js_row->idx;?>.checked  = false;
   <? }?>
	}
}
//-->
</SCRIPT>

<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<table width="484" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="484" height="96"><img src="images/webftp.gif" width="484" height="96"></td>
  </tr>
  <tr>
    <td align="center"><br>
      <table width="450" border="0" cellspacing="0" cellpadding="0">
        <tr> 
          <td width="480" height="8" align="center"><img src="images/box_t1.gif" width="450" height="8"></td>
        </tr>
        <tr>
          <td height="55" align="center" bgcolor="E7E7EF" class="submenu">이미지 업로드 후 아래와 같은 경로로 HTML 태그를 작성하면 이미지가 출력됩니다<br>
            <font color="#0000CC"><b>파일명은 영문으로</b></font> 하시기 바랍니다<br> <font color="#6600FF">&lt;img src=&quot;/data/upload/이미지파일명&quot; border=&quot;0&quot;&gt;</font></td>
        </tr>
        <tr>
          <td width="450" height="7" align="center" class="submenu"><img src="images/box_t2.gif" width="450" height="7"></td>
        </tr>
      </table>
      <br>
      <table width="450" border="1" cellpadding="0" cellspacing="0" bordercolor="E7E7EF">
        <form action="webftp_ok.php" method="post" name="reg_form" enctype="multipart/form-data">
          <input type="hidden" name="webftp_check" value="reg">
          <tr> 
            <td height="30" align="center" bgcolor="E7E7EF"><input name="upload" type="file" class="input" size="38"></td>
          </tr>
          <tr>
            <td height="30" align="center"><a href="javascript:regSendit();"><img src="images/bt_up_save.gif" width="66" height="19" border="0"></a></td>
          </tr>
        </form>
      </table>
      <br>
      <table width="450" border="1" cellpadding="0" cellspacing="0" bordercolor="E7E7EF" class="menu">
        <tr> 
          <td height="25" colspan="2"  bgcolor="E7E7EF" class="enbold"><table width="440" cellpadding="0" cellspacing="0" border="0">
              <tr> 
                <td width="30" align="center" class="enbold"><a href="javascript:checkAll();"><img src="images/bt_selectall.gif" border="0"></a></td>
                <td width="410" class="enbold">&nbsp;../data/upload/</td>
              </tr>
            </table></td>
        </tr>
		<form action="webftp_ok.php" method="post" name="del_form">
		<input type="hidden" name="webftp_check" value="del">
		<input type="hidden" name="all_check">
		<? if( $db->cnt("cs_webftp", "")) { ?>
		<? $webftp_result = $db->select("cs_webftp", "");	while( $webftp_row = @mysql_fetch_object( $webftp_result )) { ?>
        <tr>
          <td width="30" height="25" align="center"><input name="check_<?=$webftp_row->idx;?>" type="checkbox" value="<?=$webftp_row->idx;?>"></td>
          <td width="420" height="25">&nbsp;&nbsp;<?=$webftp_row->name;?></td>
        </tr>
        <? }?>
		<? } else {?>
        <tr>
          <td height="25" colspan="2" align="center">등록된 파일이 없습니다</td>
        </tr>
		<? }?>
		</form>
		<tr align="center"> 
          <td height="30" colspan="2"><a href="javascript:delSendit();"><img src="images/bt_img_del.gif" width="104" height="19" border="0"></a></td>
        </tr>
      </table><br><br></td>
  </tr>
</table>
</body>
</html>
