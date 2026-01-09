<?
$menu = "04";
include('../header.php');
include($ROOT_DIR.'/lib/style_class.php');

$admin_row = $db->object("cs_admin", "", "express_check");
$mv_data	= $_GET[goods_data];
$goods_data	= $tools->decode( $_GET[goods_data] );

// 카테고리 이름 출력
$part_stat_row = $db->object("cs_part", "where idx='$goods_data[part_idx]'");
if( $part_stat_row->part_index == 1 ) {
	$part_result = $db->select("cs_part", "where part1_code='$part_stat_row->part1_code' && part_index=1 order by idx asc", "part_name");
} else if( $part_stat_row->part_index == 2 ) {
	$part_result = $db->select("cs_part", "where (part1_code='$part_stat_row->part1_code' && part_index=1) || (part2_code ='$part_stat_row->part2_code' && part_index=2) order by idx asc", "part_name");
} else if( $part_stat_row->part_index == 3 ) {
	$part_result = $db->select("cs_part", "where (part1_code='$part_stat_row->part1_code' && part_index=1) || (part2_code ='$part_stat_row->part2_code' && part_index=2) || (part3_code='$part_stat_row->part3_code' && part_index=3) order by idx asc", "part_name");
}
$i=0;
while( $part_row = @mysql_fetch_object( $part_result )) {
	$i++;
	$part_name.=$i."차 카테고리 : <font color='#FF0000'>".$part_row->part_name."</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
}
	
$row = $db->object("cs_goods", "where idx='$goods_data[idx]'");
// 이미지 사이즈 
$goods_images1_size=@getimagesize("../../data/goodsImages/$row->images1");
$goods_images1_width=$goods_images1_size[0]; $goods_images1_height=$goods_images1_size[1];
$goods_images2_size=@getimagesize("../../data/goodsImages/$row->images2");
$goods_images2_width=$goods_images2_size[0]; $goods_images2_height=$goods_images2_size[1];
if( $row->add_images1 ) { $goods_add_images1_size=@getimagesize("../../data/goodsImages/$row->add_images1");$goods_add_images1_width=$goods_add_images1_size[0]; $goods_add_images1_height=$goods_add_images1_size[1];}
if( $row->add_images2 ) { $goods_add_images2_size=@getimagesize("../../data/goodsImages/$row->add_images2");	$goods_add_images2_width=$goods_add_images2_size[0]; $goods_add_images2_height=$goods_add_images2_size[1];}
if( $row->add_images3 ) { $goods_add_images3_size=@getimagesize("../../data/goodsImages/$row->add_images3");	$goods_add_images3_width=$goods_add_images3_size[0]; $goods_add_images3_height=$goods_add_images3_size[1];}
if( $row->add_images4 ) { $goods_add_images4_size=@getimagesize("../../data/goodsImages/$row->add_images4");	$goods_add_images4_width=$goods_add_images4_size[0]; $goods_add_images4_height=$goods_add_images4_size[1];}
if( $row->add_images5 ) { $goods_add_images5_size=@getimagesize("../../data/goodsImages/$row->add_images5");	$goods_add_images5_width=$goods_add_images5_size[0]; $goods_add_images5_height=$goods_add_images5_size[1];}
?>
<LINK REL="STYLESHEET" STYLE="TEXT/CSS" HREF="./style.css">
<script language="javascript">
<!--
//// 데이타 전송 시작 ///////////////////////////////////////////////////////////////////////////////////////////
// 수량 입력 폼 체크
function goodsUnlimit() {	if( document.goods_form.unlimit.checked == true ) { document.goods_form.number.value = ""; }}
function goodsNumber() { document.goods_form.unlimit.checked  = false; }

// 옵션 데이타 입력
function dataInput() {
	var form=document.goods_form;
	var data_cnt=0;
	form.hidden_option1_data.value="";
	form.hidden_option2_data.value="";
	for( data_cnt=0; data_cnt < form.option1_part.length; data_cnt ++) {
		form.hidden_option1_data.value =form.hidden_option1_data.value + form.option1_part.options[data_cnt].value;
		form.hidden_option1_data.value= form.hidden_option1_data.value + "&&";
	}
	for( data_cnt=0; data_cnt < form.option2_part.length; data_cnt ++) {
		form.hidden_option2_data.value =form.hidden_option2_data.value + form.option2_part.options[data_cnt].value;
		form.hidden_option2_data.value= form.hidden_option2_data.value + "&&";
	}
}

