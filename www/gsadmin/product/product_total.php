<?
$menu = "04";
include('../header.php');
include($ROOT_DIR."/lib/page_class.php");
$_GET=&$HTTP_GET_VARS;

// 상품정보변경
if( $_GET[hidden_goods_idx]) { $db->update("cs_goods", "shop_price='$_GET[shop_price]',display='$_GET[display]', main_position='$_GET[main_position]', sub_position='$_GET[sub_position]' where idx='$_GET[hidden_goods_idx]'");}

$mv_data	= $_GET[goods_data];
$goods_data	= $tools->decode( $_GET[goods_data] );
if($_GET[idx] )						{ $idx = $_GET[idx]; }											else { $idx = $goods_data[idx]; }
if($_GET[part_idx] )			{ $part_idx = $_GET[part_idx]; }						else { $part_idx = $goods_data[part_idx]; }
if($_GET[listNo] )					{ $listNo = $_GET[listNo]; }									else { $listNo = $goods_data[listNo]; }
if($_GET[startPage] )			{ $startPage = $_GET[startPage]; }					else { $startPage	= $goods_data[startPage]; }
if($_GET[search_item] )		{ $search_item = $_GET[search_item]; }			else { $search_item	= $goods_data[search_item]; }
if($_GET[search_order] )	{ $search_order = $_GET[search_order]; }		else { $search_order	= $goods_data[search_order]; }
?>

<script language="javascript">
<!--

// 검색기능
function search(){
	var form=document.goods_search_form;
	if(form.search_order.value=="")	{
		alert("검색할 내용을 입력해 주십시오.");
		form.search_order.focus();
	} else {
		form.submit();
	}
}

// 상품가격수정
function goodsPrice(form_data){
    var choice = confirm( '가격수정을 하시겠습니까?');
	if(choice) {form_data.submit();}
}

// 상품정보변경(display, position)
function goodsChange(form_data){
    var choice = confirm( '상품정보변경을 하시겠습니까?');
	if(choice) {form_data.submit();}
}


// 상품을 수정
function goodsEdit( mv_data ) {
    var choice = confirm( '상품을 수정 하시겠습니까?');
	if(choice) {	location.href='product_total_edit.php?goods_data='+mv_data; }
	else { return; }
}

// 상품을 삭제
function goodsDel( mv_data ) {
    var choice = confirm( '상품을 삭제 하시겠습니까?');
	if(choice) {	location.href='product_total_del_ok.php?goods_data='+mv_data; }
	else { return; }
}

function goodsRanking(part_idx){
	var winleft = (screen.width - 400) / 2;
	var wintop = (screen.height - 500) / 2;
	window.open("product_ranking.php?part_idx="+part_idx,"","scrollbars=no, width=320, height=380, top="+wintop+", left="+winleft+"");
}
//-->
</script>

