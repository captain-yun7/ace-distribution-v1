<? $mod=menu04 ?>
<? $menu=1?>
<?
include("../header.php");
include($ROOT_DIR.'/lib/style_class.php');
$admin_row = $db->object("cs_admin", "");
?>
<LINK REL="STYLESHEET" STYLE="TEXT/CSS" HREF="./style.css">


<? include $_SERVER['DOCUMENT_ROOT']."/webeditor/webeditor_script.php"; ?>

<script language="javascript">
<!--



// 수량 입력 폼 체크
function goodsUnlimit() {	if( document.tx_editor_form.unlimit.checked == true ) { document.tx_editor_form.number.value = ""; }}
function goodsNumber() { document.tx_editor_form.unlimit.checked  = false; }

// 옵션 데이타 입력
function dataInput() {
	var form=document.tx_editor_form;
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


//// 옵션관련 시작 //////////////////////////////////////////////////////////////////////////////////////////////
// 옵션 등록
function optionInput(n){
	var len,obj_input, obj_name, obj_part;
	if (n == 1){
		obj_input = document.tx_editor_form.option1_input;
		obj_name =	document.tx_editor_form.option1_name;
		obj_part = document.tx_editor_form.option1_part;
	} else if (n == 2){
		obj_input = document.tx_editor_form.option2_input;
		obj_name =	document.tx_editor_form.option2_name;
		obj_part = document.tx_editor_form.option2_part;
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
		obj_part = document.tx_editor_form.option1_part;

	} else if (n == 2){
		obj_part = document.tx_editor_form.option2_part;
	}
	var obj_now = obj_part.selectedIndex;//현재 리스트 객체
	if (obj_now==-1){
		alert("삭제할 옵션내용을 선택하세요.");
		return;
	}
	obj_part.options[obj_part.selectedIndex] = null;
}
//// 옵션관련 종료 //////////////////////////////////////////////////////////////////////////////////////////////


function partCodeCheck() {
	if(document.tx_editor_form.part_code.value=="카테고리를 선택하세요") {
		alert('카테고리를 선택하세요');
	}
}


//// 입력 품 VIEW 체크  시작 /////////////////////////////////////////////////////////////////////////////////////////
// 옵션
function optionCheck() {
	var form=document.tx_editor_form;
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
	var form=document.tx_editor_form;
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
	var form=document.tx_editor_form;
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
////  TEXTAREA 입력 폼 크기 조정 종료 //////////////////////////////////////////////////////////////////


////  카테고리 선택 폼 설정 시작 //////////////////////////////////////////////////////////////////////////
// 배열 선언
depth1 = new Array(); // 리스트1 출력용
depth2 = new Array(); // 리스트2 출력용
depth3 = new Array(); // 리스트3 출력용

depth1_value = new Array(); // 리스트1 값
depth2_value = new Array(); // 리스트2 값
depth3_value = new Array(); // 리스트3 값

var depth1_size = 3;
var depth2_size = 3;
var depth3_size = 3;
var sep = "$$";
// 배열 초기화

i = 0;
// depth1 의 배열 초기화
<?
$part1_result = $db->select( "cs_part", "where part_index=1 order by part_ranking asc");
while( $part1_row = mysql_fetch_object($part1_result) ) {
?>
	depth1[i] = "<?=$part1_row->part_name;?>";
	depth1_value[i] = "<?=$part1_row->part1_code;?>";
	
	j = 0;

	// depth2 의 배열 초기화
	<?
	$part2_result = $db->select( "cs_part", "where part1_code='$part1_row->part1_code' and part_index=2 order by part_ranking asc");
	while( $part2_row = mysql_fetch_object($part2_result) ) 
	{
	?>
		if ( j == 0 )
		{
			depth2[i] = new Array(); 
			depth2_value[i] = new Array();
			depth3[i] = new Array();
			depth3_value[i] = new Array();
		}

		depth2[i][j] = "<?=$part2_row->part_name;?>" ;
		depth2_value[i][j] = "<?=$part2_row->part2_code;?>";
		
		k = 0;
		<?
		$part3_result = $db->select( "cs_part", "where part2_code='$part2_row->part2_code' and part1_code='$part1_row->part1_code' and part_index=3 order by part_ranking asc");
		while( $part3_row = mysql_fetch_object($part3_result) ) 
		{
		?>
			if ( k == 0 )
			{
				depth3[i][j] = new Array();
				depth3_value[i][j] = new Array();
			}
			depth3[i][j][k] = '<?=$part3_row->part_name?>' ;
			depth3_value[i][j][k] = '<?=$part3_row->part3_code?>' ;
		k += 1;
	    <?}?>
	 j += 1;
	<?}?>	
i += 1;		
<? }?>

// 선택되었을때 다음 단계 카테고리 출력
function change(depth, index, target)
{
	f = document.tx_editor_form;   // 선택된 Form;
	
	if ( depth == 1 && index != -1)  // 대분류 선택 시
	{
		sp_value = f.select1[index].value;
		sp_value = sp_value.split(sep);
		sp_value2 = sp_value[1];
		
		for ( i = f.select2.length; i >= 0; i-- ) {
			f.select2[i] = null; 
		}
		tx_editor_form.part_code.value = "카테고리를 선택하세요";
		if ( depth2[sp_value2] != null )
		{
	
			for ( i = 0 ; i <= depth2[sp_value2].length -1 ; i++ )
			{
				f.select2.options[i] = new Option(depth2[sp_value2][i],depth2_value[sp_value2][i] + sep + sp_value2 + sep + i );
			}
		}
		else
		{
//			alert("2차 카테고리는 없습니다.");
			tx_editor_form.part_code.value = depth1_value[sp_value2];
			alert("카테고리 선택 완료\n\n상품을 등록 하세요");
			tx_editor_form.name.focus();
		}


		// 카테고리 2를 초기화 되면 카테로기 3은 모두 삭제한다.
		for ( i = f.select3.length; i >= 0; i-- ) {
			f.select3[i] = null; 
		}
	}
	else if ( depth == 2 && index != -1 )   // 중분류 선택 시 
	{
		sp_value = f.select2[index].value;
		sp_value = sp_value.split(sep);
		sp_value2 = sp_value[1];
		sp_value3 = sp_value[2];
		
		for ( i = f.select3.length; i >= 0; i-- ) {
			f.select3[i] = null; 
		}
		tx_editor_form.part_code.value = "카테고리를 선택하세요";
		if ( depth3[sp_value2][sp_value3] != null )
		{

			for ( i = 0 ; i <= depth3[sp_value2][sp_value3].length -1 ; i++ )
			{
				f.select3.options[i] = new Option(depth3[sp_value2][sp_value3][i],depth3_value[sp_value2][sp_value3][i]);
			}
		}
		else
		{
//			alert("3차 카테고리는 없습니다.");
			tx_editor_form.part_code.value = depth2_value[sp_value2][sp_value3];
			alert("카테고리 선택 완료\n\n상품을 등록 하세요");
			tx_editor_form.name.focus();
		}
	}
	else if ( depth == 3 && index != -1 )
	{
		tx_editor_form.part_code.value = f.select3[index].value;
		alert("카테고리 선택 완료\n\n상품을 등록 하세요");
		tx_editor_form.name.focus();
	}
}
////  카테고리 선택 폼 설정 종료 //////////////////////////////////////////////////////////////////////////
//-->
</script>



<div>
	<h3 class="page-header">제품등록</h3>
</div>


	<table class="table table-bordered">

		<form name="tx_editor_form" id="tx_editor_form" class="form-inline"  action="product_add_ok.php" method="post" enctype="multipart/form-data">
		<input type="hidden" name="hidden_option1_data">
		<input type="hidden" name="hidden_option2_data">
		<input type="hidden" name="sum_img" value="">


		<table class="table table-bordered">
				<caption></caption>
					<colgroup>
						<col width="15%">
						<col width="*">
					</colgroup>
					<thead>

				<tr> 
					<th>분류 선택</th>
					<th>
						<table class="table table-bordered">
							<tr> 
								<td><span class="btn btn-primary btn-xs btn-grad btn-rect">&nbsp;&nbsp;1차 카테고리&nbsp;&nbsp;</span></td>
								<td><span class="btn btn-primary btn-xs btn-grad btn-rect">&nbsp;&nbsp;2차 카테고리&nbsp;&nbsp;</span></td>
								<td><span class="btn btn-primary btn-xs btn-grad btn-rect">&nbsp;&nbsp;3차 카테고리&nbsp;&nbsp;</span></td>
							</tr>
							<tr> 
								<td>
									<select  name="select1" onClick='change(1, this.form.select1.selectedIndex, this.form)'  class="form-control"  multiple="multiple">
										<script language = "javascript">
										for ( i = 0 ; i <= depth1.length -1 ; i++ ){	document.write ("<option value='"+ depth1_value[i] + sep + i + "' >" + depth1[i] + "</option>");}
										</script>
									</select>
								</td>
								<td><select name="select2" onclick='change(2, this.form.select2.selectedIndex, this.form)' class="form-control"  multiple="multiple"></select></td>
								<td><select name="select3" onclick='change(3, this.form.select3.selectedIndex, this.form)' class="form-control"  multiple="multiple"></select></td>
							</tr>
						</table>	
					</th>
				</tr>

				<tr>
					<th>카테고리 코드</th>
					<td><input name="part_code" type="text" class="form-control2" size="30" maxlength="20" <?=$style->colorAlign("#FF0000 ", 0);?> readOnly value="    카테고리를 선택하세요  ">&nbsp;&nbsp;( <font color="#FF0000">! 주의</font> : 카테고리 선택이 완료되면 카테고리 코드가 나타납니다.)</td>
				</tr>
				<tr> 
					<th>진열대 출력</th>
					<td>
						<label class="radio-inline"><input type="radio" name="display" value="1" checked>&nbsp;예&nbsp;</label>
						<label class="radio-inline"><input type="radio" name="display" value="0">아니오</label>&nbsp;&nbsp;&nbsp;(제품 전시 판매 유무 설정합니다.)
					</td>
				</tr>
				</thead>
			</table><br>




			<div class="page-header" style="font-weight:bold"><span class="glyphicon glyphicon-play" aria-hidden="true"></span> 제품정보</div>

			<table class="table table-bordered">

				<thead>
				<caption></caption>
				<colgroup>
					<col width="15%">
					<col width="*">
				</colgroup>

				<tr> 
					<th>제품코드</th>
					<td colspan="2"><input name="code" type="text" class="form-control2" maxlength="20" value="<?=time();?>" <?=$style->colorAlign("#666666 ", 0);?> readOnly>&nbsp;(자동으로 코드가 생성 됩니다.)</td>
				</tr>
				<tr> 
					<th>제품명</th>
					<td colspan="2" ><input name="name" type="text" maxlength="100" class="form-control" onKeyDown="partCodeCheck();">&nbsp;(100자 안으로 작성)</td>
				</tr>
				<tr> 
					<th>제품특징</th>
					<td colspan="2" >
					<textarea name="company" style="width:800px;height:250px;" class="form-control"></textarea>
					</td>
				</tr>
				<!-- <tr> 
					<th>유통기한</th>
					<td colspan="2" ><input name="youtong" type="text" maxlength="100" class="form-control col-md-3"></td>
				</tr>
				<tr> 
					<th>보관방법</th>
					<td colspan="2" ><input name="bogan" type="text" maxlength="100" class="form-control col-md-3"></td>
				</tr>
				<tr> 
					<th>박스입수</th>
					<td colspan="2" ><input name="boxip" type="text" maxlength="100" class="form-control col-md-3"></td>
				</tr> -->
		
			

				<tr style="display:none;"> 
					<th>제품 옵션</td>
					<td colspan="2">
						<label class="radio-inline"><input type="radio" name="option_check" value="0" checked onClick="optionCheck()">&nbsp;사용안함</label>&nbsp;&nbsp;
						<label class="radio-inline"><input type="radio" name="option_check" value="1" onClick="optionCheck()">&nbsp;옵션1개</label>&nbsp;&nbsp;
						<label class="radio-inline"><input type="radio" name="option_check" value="2" onClick="optionCheck()">&nbsp;옵션2개</label>&nbsp;&nbsp;
					</td>
				</tr>

				<tr id="option1_view" style="display:none;"> 
					<th>옵 션 명 [1]</th>
					<td><input name="option1_name" type="text" class="form-control2">&nbsp;(예: 색상, 사이즈, 성별...)</td>
					<th rowspan="2">
						<table class="table table-bordered">
							<tr> 
								<th><select name="option1_part" class="form-control " multiple="multiple"  ></select></th>
								<td><button name="option_input" class="btn btn-xl btn-danger" value="삭제"	onClick="optionDel(1);" tabindex="12" >삭제</button></td>
							</tr>
						</table>
					</th>
				</tr>

				<tr id="option1_view" style="display:none;"> 
					<th>옵션내용 [1]</th>
					<td>
						<input name="option1_input" type="text" class="form-control2">&nbsp;
						<input type="button" name="option_input" value="입력"	onClick="optionInput(1);" tabindex="12" class="btn btn-xl btn-primary">&nbsp;(예: 빨강, 초록, 파랑...)
					</td>
				</tr>

				<tr id="option2_view" style="display:none;"> 
					<th>옵 션 명 [2]</th>
					<td><input name="option2_name" type="text" class="form-control2">&nbsp;(예: 색상, 사이즈, 성별...)</td>
					<th rowspan="2" >
						<table class="table table-bordered">
							<tr> 
								<th><select name="option2_part" class="form-control " multiple="multiple" ></select></th>
								<td><button name="option_input" class="btn btn-xl btn-danger" value="삭제"	onClick="optionDel(2);" tabindex="12" >삭제</button></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr id="option2_view" style="display:none;"> 
					<th>옵션내용 [2]</th>
					<td>
						<input name="option2_input" type="text" class="form-control2">&nbsp;
						<input type="button" name="option_input" value="입력"	onClick="optionInput(2);" tabindex="12" class="btn btn-xl btn-primary">&nbsp;(예: 빨강, 초록, 파랑...)
					</td>
				</tr>


				<tr> 
					<th>제품이미지</th>
					<th colspan="2">
						<table class="table table-bordered">
							<caption></caption>
							<colgroup>
								<col width="15%">
								<col width="*">
							</colgroup>
							<thead>

							<tr> 
								<td><label class="checkbox-inline" style="font-weight:bold"><input type="checkbox" name="images1_check" value="1" checked>기준이미지&nbsp;</label></td>
								<td class="text-left"><input name="images1" type="file" > [권장 사이즈 168 x 168 ]</td>
							</tr>
							<tr> 
								<td><label class="checkbox-inline" style="font-weight:bold"><input type="checkbox" name="images2_check" value="1" checked>확대이미지&nbsp;</label></td>
								<td class="text-left"><input name="images2" type="file" > [권장 사이즈 288 x 288 ] </td>
							</tr>
							</thead>
						</table>
					</th>
				</tr>

				<tr style="display:none;"> 
					<th>추가이미지</th>
					<td colspan="2">
						<label class="checkbox-inline" style="font-weight:bold">
							<input type="checkbox" name="add_images_check" value="1" onClick="addImagesCheck();"> 추가이미지 입력보기 ( 예 : 전/후/측면/내부/외부....)
						</label>
					</td>
				</tr>

				<tr id="add_images_view" style="display:none;"> 
					<th></th>
					<th colspan="2">
						<table class="table table-bordered">

							<caption></caption>
							<colgroup>
								<col width="15%">
								<col width="*">
							</colgroup>
							<thead>

							<tr> 
								<td><label class="checkbox-inline" style="font-weight:bold"><input type="checkbox" name="add_images1_check" value="1">추가이미지1&nbsp;</label></td>
								<td class="text-left"><input name="add_images1" type="file" > [권장 사이즈 330 x 330 ]</td>
							</tr>

							<tr> 
								<td><label class="checkbox-inline" style="font-weight:bold"><input type="checkbox" name="add_images2_check" value="1">추가이미지2&nbsp;</label></td>
								<td class="text-left"><input name="add_images2" type="file" > [권장 사이즈 330 x 330 ]</td>
							</tr>

							<tr> 
								<td><label class="checkbox-inline" style="font-weight:bold"><input type="checkbox" name="add_images3_check" value="1">추가이미지3&nbsp;</label></td>
								<td class="text-left"><input name="add_images3" type="file" > [권장 사이즈 330 x 330 ]</td>
							</tr>

							<tr> 
								<td><label class="checkbox-inline" style="font-weight:bold"><input type="checkbox" name="add_images4_check" value="1">추가이미지4&nbsp;</label></td>
								<td class="text-left"><input name="add_images4" type="file" > [권장 사이즈 330 x 330 ]</td>
							</tr>

							<tr> 
								<td><label class="checkbox-inline" style="font-weight:bold"><input type="checkbox" name="add_images5_check" value="1">추가이미지5&nbsp;</label></td>
								<td class="text-left"><input name="add_images5" type="file" > [권장 사이즈 330 x 330 ]</td>
							</tr>
						
							</thead>
						</table>
						</th>
					</tr>


				<!--<tr> 
					<td width="150" height="25" align="center" bgcolor="EFEFEF">첨부파일등록</td>
					<td height="25" colspan="2"><input type="checkbox" name="file_check" value="1"  onClick="fileCheck()">&nbsp;첨부파일을 등록할 경우 체크 해주세요</td>
				</tr>
				<tr id="file_view" style="display:none;"> 
					<td width="150" height="25" align="center" bgcolor="EFEFEF"></td>
					<td height="25" colspan="2"><input name="goods_file" type="file" size="35" class="input">&nbsp;등록할 파일이름을 영문으로 압축(ZIP)하여 올리세요</td>
				</tr>-->
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
				<!-- <tr> 
					<th>관련상품등록</th>
					<td><input type="text" name="zzim" value="" size="20" class="form-control2" disabled>&nbsp;
					<a href="javascript:res();">[관련상품고르기]</a>&nbsp;<a href="javascript:cle();">[초기화]</a>
					</td>
				</tr> -->
			</table><br>


		<div class="page-header" style="font-weight:bold"><span class="glyphicon glyphicon-play" aria-hidden="true"></span> 제품설명</div>



			<table class="table table-bordered">
				<tr> 
					<th>

								
			<textarea id="contents_source" style="display:none;"></textarea>
			<?include $_SERVER['DOCUMENT_ROOT']."/webeditor/webeditor_area.php";?>
								

					</th>
				</tr>
			</table><br>


			<table class="table">
				<tr>
					<td class="text-center"><button class="btn btn-large btn-primary"  onClick="Editor.save();">저장하기</button></td>
				</tr>
			</table>

	
	</form>


<script src="/webeditor/webeditor_config.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
<!--
function validForm(editor) {
	var validator = new Trex.Validator();
	var content = editor.getContent();

			dataInput();
			
			if (document.tx_editor_form.name.value == '') {
				alert('제품명을 입력해 주세요');
				document.tx_editor_form.name.focus();
				return false;
			}

	//if (!validator.exists(content)) {
	//	$("#contents_validate").html('내용을 입력해주세요.');
	//	Editor.focus();
	//	return false;
	//}
	return true;
}
//-->
</script>

 
<? include('../footer.php');?>