function sendit() {
	var form=document.goods_form;
	dataInput(); // 옵션 데이타체크
	
	
	if(form.name.value=="") {
		alert("상품 이름을 입력해 주세요.");
		form.name.focus();
	} else if( form.company.value=="" ) {
		alert("제조회사를 입력해주세요.");
		form.company.focus();
	} else if( form.old_price.value=="" ) {
		alert("일반 소비자 가격을 입력해주세요.");
		form.old_price.focus();
	} else if( form.shop_price.value=="" ) {
		alert("판매할 가격을 입력해주세요.");
		form.shop_price.focus();
	} else if( form.unlimit.checked == false && form.number.value == "" ) {
		alert("판매할 수량을 선택해주세요.");
		form.number.focus();
	} else if(form.unlimit.checked && form.number.value){
		alert("판매수량의 무제한과 수량입력중  하나만 입력해주세요.");
		form.number.focus();
<? if( $admin_row->express_check==2 ) { ?>
	} else if( form.box.value=="" ) {
		alert("배송가중치 입력해주세요.");
		form.box.focus();
<? } ?>
	} else if( form.option_check[1].checked && form.option1_name.value=="") {
		alert("옵션명[1]을 입력해주세요.");
		form.option1_name.focus();
	} else if( form.option_check[2].checked && form.option1_name.value=="") {
		alert("옵션명[1]을 입력해주세요.");
		form.option1_name.focus();
	} else if( form.option_check[2].checked && form.option2_name.value=="") {
		alert("옵션명[2]을 입력해주세요.");
		form.option2_name.focus();
	//} else if( form.content.value=="" ) {
	//	alert("상품의 상세 정보를 입력해주세요.");
	//	form.content.focus();
	} else {
		form.submit();
	}
}
//// 데이타 전송 종료 //////////////////////////////////////////////////////////////////////////////////////////

function goodsImagesView( check, w, h ){
	window.open("product_images_view.php?goods_data=<?=$mv_data?>&images_check="+check,"","scrollbars=no,width="+w+",height="+h+",top=200,left=200");
}


//// 옵션관련 시작 //////////////////////////////////////////////////////////////////////////////////////////////
// 옵션 등록
function optionInput(n){
	var len,obj_input, obj_name, obj_part;
	if (n == 1){
		obj_input = document.goods_form.option1_input;
		obj_name =	document.goods_form.option1_name;
		obj_part = document.goods_form.option1_part;
	} else if (n == 2){
		obj_input = document.goods_form.option2_input;
		obj_name =	document.goods_form.option2_name;
		obj_part = document.goods_form.option2_part;
	}
	if(obj_name.value.length < 1) {	alert("옵션명을 입력하여야 합니다."); obj_name.focus(); return; }
	if(obj_input.value.length < 1) { alert("옵션내용을 입력하여야 합니다."); obj_input.focus(); return; }
	len = obj_part.length;
	obj_part.length = len+1;
	obj_part.options[len].value = obj_input.value;
	obj_part.options[len].text = obj_input.value;
	obj_input.value="";
	obj_input.focus();
}

// 옵션 삭제
function optionDel(n){
	var len,obj_input, obj_name, obj_part;
	if (n == 1){
		obj_part = document.goods_form.option1_part;

	} else if (n == 2){
		obj_part = document.goods_form.option2_part;
	}
	var obj_now = obj_part.selectedIndex;//현재 리스트 객체
	if (obj_now==-1){
		alert("삭제할 옵션내용을 선택하세요.");
		return;
	}
	obj_part.options[obj_part.selectedIndex] = null;
}
//// 옵션관련 종료 //////////////////////////////////////////////////////////////////////////////////////////////


//// 입력 품 VIEW 체크  시작 /////////////////////////////////////////////////////////////////////////////////////////
// 옵션
function optionCheck() {
	var form=document.goods_form;
	if( form.option_check[0].checked ) {
		document.all.option1_view[0].style.display="none"; 
		document.all.option1_view[1].style.display="none"; 
		document.all.option2_view[0].style.display="none"; 
		document.all.option2_view[1].style.display="none"; 
	} else if( form.option_check[1].checked ) {
		document.all.option1_view[0].style.display=""; 
		document.all.option1_view[1].style.display=""; 
		document.all.option2_view[0].style.display="none"; 
		document.all.option2_view[1].style.display="none"; 
	} else if( form.option_check[2].checked ) {
		document.all.option1_view[0].style.display=""; 
		document.all.option1_view[1].style.display=""; 
		document.all.option2_view[0].style.display=""; 
		document.all.option2_view[1].style.display=""; 
	}
}
// 추가 이미지
function addImagesCheck() {
	var form=document.goods_form;
	if( form.add_images_check.checked ) {
		document.all.add_images_view.style.display=""; 
	} else {
		document.all.add_images_view.style.display="none"; 	
		form.add_images1_check.checked=false;
		form.add_images2_check.checked=false;
		form.add_images3_check.checked=false;
		form.add_images4_check.checked=false;
		form.add_images5_check.checked=false;
	}
}
// 첨부파일
function fileCheck() {
	var form=document.goods_form;
	if( form.file_check.checked ) {
		document.all.file_view.style.display=""; 
	} else {
		document.all.file_view.style.display="none"; 
	}
}
//// 입력 품 VIEW 체크  종료 //////////////////////////////////////////////////////////////////////////////


