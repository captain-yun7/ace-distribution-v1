<? $mod=menu07 ?>
<? include('../../common.php'); 
$_GET=&$HTTP_GET_VARS;
$row=$db->object("cs_banner", "where idx='$_GET[idx]'", "title, banner_images");
$images_view = "<img src='../../data/designImages/$row->banner_images' border='0'>";
?>
<HTML>
<HEAD>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<TITLE>&nbsp;<?=$row->title;?> 상품 이미지 </TITLE>
</HEAD>
<body bgcolor="FFFFFF" text="000000" leftmargin="0" topmargin="0">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
<tr>
	<td align="center" valign="middle"><a href="javascript:window.close();" onfocus="this.blur()"><?=$images_view?></a></td>
</tr>
</table>
</BODY>
</HTML>
