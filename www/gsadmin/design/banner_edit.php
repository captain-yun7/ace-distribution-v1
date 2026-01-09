<? $mod=menu07 ?>
<? $menu = "02"; ?>
<? include('../header.php');?>
<?
$row = $db->object("cs_banner", " where idx='$_GET[idx]'"); 
$banner_images_size=@getimagesize("../../data/designImages/$row->banner_images");// 이미지 사이즈 
$banner_width=$banner_images_size[0];// 가로 길이
$banner_height=$banner_images_size[1];// 세로 길이
?>
<SCRIPT LANGUAGE="JavaScript">
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

function imagesView( idx, w, h ){
	window.open("banner_images_view.php?idx="+idx,"","scrollbars=no,width="+w+",height="+h+",top=200,left=200");
}

////  웹FTP 새창 오픈  시작 ///////////////////////////////////////////////////////////////////////////////
function ftpWinOpen() {
	window.open("../webftp.php","","scrollbars=yes, width=500, height=600");
}
////  웹FTP 새창 오픈  종료 /////////////////////////////////////////////////////////////////////////////////

////  TEXTAREA 입력 폼 크기 조정 시작 //////////////////////////////////////////////////////////////////
function textarea_resize( formname, size ) {
	if( size=='reset' ){
		formname.rows = 10;
	}else{
		var value = formname.rows + size;
		if(value>11) formname.rows = value;
		else return;
	}
}
////  TEXTAREA 입력 폼 크기 조정 종료 //////////////////////////////////////////////////////////////////

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
</SCRIPT>
<div class="span10">

<div>
	<h3 class="page-header">배너수정</h3>
</div>

<form action="banner_edit_ok.php" method="post" name="banner_form" enctype="multipart/form-data">
<input type="hidden" name="idx" value="<?=$_GET[idx];?>">
 

      <table class="table table-bordered table-hover ">
        <tr> 
          <td width="200" height="25" align="center" bgcolor="EFEFEF">형태 선택</td>
          <td>
		  <input type="radio" name="display" value="0" onclick="bannerReg();" <? if( $row->display == 0 ) { echo("checked");}?>> HTML 
		  <input type="radio" name="display" value="1" onclick="bannerReg();"  <? if( $row->display == 1 ) { echo("checked");}?>> 이미지(gif, jpg) 
		  </td>
        </tr>
        <tr> 
          <td width="200" height="25" align="center" bgcolor="EFEFEF">배너 위치 선택</td>
          <td><input type="radio" name="status" value="1" <? if( $row->status == 1 ) { echo("checked");}?>> 메인중앙 
		  <input type="radio" name="status" value="2" <? if( $row->status == 2 ) { echo("checked");}?>> 메인하단
		  <input type="radio" name="status" value="0" <? if( $row->status == 0 ) { echo("checked");}?>> 미사용</td>
        </tr>
        <tr> 
          <td width="200" height="25" align="center" bgcolor="EFEFEF">배 너 명</td>
          <td><input name="title" type="text" class="input" size="70" value="<?=$row->title;?>"> (간단한 설명)</td>
        </tr>
        <tr id="banner_view" style="display:none;"> 
          <td width="200" height="25" align="center" bgcolor="EFEFEF">배너 링크URL</td>
          <td>HTTP://<input name="link_url" type="text" style="width:500px;" value="<?=$row->link_url;?>"></td>
        </tr>
        <tr id="banner_view" style="display:none;"> 
          <td width="200" height="25" align="center" bgcolor="EFEFEF">링크URL 타겟</td>
          <td><input type="radio" name="target" value="0" <? if( $row->target == 0 ) { echo("checked");}?>> 새창 <input type="radio" name="target" value="1" <? if( $row->target == 1 ) { echo("checked");}?>> 현재창</td>
        </tr>
        <tr id="banner_view" style="display:none;"> 
          <td width="200" height="25" align="center" bgcolor="EFEFEF">배너이미지파일</td>
          <td><? if( $row->banner_images) { ?><a href="javascript:imagesView( '<?=$row->idx;?>', '<?=$banner_width;?>', '<?=$banner_height;?>' );" class="btn btn-default">이미지보기</a><? }?>&nbsp;<input name="banner_images" type="file" class="input" size="60"></td>
        </tr>
        <tr id="banner_view" style="display:none;"> 
          <td width="200" height="25" align="center" bgcolor="EFEFEF">배너 출력 내용</td>
          <td><table width="550" cellpadding="0" cellspacing="0" border="0" height="30">
	        <tr> 
				<td height="3" colspan="2"></td>
			</tr>
			<tr  height="25">
				<td align="left" class="menu">&nbsp;
				<a href="javascript:textarea_resize(banner_form.content, 5)"><img src="../images/bt_down.gif" width="19" height="19" border="0" align="absmiddle"></a>
				<a href="javascript:textarea_resize(banner_form.content, 'reset')"><img src="../images/bt_middle.gif" width="19" height="19" border="0" align="absmiddle"></a>
				<a href="javascript:textarea_resize(banner_form.content, -5)"><img src="../images/bt_up.gif" width="19" height="19" border="0" align="absmiddle"></a></td>
				<td align="right"><a href="javascript:ftpWinOpen();"><img src="../images/bt_upload.gif" border="0"></a></td>
			</tr>
	        <tr> 
				<td colspan="2">&nbsp;<textarea name="content" cols="91" rows="10"  class="input"><?=$row->content;?></textarea></td>
			</tr>
	        <tr> 
				<td height="5" colspan="2"></td>
			</tr>
			</table></td>
        </tr>
        <tr align="center"> 
          <td height="25" colspan="2" bgcolor="EFEFEF"><img src="../images/arrow2.gif" width="7" height="7"> 
            등록하신 배너는 스킨에 따라 사용자화면에 다르게 출력되는 경우도 있습니다.</td>
        </tr>
      </table>
      <br> <table width="100%" border="0" cellpadding="0" cellspacing="0" class="menu">
        <tr> 
          <td height="50" align="center"><a href="javascript:sendit();" class="btn btn-primary">등록</a></td>
        </tr>
      </table>

</form>

</div>
</div>

<SCRIPT LANGUAGE="JavaScript">
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
</SCRIPT>
<? include('../footer.php');?>