////  웹FTP 새창 오픈  시작 ///////////////////////////////////////////////////////////////////////////////
function ftpWinOpen() {
	window.open("../webftp.php","","scrollbars=yes, width=500, height=600");
}
////  웹FTP 새창 오픈  종료 /////////////////////////////////////////////////////////////////////////////////


////  TEXTAREA 입력 폼 크기 조정 시작 /////////////////////////////////////////////////////////////////
function textarea_resize( formname, size ) {
	if( size=='reset' ){
		formname.rows = 10;
	}else{
		var value = formname.rows + size;
		if(value>9) formname.rows = value;
		else return;
	}
}
//-->
</script>
<script id="HABYEditor" language="javascript" src="../../editor/habyeditor.js"></script>
<table width="850" border="0" align="center" cellpadding="0" cellspacing="0">
	<form action="product_total_edit_ok.php" method="post" name="goods_form" enctype="multipart/form-data">
	<input type="hidden" name="hidden_option1_data">
	<input type="hidden" name="hidden_option2_data">
	<input type="hidden" name="goods_data" value="<?=$mv_data;?>">
	<input type="hidden" name="hidden_images1" value="<?=$row->images1;?>">
	<input type="hidden" name="hidden_images2" value="<?=$row->images2;?>">
	<input type="hidden" name="hidden_add_images1" value="<?=$row->add_images1;?>">
	<input type="hidden" name="hidden_add_images2" value="<?=$row->add_images2;?>">
	<input type="hidden" name="hidden_add_images3" value="<?=$row->add_images3;?>">
	<input type="hidden" name="hidden_add_images4" value="<?=$row->add_images4;?>">
	<input type="hidden" name="hidden_add_images5" value="<?=$row->add_images5;?>">
	<input type="hidden" name="hidden_goods_file" value="<?=$row->goods_file;?>">
	<tr> 
		
		<td height="70" align="center" valign="top" bgcolor="#FFFFFF" class="menu"><br><img src="../images/title_product_add.jpg" width="800" height="70"></td>
		
	</tr>
	<tr> 
		<td height="150" align="center" bgcolor="#FFFFFF" class="menu">
			<table width="800" border="0" cellspacing="0" cellpadding="0">
				<tr> 
					<td class="sub_title" height="25"><img src="../images/arrow_blue.gif"> 제품 기본설정</td>
				</tr>
			</table>
			<table width="800" border="1" cellpadding="3" cellspacing="0" bordercolor='#BDBEBD' class="menu" style='border-collapse: collapse'>
				<tr> 
					<td height="25" width="150"  align="center" bgcolor="EFEFEF">카테고리 이름</td>
					<td height="25">&nbsp;&nbsp;<?=$part_name;?> </td>
				</tr>
				<tr> 
					<td height="25" align="center" bgcolor="EFEFEF">진열대 출력</td>
					<td height="25"><input name="display" type="radio" value="1" <? if( $row->display == 1) { echo("checked");}?>>예&nbsp;<input name="display" type="radio" value="0" <? if( $row->display == 0 ) { echo("checked");}?>>아니오&nbsp;&nbsp;(제품 전시 판매 유무 설정합니다.)</td>
				</tr>			
			</table><br>
		</td>
	</tr>
	<tr height="1"> 
		<td height="1" bgcolor="BDBEBD"></td>
	</tr>
	<tr> 
		<td height="75" align="center" valign="top" bgcolor="#FFFFFF" class="menu"><br> 
			<table width="800" border="0" cellspacing="0" cellpadding="0">
				<tr> 
					<td class="sub_title" height="25"><img src="../images/arrow_blue.gif"> 제품 정보</td>
				</tr>
			</table>
			<table width="800" border="1" cellpadding="3" cellspacing="0" bordercolor='#BDBEBD' class="menu" style='border-collapse: collapse'>
				<tr> 
					<td height="25" align="center" bgcolor="EFEFEF">제품코드</td>
					<td height="25"><input name="code" type="text" maxlength="20" size="20"class="input" value="<?=$row->code;?>" <?=$style->colorAlign("#666666 ", 0);?> readOnly>&nbsp;(상품 코드는 수정 불가능합니다.)</td>
				</tr>
				<tr> 
					<td width="150" height="25" align="center" bgcolor="EFEFEF">제품명</td>
					<td height="25" colspan="2" ><input name="name" type="text" maxlength="100" size="70" class="input" value="<?=$db->stripSlash($row->name);?>">&nbsp;(100자 안으로 작성)</td>
				</tr>
				<tr> 
					<td width="150" height="25" align="center" bgcolor="EFEFEF">제조회사</td>
					<td height="25" colspan="2"><input name="company" type="text" maxlength="100" size="40" class="input" value="<?=$row->company;?>">&nbsp;제조 및 판매회사를 적어 주세요</font></td>
				</tr>
				<tr> 
					<td width="150" height="25" align="center" bgcolor="EFEFEF">시중가격</td>
					<td height="25" colspan="2"><input name="old_price" type="text" class="input" maxlength="11" size="11" <?=$style->align(2);?> <?=$style->strCheck(0);?> value="<?=$row->old_price;?>">&nbsp;원&nbsp;&nbsp;(일반 소비자 가격을 입력해주세요)</td>
				</tr>
				<tr> 
					<td width="150" height="25" align="center" bgcolor="EFEFEF">판매가격</td>
					<td height="25" colspan="2"><input name="shop_price" type="text" class="input" maxlength="11" size="11" <?=$style->align(2);?> <?=$style->strCheck(0);?> value="<?=$row->shop_price;?>">&nbsp;원&nbsp;&nbsp;(판매할 상품 가격을 입력해주세요)</td>
				</tr>
				<tr> 
					<td width="150" height="13" align="center" bgcolor="EFEFEF">판매수량</td>
					<td height="25" colspan="2"><input name="unlimit" type="checkbox" value="1" onClick="goodsUnlimit()" <? if( $row->unlimit == 1) { echo("checked");}?>>무제한&nbsp;<input name="number" type="text" maxlength="11" size="11" class="input" <?=$style->align(2);?> <?=$style->strCheck(0);?>  onClick="goodsNumber()" value="<? if( !$row->unlimit ) { echo($row->number);} ?>">&nbsp;개&nbsp;&nbsp; (재고량이 없는 경우 0를 입력해 주세요[품절표시])</td>
				</tr>
				<tr> 
					<td width="150" height="25" align="center" bgcolor="EFEFEF">포인트</td>
					<td height="25" colspan="2"><input name="point" type="text" class="input" maxlength="11" size="7" <?=$style->align(2);?> <?=$style->strCheck(1);?> value="<?=$row->point;?>">&nbsp;% 기본 포인트 정책을 적용하려면 공란으로 비워두세요. (퍼센트[0.1,1,10,100 %] 로 입력하세요)</td>
				</tr>
				
				<!-- 배송가중치는 관리자에서 기본정보를 가지고 와서 출력 유무를 체크합니다. -->
				<? if( $admin_row->express_check==2 ) { ?>
				<tr> 
					<td width="150" height="25" align="center" bgcolor="EFEFEF">배송가중치</td>
					<td height="25" colspan="2"><input name="box" type="text" class="input" maxlength="11" size="7" <?=$style->align(2);?> <?=$style->strCheck(0);?> value="<?=$row->box;?>">&nbsp;%&nbsp;제품의 1BOX의 크기 대비 퍼센트[10,50,100]로 입력해주세요 (예: 50%는 1/2BOX 입니다.)</td>
				</tr>
				<?}?>
				<tr> 
					<td width="150" height="25" align="center" bgcolor="EFEFEF">제품 옵션</td>
					<td height="25" colspan="2"><input type="radio" name="option_check" value="0" checked onClick="optionCheck()" <? if( $row->option_check == 0) { echo("checked");}?>>사용안함&nbsp;<input type="radio" name="option_check" value="1" onClick="optionCheck()" <? if( $row->option_check == 1) { echo("checked");}?>>옵션1개&nbsp;<input type="radio" name="option_check" value="2" onClick="optionCheck()" <? if( $row->option_check == 2) { echo("checked");}?>>옵션2개</td>
				</tr>
				<tr id="option1_view" style="display:none;"> 
					<td width="150" height="25" align="center" bgcolor="F0F0F0">옵 션 명 [1]</td>
					<td width="350" height="25" bgcolor="F0F0F0"><input name="option1_name" type="text" class="input" size="20" value="<?=$row->option1_name;?>">&nbsp;(예: 색상, 사이즈, 성별...)</td>
					<td rowspan="2" bgcolor="F0F0F0">
						<table border="0" cellspacing="0" cellpadding="0">
							<tr> 
								<td width="150">
									<select name="option1_part" size="3" multiple class="input" style="width:150;">
										<?
										$option1_arr = explode("&&", $row->option1_part );
										for( $ot1=0; $ot1 < count($option1_arr)-1; $ot1++ ) {
										?>
										<option value="<?=$option1_arr[$ot1];?>"><?=$option1_arr[$ot1];?></option>
										<?}?>
									</select>
								</td>
								<td width="100" align="center"><input type="button" name="option_input" value="삭제"	onClick="optionDel(1);" tabindex="12" class="input_black"></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr id="option1_view" style="display:none;"> 
					<td height="25" align="center" bgcolor="F0F0F0">옵션내용 [1]</td>
					<td height="25" bgcolor="F0F0F0"><input name="option1_input" type="text" class="input" size="20">&nbsp;<input type="button" name="option_input" value="입력"	onClick="optionInput(1);" tabindex="12" class="input_black">&nbsp;(예: 빨강, 초록, 파랑...)</td>
				</tr>
				<tr id="option2_view" style="display:none;"> 
					<td height="25" align="center" bgcolor="F0F0F0">옵 션 명 [2]</td>
					<td height="25" bgcolor="F0F0F0"><input name="option2_name" type="text" class="input" size="20" value="<?=$row->option2_name;?>">&nbsp;(예: 색상, 사이즈, 성별...)</td>
					<td rowspan="2" bgcolor="F0F0F0">
						<table border="0" cellspacing="0" cellpadding="0">
							<tr> 
								<td width="150">
									<select name="option2_part" size="3" multiple class="input" style="width:150;">
										<?
										$option2_arr = explode("&&", $row->option2_part );
										for( $ot2=0; $ot2 < count($option2_arr)-1; $ot2++ ) {
										?>
											<option value="<?=$option2_arr[$ot2];?>"><?=$option2_arr[$ot2];?></option>
										<?}?>
									</select>
								</td>
								<td width="100" align="center"><input type="button" name="option_input" value="삭제"	onClick="optionDel(2);" tabindex="12" class="input_black"></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr id="option2_view" style="display:none;"> 
					<td height="25" align="center" bgcolor="F0F0F0">옵션내용 [2]</td>
					<td height="25" bgcolor="F0F0F0"><input name="option2_input" type="text" class="input" size="20">&nbsp;<input type="button" name="option_input" value="입력"	onClick="optionInput(2);" tabindex="12" class="input_black">&nbsp;(예: 빨강, 초록, 파랑...)</td>
				</tr>
				<tr> 
					<td width="150" height="65" align="center" bgcolor="EFEFEF">제품이미지</td>
					<td height="65" colspan="2">
						<table width="600" border="0" cellspacing="0" cellpadding="0">
							<tr> 
								<td width="130" align="center">
									<table width="170" height="25" border="0" cellpadding="0" cellspacing="0">
										<tr> 
											<td width="120" align="right" background="../images/img1.gif"><input type="checkbox" name="images1_check" value="1" <? if( $row->images1) { echo("checked");}?>></td>
											<td width="50" align="center"><? if( $row->images1) { ?><a href="javascript:goodsImagesView( 'G1', '<?=$goods_images1_width;?>' , '<?=$goods_images1_height;?>' );"><img src="../images/bt_view.gif" border="0"></a><? }?></td>
										</tr>
									</table>
								</td>
								<td width="470" class="menu"><input name="images1" type="file" class="input" size="25"> [권장 사이즈 200 x 200 ]</td>
							</tr>
							<tr> 
								<td width="130" align="center">
									<table width="170" height="25" border="0" cellpadding="0" cellspacing="0">
										<tr> 
											<td width="120" align="right" background="../images/img2.gif"><input type="checkbox" name="images2_check" value="1" <? if( $row->images2) { echo("checked");}?>></td>
											<td width="50" align="center"><? if( $row->images2) { ?><a href="javascript:goodsImagesView( 'G2', '<?=$goods_images2_width;?>', '<?=$goods_images2_height;?>' );"><img src="../images/bt_view.gif" border="0"></a><? }?></td>
										</tr>
									</table>
								</td>
								<td width="470" class="menu"><input name="images2" type="file" class="input" size="25"> [권장 사이즈 450 x 450 ] </td>
							</tr>
						</table>
					</td>
				</tr>
				<tr> 
					<td width="150" height="25" align="center" bgcolor="EFEFEF">추가이미지</td>
					<td height="25" colspan="2"><input type="checkbox" name="add_images_check" value="1" onClick="addImagesCheck();" <? if( $row->add_images1 || $row->add_images2 || $row->add_images3 || $row->add_images4 || $row->add_images5 ) { echo("checked");}?>> 추가이미지 입력보기 ( 예 : 전/후/측면/내부/외부....)</td>
				</tr>
				<tr id="add_images_view" style="display:none;"> 
					<td width="150" height="140" align="center" bgcolor="EFEFEF"></td>
					<td height="140" colspan="2">
						<table width="600" border="0" cellspacing="0" cellpadding="0">
							<tr> 
								<td width="130" align="center">
									<table width="170" height="25" border="0" cellpadding="0" cellspacing="0">
										<tr> 
											<td align="right" background="../images/img_add1.gif"><input type="checkbox" name="add_images1_check" value="1" <? if( $row->add_images1) { echo("checked");}?>></td>
											<td width="50" align="center"><? if( $row->add_images1) { ?><a href="javascript:goodsImagesView( 'A1', '<?=$goods_add_images1_width;?>', '<?=$goods_add_images1_height;?>' );"><img src="../images/bt_view.gif" border="0"></a><? }?></td>
										</tr>
									</table>
								</td>
								<td width="470" class="menu"><input name="add_images1" type="file" class="input" size="25"> [권장 사이즈 450 x 450 ]</td>
							</tr>
							<tr> 
								<td width="130" align="center">
									<table width="170" height="25" border="0" cellpadding="0" cellspacing="0">
										<tr> 
											<td align="right" background="../images/img_add2.gif"><input type="checkbox" name="add_images2_check" value="1" <? if( $row->add_images2) { echo("checked");}?>></td>
											<td width="50" align="center"><? if( $row->add_images2) { ?><a href="javascript:goodsImagesView( 'A2', '<?=$goods_add_images2_width;?>', '<?=$goods_add_images2_height;?>' );"><img src="../images/bt_view.gif" border="0"></a><? }?></td>
										</tr>
									</table>
								</td>
								<td width="470" class="menu"><input name="add_images2" type="file" class="input" size="25"> [권장 사이즈 450 x 450 ]</td>
							</tr>
							<tr> 
								<td width="130" align="center">
									<table width="170" height="25" border="0" cellpadding="0" cellspacing="0">
										<tr> 
											<td align="right" background="../images/img_add3.gif"><input type="checkbox" name="add_images3_check" value="1" <? if( $row->add_images3) { echo("checked");}?>></td>
											<td width="50" align="center"><? if( $row->add_images3) { ?><a href="javascript:goodsImagesView( 'A3', '<?=$goods_add_images3_width;?>', '<?=$goods_add_images3_height;?>' );"><img src="../images/bt_view.gif" border="0"></a><? }?></td>
										</tr>
									</table>
								</td>
								<td width="470" class="menu"><input name="add_images3" type="file" class="input" size="25"> [권장 사이즈 450 x 450 ]</td>
							</tr>
							<tr> 
								<td width="130" align="center">
									<table width="170" height="25" border="0" cellpadding="0" cellspacing="0">
										<tr> 
											<td align="right" background="../images/img_add4.gif"><input type="checkbox" name="add_images4_check" value="1" <? if( $row->add_images4) { echo("checked");}?>></td>
											<td width="50" align="center"><? if( $row->add_images4) { ?><a href="javascript:goodsImagesView( 'A4', '<?=$goods_add_images4_width;?>', '<?=$goods_add_images4_height;?>' );"><img src="../images/bt_view.gif" border="0"></a><? }?></td>
										</tr>
									</table>
								</td>
								<td width="470" class="menu"><input name="add_images4" type="file" class="input" size="25"> [권장 사이즈 450 x 450 ]</td>
							</tr>
							<tr> 
								<td width="130" align="center">
									<table width="170" height="25" border="0" cellpadding="0" cellspacing="0">
										<tr> 
											<td align="right" background="../images/img_add5.gif"><input type="checkbox" name="add_images5_check" value="1" <? if( $row->add_images5) { echo("checked");}?>></td>
											<td width="50" align="center"><? if( $row->add_images5) { ?><a href="javascript:goodsImagesView( 'A5', '<?=$goods_add_images5_width;?>', '<?=$goods_add_images5_height;?>' );"><img src="../images/bt_view.gif" border="0"></a><? }?></td>
										</tr>
									</table>
								</td>
								<td width="470" class="menu"><input name="add_images5" type="file" class="input" size="25"> [권장 사이즈 450 x 450 ]</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr> 
					<td width="150" height="25" align="center" bgcolor="EFEFEF">NEW 아이콘</td>
					<td height="25" colspan="2">
						<input type="radio" name="new_mark" value="1" <? if( $row->new_mark == 1) { echo("checked");}?>> <img src="../images/new1.gif" alt="new이미지1" align="absmiddle"> 
						<input type="radio" name="new_mark" value="2" <? if( $row->new_mark == 2) { echo("checked");}?>> <img src="../images/new2.gif" alt="new이미지2" align="absmiddle"> 
						<!--input type="radio" name="new_mark" value="3" <? if( $row->new_mark == 3) { echo("checked");}?>> <img src="../images/new3.gif" alt="new이미지3" align="absmiddle"-->
						<input type="radio" name="new_mark" value="0" <? if( $row->new_mark == 0) { echo("checked");}?>>&nbsp;사용안함
					</td>
				</tr>
				<tr> 
					<td width="150" height="25" align="center" bgcolor="EFEFEF">HIT 아이콘</td>
					<td height="25" colspan="2">
						<input type="radio" name="hit_mark" value="1" <? if( $row->hit_mark == 1) { echo("checked");}?>>&nbsp;<img src="../images/hit1.gif" alt="hit이미지1" align="absmiddle"> 
						<!--input type="radio" name="hit_mark" value="2" <? if( $row->hit_mark == 2) { echo("checked");}?>>&nbsp;<img src="../images/hit2.gif" alt="hit이미지2" align="absmiddle"--> 
						<input type="radio" name="hit_mark" value="3" <? if( $row->hit_mark == 3) { echo("checked");}?>>&nbsp;<img src="../images/hit3.gif" alt="hit이미지3" align="absmiddle">
						<input type="radio" name="hit_mark" value="0" <? if( $row->hit_mark == 0) { echo("checked");}?>>&nbsp;사용안함
					</td>
				</tr>