<table width="850" border="0" align="center" cellpadding="0" cellspacing="0">
	<tr> 
		
		<td height="150" align="center" valign="top" bgcolor="#FFFFFF" class="menu"><br><img src="../images/title_product_total.jpg" width="800" height="70"><br><br>
			<table width="800" border="0" cellspacing="0" cellpadding="0">
				<tr> 
					<td class="sub_title" height="25"><img src="../images/arrow_blue.gif"> 제품 목록</td>
					<td align="right" class="menu"><font color="#FF0000"><b>총 상품수 : <?=$db->cnt("cs_goods", "");?>개</b></font>&nbsp;</td>
				</tr>
			</table>
			<table width="800" border="1" cellspacing="0" cellpadding="0" class="menu" bordercolor='#BDBEBD' style='border-collapse: collapse'>
				<?
				// 1차 카테고리 분류
				$part1_result = $db->select( "cs_part", "where part_index=1 order by part_ranking asc");
				while( $part1_row = @mysql_fetch_object($part1_result) ) {
					// 카테고리 이미지 출력
					if( $part1_row->list_display_check == 1 ) {	$P1_images = "../../data/designImages/".$part1_row->list_display_images1; }
					// 카테고리 목록이미지 출력(마우스 롤오버)
					if( $part1_row->list_display_check == 2 ) {	$P1_images = "../../data/designImages/".$part1_row->list_display_images1; $P2_images = "../../data/designImages/".$part1_row->list_display_images2; }
					// 카테고리 목록 출력 유무
					if( $part1_row->part_display_check )  {	$part1_display_check_images = "<img src='../images/part_use.gif' border='0' alt='사용' align='absmiddle'>"; } else { $part1_display_check_images = "<img src='../images/part_nouse.gif' alt='미사용' align='absmiddle'>"; }
					// 2차 카테고리 등록이미지 출력
					if( $part1_row->part_low_check )  {	$part2_register_images = "<img src='../images/bt_category_add2.gif' border='0' alt='2차카테고리등록' align='absmiddle'>"; } else { $part2_register_images = ""; }
					// 등록된 상품수
					if($part1_total_goods=$db->cnt("cs_goods", "where part_idx='$part1_row->idx'")) { $part1_total_goods="(".$part1_total_goods.")";} else { $part1_total_goods="";}
				?>		
				<tr> 
					<td height="25"><table width="800" border="0" cellspacing="0" cellpadding="0" class="menu">
						<tr>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<? if(!empty($part1_total_goods)) {?><a href="?part_idx=<?=$part1_row->idx;?>"><?}?><img src="../images/part1.gif" alt='1차 카테고리' align="absmiddle" border="0">&nbsp;&nbsp;<b><font color="#FF3636"><?=$part1_row->part_name;?> <?=$part1_total_goods;?></font></b></a></td>
							<td align="right"><? if(!empty($part1_total_goods)) {?><a href="javascript:goodsRanking(<?=$part1_row->idx;?>)"><img src="../images/bt_pd_rank.gif" border="0" align="absmiddle"></a>&nbsp;&nbsp;<?}?></td>
						</tr>
					</table></td>
				</tr>
					<? if(!empty($part1_total_goods) && $_GET['part_idx']==$part1_row->idx) {?>
					<tr>
						<td><table width="800" border="0" cellspacing="0" cellpadding="0" class="menu">
								<?
								//$part_idx= $part1_row->idx;
								$part_idx= $_GET['part_idx'];
								if( $search_item == 1 ) {
									$result		= $db->select( "cs_goods", "where part_idx=$part_idx and name like '%$search_order%' order by ranking asc" );
								} else if( $search_item == 2 ) {
									$result		= $db->select( "cs_goods", "where part_idx=$part_idx and code like '$search_order' order by ranking asc" );
								} else if( $search_item == 3 ) {
									$result		= $db->select( "cs_goods", "where part_idx=$part_idx and company like '$search_order' order by ranking asc" );
								} else { 
									$result		= $db->select( "cs_goods", "where part_idx=$part_idx order by ranking asc" );
								}
					
								$form=0; // 폼리스트 변수
								while( $row = mysql_fetch_object($result)) {
									$form++; // 폼네임변경 숫자증가
									if($form%2) $bgColor="#EFEFEF"; else $bgColor="#FFFFFF";
									$goods_data = $tools->encode("idx=".$row->idx."&startPage=".$startPage."&listNo=".$listNo."&table=".$table."&part_idx=".$part_idx."&search_item=".$search_item."&search_order=".$search_order);
								?>
								<form name="form_<?=$part_idx;?>_<?=$form?>" method="get" action="<?=$_SERVER[PHP_SELF];?>?goods_data=<?=$goods_data;?>">
								<input type="hidden" name="hidden_goods_idx" value="<?=$row->idx;?>">
								<input type="hidden" name="part_idx" value="<?=$row->part_idx;?>">
								<tr align="center" bgcolor="<?=$bgColor?>" style="padding-left: 0; padding-top: 0; padding-bottom: 0" onMouseOver=this.style.backgroundColor="#EFEDCB"  onMouseOut=this.style.backgroundColor=""> 
									<td width="10"></td>
									<td width="50"><img src='../../data/goodsImages/<?=$row->images1;?>' border='0' width="43" height="43"></td>
									<td width="65" height="25"><select name="display" class="input" onChange="javascript:goodsChange(document.form_<?=$part_idx;?>_<?=$form?>);"><option value="0" <? if( $row->display == 0 ) { echo("selected");} ?>>준비중</option><option value="1" <? if( $row->display == 1 ) { echo("selected");} ?>>판매중</option></select></td>
									<td height="25" align="left">&nbsp;<font color="#"><?=$db->stripSlash($row->name);?></font></td>
									<td width="65" height="25" align=""><input type="text" name="shop_price" value="<?=$row->shop_price;?>" class="input" size="8" style="text-align:center;"><br><a href="javascript:goodsPrice(document.form_<?=$part_idx;?>_<?=$form?>);"><img src="../images/bt_edit.gif" alt="가격수정" align="absmiddle" border="0"></a></td>
									<td width="70" height="25">
										<select name="main_position" class="input" onChange="javascript:goodsChange(document.form_<?=$part_idx;?>_<?=$form?>);" style="width:65">
										<option value="0" <? if( $row->main_position == 0 ) { echo("selected");} ?>>선 택</option>
										<option value="1" <? if( $row->main_position == 1 ) { echo("selected");} ?>>BEST</option>
										<option value="2" <? if( $row->main_position == 2 ) { echo("selected");} ?>>HIT</option>
										<option value="3" <? if( $row->main_position == 3 ) { echo("selected");} ?>>NEW</option>
										<option value="4" <? if( $row->main_position == 4 ) { echo("selected");} ?>>EVENT</option>
										</select>
										<select name="sub_position" class="input" onChange="javascript:goodsChange(document.form_<?=$part_idx;?>_<?=$form?>);" style="width:65">
										<option value="0" <? if( $row->sub_position == 0 ) { echo("selected");} ?>>선 택</option>
										<option value="1" <? if( $row->sub_position == 1 ) { echo("selected");} ?>>HIT</option>
										<option value="2" <? if( $row->sub_position == 2 ) { echo("selected");} ?>>BEST</option>
										</select>
									</td>
									<td width="55" height="25"><a href="javascript:goodsEdit('<?=$goods_data;?>');"><img src="../images/bt_edit.gif" alt="수정" align="absmiddle" border="0"></a><br><a href="javascript:goodsDel('<?=$goods_data;?>');"><img src="../images/bt_del.gif" alt="삭제" align="absmiddle" border="0"></a></td>
								</tr>
								</form>
								<?}?>
							<? if(!$form) {?>
								<tr>
									<td width="80" height="25"></td>
									<td height="20" colspan="6" class="menu">검색한 상품이 없습니다.</td>
								</tr>
							<?}?>
							</table></td>
					</tr>
					<?}?>
					<?
					// 2차 카테고리 분류
					$part2_result = $db->select( "cs_part", "where part_index=2 and part1_code='$part1_row->part1_code' order by part_ranking asc");
					while( $part2_row = @mysql_fetch_object($part2_result) ) {
						// 카테고리 목록 출력 유무
						if( $part2_row->part_display_check )  {	$part2_display_check_images = "<img src='../images/part_use.gif' border='0' alt='사용' align='absmiddle'>"; } else { $part2_display_check_images = "<img src='../images/part_nouse.gif' alt='미사용' align='absmiddle'>"; }
						// 2차 카테고리 등록이미지 출력
						if( $part2_row->part_low_check )  {	$part3_register_images = "<img src='../images/bt_category_add3.gif' border='0' alt='3차카테고리등록' align='absmiddle'>"; } else { $part3_register_images = ""; }
						// 등록된 상품수
						if( $part2_total_goods=$db->cnt("cs_goods", "where part_idx='$part2_row->idx'")) { $part2_total_goods="(".$part2_total_goods.")";} else { $part2_total_goods="";}
					?>		
					<tr>
						<td height="25"><table width="800" border="0" cellspacing="0" cellpadding="0" class="menu">
							<tr>
								<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<? if(!empty($part2_total_goods)) {?><a href="?part_idx=<?=$part2_row->idx;?>"><?}?><img src="../images/part2.gif" alt='2차 카테고리' align="absmiddle" border="0">&nbsp;&nbsp;<b><font color="#1B7AC9"><?=$part2_row->part_name;?> <?= $part2_total_goods;?></font></b></a></td>
								<td align="right"><? if(!empty($part2_total_goods)) {?><a href="javascript:goodsRanking(<?=$part2_row->idx;?>)"><font size="2"><img src="../images/bt_pd_rank.gif" border="0" align="absmiddle"></font></a>&nbsp;&nbsp;<?}?></td>
							</tr>
					</table></td>
					</tr>
					<? if(!empty($part2_total_goods) && $_GET['part_idx']==$part2_row->idx) {?>
					<tr>
						<td><table width="800" border="0" cellspacing="0" cellpadding="0" class="menu">
								<?
								$part_idx= $_GET['part_idx'];
								if( $search_item == 1 ) {
									$result		= $db->select( "cs_goods", "where part_idx=$part_idx and name like '%$search_order%' order by ranking asc" );
								} else if( $search_item == 2 ) {
									$result		= $db->select( "cs_goods", "where part_idx=$part_idx and code like '$search_order' order by ranking asc" );
								} else if( $search_item == 3 ) {
									$result		= $db->select( "cs_goods", "where part_idx=$part_idx and company like '$search_order' order by ranking asc" );
								} else { 
									$result		= $db->select( "cs_goods", "where part_idx=$part_idx order by ranking asc" );
								}
					
								$form=0; // 폼리스트 변수
								while( $row = mysql_fetch_object($result)) {
									$form++; // 폼네임변경 숫자증가
									if($form%2) $bgColor="#EFEFEF"; else $bgColor="#FFFFFF";
									$goods_data = $tools->encode("idx=".$row->idx."&startPage=".$startPage."&listNo=".$listNo."&table=".$table."&part_idx=".$part_idx."&search_item=".$search_item."&search_order=".$search_order);
								?>
								<form name="form_<?=$part_idx;?>_<?=$form?>" method="get" action="<?=$_SERVER[PHP_SELF];?>?goods_data=<?=$goods_data;?>">
								<input type="hidden" name="hidden_goods_idx" value="<?=$row->idx;?>">
								<input type="hidden" name="part_idx" value="<?=$row->part_idx;?>">
								<tr align="center" bgcolor="<?=$bgColor?>" style="padding-left: 0; padding-top: 0; padding-bottom: 0" onMouseOver=this.style.backgroundColor="#EFEDCB"  onMouseOut=this.style.backgroundColor=""> 
									<td width="30"></td>
									<td width="50"><img src='../../data/goodsImages/<?=$row->images1;?>' border='0' width="43" height="43"></td>
									<td width="65" height="25"><select name="display" class="input" onChange="javascript:goodsChange(document.form_<?=$part_idx;?>_<?=$form?>);"><option value="0" <? if( $row->display == 0 ) { echo("selected");} ?>>준비중</option><option value="1" <? if( $row->display == 1 ) { echo("selected");} ?>>판매중</option></select></td>
									<td height="25" align="left">&nbsp;<font color="#"><?=$db->stripSlash($row->name);?></font></td>
									<td width="65" height="25" align=""><input type="text" name="shop_price" value="<?=$row->shop_price;?>" class="input" size="8" style="text-align:center;"><br><a href="javascript:goodsPrice(document.form_<?=$part_idx;?>_<?=$form?>);"><img src="../images/bt_edit.gif" alt="가격수정" align="absmiddle" border="0"></a></td>
									<td width="70" height="25">
										<select name="main_position" class="input" onChange="javascript:goodsChange(document.form_<?=$part_idx;?>_<?=$form?>);" style="width:65">
										<option value="0" <? if( $row->main_position == 0 ) { echo("selected");} ?>>선 택</option>
										<option value="1" <? if( $row->main_position == 1 ) { echo("selected");} ?>>BEST</option>
										<option value="2" <? if( $row->main_position == 2 ) { echo("selected");} ?>>HIT</option>
										<option value="3" <? if( $row->main_position == 3 ) { echo("selected");} ?>>NEW</option>
										<option value="4" <? if( $row->main_position == 4 ) { echo("selected");} ?>>EVENT</option>
										</select>
										<select name="sub_position" class="input" onChange="javascript:goodsChange(document.form_<?=$part_idx;?>_<?=$form?>);" style="width:65">
										<option value="0" <? if( $row->sub_position == 0 ) { echo("selected");} ?>>선 택</option>
										<option value="1" <? if( $row->sub_position == 1 ) { echo("selected");} ?>>HIT</option>
										<option value="2" <? if( $row->sub_position == 2 ) { echo("selected");} ?>>BEST</option>
										</select>
									</td>
									<td width="55" height="25"><a href="javascript:goodsEdit('<?=$goods_data;?>');"><img src="../images/bt_edit.gif" alt="수정" align="absmiddle" border="0"></a><br><a href="javascript:goodsDel('<?=$goods_data;?>');"><img src="../images/bt_del.gif" alt="삭제" align="absmiddle" border="0"></a></td>
								</tr>
								</form>
								<?}?>
							<? if(!$form) {?>
								<tr>
									<td width="80" height="25"></td>
									<td height="20" colspan="6" class="menu">검색한 상품이 없습니다.</td>
								</tr>
							<?}?>
							</table></td>
					</tr>
					<?}?>
					<?
					$part3_result = $db->select( "cs_part", "where part_index=3 and part2_code='$part2_row->part2_code' and part1_code='$part2_row->part1_code'  order by part_ranking asc");
					while( $part3_row = @mysql_fetch_object($part3_result) ) {
						// 카테고리 목록 출력 유무
						if( $part3_row->part_display_check )  {	$part3_display_check_images = "<img src='../images/part_use.gif' border='0' alt='사용' align='absmiddle'>"; } else { $part3_display_check_images = "<img src='../images/part_nouse.gif' alt='미사용' align='absmiddle'>"; }
						// 등록된 상품수
						if( $part3_total_goods=$db->cnt("cs_goods", "where part_idx='$part3_row->idx'")) { $part3_total_goods="(".$part3_total_goods.")";} else { $part3_total_goods="";}
					?>		
					<tr> 
						<td height="25"><table width="800" border="0" cellspacing="0" cellpadding="0" class="menu">
							<tr>
								<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<? if(!empty($part3_total_goods)) {?><a href="?part_idx=<?=$part3_row->idx;?>"><?}?><img src="../images/part3.gif" alt='3차 카테고리' align="absmiddle" border="0">&nbsp;&nbsp;<b><font color="#FF9933"><?=$part3_row->part_name;?> <?= $part3_total_goods;?></font></b></a></td>
								<td align="right"><? if(!empty($part3_total_goods)) {?><a href="javascript:goodsRanking(<?=$part3_row->idx;?>)"><font size="2"><img src="../images/bt_pd_rank.gif" border="0" align="absmiddle"></font></a>&nbsp;&nbsp;<?}?></td>
							</tr>
					</table></td>
					</tr>
					<? if(!empty($part3_total_goods)  && $_GET['part_idx']==$part3_row->idx) {?>
					<tr>
						<td><table width="800" border="0" cellspacing="0" cellpadding="0" class="menu">
								<?
								$part_idx= $_GET['part_idx'];
								if( $search_item == 1 ) {
									$result		= $db->select( "cs_goods", "where part_idx=$part_idx and name like '%$search_order%' order by ranking asc" );
								} else if( $search_item == 2 ) {
									$result		= $db->select( "cs_goods", "where part_idx=$part_idx and code like '$search_order' order by ranking asc" );
								} else if( $search_item == 3 ) {
									$result		= $db->select( "cs_goods", "where part_idx=$part_idx and company like '$search_order' order by ranking asc" );
								} else { 
									$result		= $db->select( "cs_goods", "where part_idx=$part_idx order by ranking asc" );
								}
					
								$form=0; // 폼리스트 변수
								while( $row = mysql_fetch_object($result)) {
									$form++; // 폼네임변경 숫자증가
									if($form%2) $bgColor="#EFEFEF"; else $bgColor="#FFFFFF";
									$goods_data = $tools->encode("idx=".$row->idx."&startPage=".$startPage."&listNo=".$listNo."&table=".$table."&part_idx=".$part_idx."&search_item=".$search_item."&search_order=".$search_order);
								?>
								<form name="form_<?=$part_idx;?>_<?=$form?>" method="get" action="<?=$_SERVER[PHP_SELF];?>?goods_data=<?=$goods_data;?>">
								<input type="hidden" name="hidden_goods_idx" value="<?=$row->idx;?>">
								<input type="hidden" name="part_idx" value="<?=$row->part_idx;?>">
								<tr align="center" bgcolor="<?=$bgColor?>" style="padding-left: 0; padding-top: 0; padding-bottom: 0" onMouseOver=this.style.backgroundColor="#EFEDCB"  onMouseOut=this.style.backgroundColor=""> 
									<td width="50"></td>
									<td width="50"><img src='../../data/goodsImages/<?=$row->images1;?>' border='0' width="43" height="43"></td>
									<td width="65" height="25"><select name="display" class="input" onChange="javascript:goodsChange(document.form_<?=$part_idx;?>_<?=$form?>);"><option value="0" <? if( $row->display == 0 ) { echo("selected");} ?>>준비중</option><option value="1" <? if( $row->display == 1 ) { echo("selected");} ?>>판매중</option></select></td>
									<td height="25" align="left">&nbsp;<font color="#"><?=$db->stripSlash($row->name);?></font></td>
									<td width="65" height="25" align=""><input type="text" name="shop_price" value="<?=$row->shop_price;?>" class="input" size="8" style="text-align:center;"><br><a href="javascript:goodsPrice(document.form_<?=$part_idx;?>_<?=$form?>);"><img src="../images/bt_edit.gif" alt="가격수정" align="absmiddle" border="0"></a></td>
									<td width="70" height="25">
										<select name="main_position" class="input" onChange="javascript:goodsChange(document.form_<?=$part_idx;?>_<?=$form?>);" style="width:65">
										<option value="0" <? if( $row->main_position == 0 ) { echo("selected");} ?>>선 택</option>
										<option value="1" <? if( $row->main_position == 1 ) { echo("selected");} ?>>BEST</option>
										<option value="2" <? if( $row->main_position == 2 ) { echo("selected");} ?>>HIT</option>
										<option value="3" <? if( $row->main_position == 3 ) { echo("selected");} ?>>NEW</option>
										<option value="4" <? if( $row->main_position == 4 ) { echo("selected");} ?>>EVENT</option>
										</select>
										<select name="sub_position" class="input" onChange="javascript:goodsChange(document.form_<?=$part_idx;?>_<?=$form?>);" style="width:65">
										<option value="0" <? if( $row->sub_position == 0 ) { echo("selected");} ?>>선 택</option>
										<option value="1" <? if( $row->sub_position == 1 ) { echo("selected");} ?>>HIT</option>
										<option value="2" <? if( $row->sub_position == 2 ) { echo("selected");} ?>>BEST</option>
										</select>
									</td>
									<td width="55" height="25"><a href="javascript:goodsEdit('<?=$goods_data;?>');"><img src="../images/bt_edit.gif" alt="수정" align="absmiddle" border="0"></a><br><a href="javascript:goodsDel('<?=$goods_data;?>');"><img src="../images/bt_del.gif" alt="삭제" align="absmiddle" border="0"></a></td>
								</tr>
								</form>
								<?}?>
							<? if(!$form) {?>
								<tr>
									<td width="80" height="25"></td>
									<td height="20" colspan="6" class="menu">검색한 상품이 없습니다.</td>
								</tr>
							<?}?>
							</table></td>
					</tr>
					<?}?>

					<? 
						} // 3차 카테고리
					} // 2차 카테고리 
					$P1_images = ""; $P2_images = ""; 
				} // 1차 카테고리 
				?>
				<? if( !$db->cnt("cs_part", "")) {?>
				<tr>
					<td height="100" align="center"> 등록된 카테고리가 없습니다.</td>
				</tr>
				<?}?>
			</table><br>
			<!--table width="800" border="0" cellspacing="0" cellpadding="0">
				<form method="get" name="goods_search_form" action="<?=$_SERVER[PHP_SELF];?>">
				<tr> 
					<td height="25">
						<select name="search_item" class="input">
							<option value="1">제품명</option>
							<option value="2">제품번호</option>
							<option value="3">제조사</option>
						</select> 
						<input name="search_order" type="text" class="input"> <a href="javascript:search();"><img src="../images/bt_search.gif" width="38" height="19" align="absmiddle" border="0"></a>
					</td>
				</tr>
				</form>
			</table--><br>
		</td>
		
	</tr>
</table>
<? include('../footer.php');?>