<script language=javascript>
<!--
function etcicon(text){
	
	aa = 0;
	if(goods_form.icon01.checked==true){ aa = aa + 1; }
	if(goods_form.icon02.checked==true){ aa = aa + 1; }
	if(goods_form.icon03.checked==true){ aa = aa + 1; }
	if(goods_form.icon04.checked==true){ aa = aa + 1; }
	if(goods_form.icon05.checked==true){ aa = aa + 1; }
	if(goods_form.icon06.checked==true){ aa = aa + 1; }
	
	if(aa>4){
		alert("\n기타 아이콘은 4개이상 선택 하실 수 없습니다.");
		
		if(text==1){ goods_form.icon01.checked = false; }
		if(text==2){ goods_form.icon02.checked = false; }
		if(text==3){ goods_form.icon03.checked = false; }
		if(text==4){ goods_form.icon04.checked = false; }
		if(text==5){ goods_form.icon05.checked = false; }
		if(text==6){ goods_form.icon06.checked = false; }
		
	}
	
}
-->
</script>								
				<tr> 
					<td width="150" height="25" align="center" bgcolor="EFEFEF">기타 아이콘</td>
					<td height="25" colspan="2">
						<input type="checkbox" name="icon01" value="1" onclick="etcicon('1');" <? if( $row->icon01 == 1) { echo("checked");}?>>&nbsp;<img src="../images/icon_best.gif" alt="BEST아이콘" align="absmiddle">&nbsp;&nbsp; 
						<input type="checkbox" name="icon02" value="1" onclick="etcicon('2');" <? if( $row->icon02 == 1) { echo("checked");}?>>&nbsp;<img src="../images/icon_md.gif" alt="MD추천아이콘" align="absmiddle">&nbsp;&nbsp;
						<input type="checkbox" name="icon03" value="1" onclick="etcicon('3');" <? if( $row->icon03 == 1) { echo("checked");}?>>&nbsp;<img src="../images/icon_delevery.gif" alt="무료배송아이콘" align="absmiddle">&nbsp;&nbsp;
						<input type="checkbox" name="icon04" value="1" onclick="etcicon('4');" <? if( $row->icon04 == 1) { echo("checked");}?>>&nbsp;<img src="../images/icon_restore.gif" alt="재입고아이콘" align="absmiddle">&nbsp;&nbsp;
						<input type="checkbox" name="icon05" value="1" onclick="etcicon('5');" <? if( $row->icon05 == 1) { echo("checked");}?>>&nbsp;<img src="../images/icon_hot.gif" alt="HOT아이콘" align="absmiddle">&nbsp;&nbsp;
						<input type="checkbox" name="icon06" value="1" onclick="etcicon('6');" <? if( $row->icon06 == 1) { echo("checked");}?>>&nbsp;<img src="../images/icon_sale.gif" alt="SALE아이콘" align="absmiddle">
					</td>
				</tr>
				<tr> 
					<td width="150" height="25" align="center" bgcolor="EFEFEF">파일자료등록</td>
					<td height="25" colspan="2"><input type="checkbox" name="file_check" value="1"  onClick="fileCheck()" <? if( $row->goods_file ) { echo("checked");}?>>&nbsp;파일자료를 삭제할 경우, 체크 하지 마세요</td>
				</tr>
				<tr id="file_view" style="display:none;"> 
					<td width="150" height="25" align="center" bgcolor="EFEFEF"><? if( $row->goods_file ) { $goods_file_arr = explode("&&", $row->goods_file ); ?>FILE: <input name="goods_file_old" type="text" class="input" size="17" <?=$style->colorAlign("#FF0000 ", 1);?> value="<?=$goods_file_arr[1];?>"><? }?></td>
					<td height="25" colspan="2"><input name="goods_file" type="file" size="35" class="input">&nbsp;등록할 파일이름을 영문으로 압축(ZIP)하여 올리세요</td>
				</tr>
				<script language=javascript>
				<!--
				function res(){
					
					window.open("product_list_zzim.php","aaa","width=750,height=500,scrollbars=yes");	
					
				}
				
				function cle(){
					goods_form.zzim.value='';
				}
				-->
				</script>
				<tr> 
					<td width="150" height="25" align="center" bgcolor="EFEFEF">관련상품등록</td>
					<td height="25" colspan="2"><input type="text" name="zzim" value="<? echo $row->zzim ?>" size="20" class="input" readonly>&nbsp;
					<a href="javascript:res();">[관련상품고르기]</a>&nbsp;<a href="javascript:cle();">[초기화]</a>
					</td>
				</tr>
			</table><br>
		</td>
	</tr>
	<tr height="1"> 
		<td height="1" align="center" valign="top" bgcolor="BDBEBD"></td>
	</tr>
	<tr> 
		<td align="center" valign="top" bgcolor="#FFFFFF" class="menu"><br>
			<table width="800" border="0" cellspacing="0" cellpadding="0">
				<tr> 
					<td class="sub_title" height="25"><img src="../images/arrow_blue.gif"> 제품 설명</td>
				</tr>
			</table>
			<table width="800" border="1" cellpadding="3" cellspacing="0" bordercolor='#BDBEBD' class="menu" style='border-collapse: collapse'>
				<tr> 
					<td height="25" align="center">
						<table width="770" cellpadding="0" cellspacing="0" border="0" height="30">
							<tr> 
								<td height="3" colspan="2"></td>
							</tr>
							<!--tr  height="25">
								<td align="left" class="menu">
									<a href="javascript:textarea_resize(document.goods_form.content, 5)"><img src="../images/bt_down.gif" width="19" height="19" border="0" align="absmiddle"></a>
									<a href="javascript:textarea_resize(document.goods_form.content, 'reset')"><img src="../images/bt_middle.gif" width="19" height="19" border="0" align="absmiddle"></a>
									<a href="javascript:textarea_resize(document.goods_form.content, -5)"><img src="../images/bt_up.gif" width="19" height="19" border="0" align="absmiddle"></a>
									&nbsp;<img src="../images/bt_type.gif" width="64" height="19" border=0 alt="" align="absmiddle">&nbsp;<input name="tag" type="radio" value="0" checked>TEXT&nbsp;<input type="radio" name="tag" value="1">HTML</td>
								<td align="right"><a href="javascript:ftpWinOpen();"><img src="../images/bt_upload.gif" border="0"></a></td>
							</tr-->
							<tr> 
								<td colspan="2" align="center"><textarea name="content" cols="100" rows="30"  class="input"><? echo $row->content ?></textarea></td>
							</tr>
							<tr> 
								<td height="3" colspan="2"></td>
							</tr>
						</table>
					</td>
				</tr>
			</table><br>
			<a href="javascript:sendit();"><img src="../images/bt_save.gif" width="139" height="36" border="0"></a><br> <br>
		</td>
	</tr>
	</form>
</table>
<script language="javascript">
<!--
// 옵션
var form=document.goods_form;
if( form.option_check[0].checked ) {
	document.all.option1_view[0].style.display="none"; 
	document.all.option1_view[1].style.display="none"; 
	document.all.option2_view[0].style.display="none"; 
	document.all.option2_view[1].style.display="none"; 
} else if( form.option_check[1].checked ) {
	document.all.option1_view[0].style.display=""; 
	document.all.option1_view[1].style.display=""; 
	document.all.option2_view[0].style.display="none"; 
	document.all.option2_view[1].style.display="none"; 
} else if( form.option_check[2].checked ) {
	document.all.option1_view[0].style.display=""; 
	document.all.option1_view[1].style.display=""; 
	document.all.option2_view[0].style.display=""; 
	document.all.option2_view[1].style.display=""; 
}
// 추가 이미지
if( form.add_images_check.checked ) {
	document.all.add_images_view.style.display=""; 
} else {
	document.all.add_images_view.style.display="none"; 	
	form.add_images1_check.checked=false;
	form.add_images2_check.checked=false;
	form.add_images3_check.checked=false;
	form.add_images4_check.checked=false;
	form.add_images5_check.checked=false;
}
// 상품파일
if( form.file_check.checked ) {
	document.all.file_view.style.display=""; 
} else {
	document.all.file_view.style.display="none"; 
}
//-->
</script>
<script language="javascript">
	var useConfig = new Object();   // 사용자 정의 설정
	
        useConfig["BoardId"]  = 'cs_goods'; // 게시판 테이블명
        useConfig["BasePath"] = '../../editor';   // 에디터 경로
		useConfig["Skin"]     = 'gray';   // 에디터 경로
         // HABYeditor('textarea id or name', 사용자 정의 설정 개체); //

        var newEditor  = new HABYeditor('content', useConfig);
</script>
<? include('../footer.php');?>