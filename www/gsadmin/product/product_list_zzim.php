<? $mod=menu04 ?>
<? $menu=1?>
<?
include('../header.php');
if( !$_SESSION[ADMIN_USERID] || !$_SESSION[ADMIN_PASSWD]) { $tools->alertJavaGo('경고! 잘못된 접근입니다\n\n로그인 하세요', '../index.php');}
$shop_link = $db->object("cs_admin", "", "shop_domain, shop_name");

include($ROOT_DIR."/lib/page_class.php");
$_GET=&$HTTP_GET_VARS; $_POST=&$HTTP_POST_VARS;
if($_POST[part_code]) { $part_row=$db->object("cs_part", "where part1_code='$_POST[part_code]' or part2_code='$_POST[part_code]' or part3_code='$_POST[part_code]'", "idx"); $_GET[part_idx]=$part_row->idx;} 

// 상품정보변경
if( $_POST[hidden_goods_idx]) { $db->update("cs_goods", "display='$_POST[display]', main_position='$_POST[main_position]', sub_position='$_POST[sub_position]' where idx='$_POST[hidden_goods_idx]'");}

$mv_data	= $_GET[goods_data];
$goods_data	= $tools->decode( $_GET[goods_data] );
if($_GET[idx] )						{ $idx = $_GET[idx]; }											else { $idx = $goods_data[idx]; }
if($_GET[part_idx] )			{ $part_idx = $_GET[part_idx]; }						else { $part_idx = $goods_data[part_idx]; }
if($_GET[listNo] )					{ $listNo = $_GET[listNo]; }									else { $listNo = $goods_data[listNo]; }
if($_GET[startPage] )			{ $startPage = $_GET[startPage]; }					else { $startPage	= $goods_data[startPage]; }
if($_POST[search_item] )	{ $search_item = $_POST[search_item]; }			else { $search_item	= $goods_data[search_item]; }
if($_POST[search_order] )	{ $search_order = $_POST[search_order]; }		else { $search_order	= $goods_data[search_order]; }
?>
<link href="../codeshop.css" rel="stylesheet" type="text/css">
<script language="JavaScript" type="text/JavaScript">
<!--
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
//-->
</script>
<script language="JavaScript" type="text/JavaScript">
<!--
function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function MM_showHideLayers() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}
//-->
</script>
<script language="javascript">
<!--
function sendit() {
	var form=document.goods_form;
	form.submit();
}

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

// 상품정보변경(display, position)
function goodsChange(form_data){
    var choice = confirm( '상품정보변경을 하시겠습니까?');
	if(choice) {form_data.submit();}
}


// 카테고리 수정
function goodsEdit( mv_data ) {
    var choice = confirm( '상품을 수정 하시겠습니까?');
	if(choice) {	location.href='product_edit.php?goods_data='+mv_data; }
	else { return; }
}

// 카테고리 삭제
function goodsDel( mv_data ) {
    var choice = confirm( '상품을 삭제 하시겠습니까?');
	if(choice) {	location.href='product_del_ok.php?goods_data='+mv_data; }
	else { return; }
}


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
	f = document.goods_form;   // 선택된 Form;
	
	if ( depth == 1 && index != -1)  // 대분류 선택 시
	{
		sp_value = f.select1[index].value;
		sp_value = sp_value.split(sep);
		sp_value2 = sp_value[1];
		
		for ( i = f.select2.length; i >= 0; i-- ) {
			f.select2[i] = null; 
		}
		goods_form.part_code.value = "";
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
			goods_form.part_code.value = depth1_value[sp_value2];
			alert("카테고리 선택 완료");
			sendit();
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
		goods_form.part_code.value = "";
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
			goods_form.part_code.value = depth2_value[sp_value2][sp_value3];
			alert("카테고리 선택 완료");
			sendit();
		}
	}
	else if ( depth == 3 && index != -1 )
	{
		goods_form.part_code.value = f.select3[index].value;
		alert("카테고리 선택 완료");
		sendit();
	}
}
////  카테고리 선택 폼 설정 종료 //////////////////////////////////////////////////////////////////////////

function send(form){


	
		var count=0;
	
		for(var i=0; i<form.elements.length; i++) 
		{ 
			if(form.elements[i].checked == true) 
			{ 
				count++; 
				if(count==1){
					aaa = form.elements[i].value;
				} else {
					aaa = aaa+","+form.elements[i].value;
				}	
			} 
		} 
		
		if ( count == 0 ) 
		{ 
			   alert('관련상품을 체크하세요'); 
			   return; 
		} else {
	
			opener.goods_form.zzim.value = aaa;
			window.close();
		}

	

}

//-->
</script>

<table width="690" border="0" align="center" cellpadding="0" cellspacing="0">
	<tr> 
		<td>
			<table width=690 border="0" cellspacing="0" cellpadding="0">
				<tr> 
					<td height="25"><img src="../images/bar_product_list.gif" alt="제품 목록"></td>
				</tr>
			</table>
			<table width=690 height="25" border="1" cellpadding="3" cellspacing="0" bordercolor='#BDBEBD' class="menu" style='border-collapse: collapse'>
				<form action="<?=$_SERVER[PHP_SELF];?>" method="post" name="goods_form">
				<input type="hidden" name="part_code" value="<?=$_POST[part_code];?>">
				<tr> 
					<td align="center">
						<table width="600" border="0" cellpadding="0" cellspacing="0">
							<tr> 
								<td height="30" align="center" valign="middle"><img src="../images/category1.gif" alt="1차 분류" align="absmiddle"></td>
								<td height="30" align="center" valign="middle"><img src="../images/category2.gif" alt="2차 분류" align="absmiddle"></td>
								<td height="30" align="center" valign="middle"><img src="../images/category3.gif" alt="3차 분류" align="absmiddle"></td>
							</tr>
							<tr> 
								<td height="22" align="center" valign="middle">
									<select name="select1" size="5" style="background-color:EFEFEF; width:170;" onClick='change(1, this.form.select1.selectedIndex, this.form)'  class="input">
										<script language = "javascript">
										for ( i = 0 ; i <= depth1.length -1 ; i++ ){	document.write ("<option value='"+ depth1_value[i] + sep + i + "' >" + depth1[i] + "</option>");}
										</script>
									</select>
								</td>
								<td align="center" valign="middle">
									<select name="select2" size="5" style="background-color:EFEFEF; width:170;"  onclick='change(2, this.form.select2.selectedIndex, this.form)' class="input"></select>
								</td>
								<td align="center" valign="middle">
									<select name="select3" size="5" style="background-color:EFEFEF; width:170;" onclick='change(3, this.form.select3.selectedIndex, this.form)' class="input"></select>
								</td>
							</tr>
						</table>	
					</td>
				</tr>
				</form>
			</table><br>

			<? if( $part_idx ) { ?>
			<?
			if($part_idx) {
				$part_stat_row = $db->object("cs_part", "where idx=$part_idx");
				if( $part_stat_row->part_index == 1 ) {
					$part_result = $db->select("cs_part", "where part1_code='$part_stat_row->part1_code' && part_index=1 order by idx asc", "part_name");
				} else if( $part_stat_row->part_index == 2 ) {
					$part_result = $db->select("cs_part", "where (part1_code='$part_stat_row->part1_code' && part_index=1) || (part2_code ='$part_stat_row->part2_code' && part_index=2) order by idx asc", "part_name");
				} else if( $part_stat_row->part_index == 3 ) {
					$part_result = $db->select("cs_part", "where (part1_code='$part_stat_row->part1_code' && part_index=1) || (part2_code ='$part_stat_row->part2_code' && part_index=2) || (part3_code='$part_stat_row->part3_code' && part_index=3) order by idx asc", "part_name");
				}
				$i=0;
				while( $part_stat_row = @mysql_fetch_object( $part_result )) {
					$i++;
					$part_name.=$i."차 카테고리 : <font color='#FF0000'>".$part_stat_row->part_name."</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				}
			}
			?>
			<table width=690 border="0" cellspacing="0" cellpadding="3" class="menu" style='border-collapse: collapse'>
				<tr>
					<td><?=$part_name;?></td>
				</tr>
			</table>
			<table width=690 border="1" cellspacing="0" cellpadding="3" bordercolor='#BDBEBD' class="menu" style='border-collapse: collapse'>
				<tr align="center" bgcolor="EFEFEF"> 
					<td height="25">No</td>
					<td height="25">상품코드</td>
					<td height="25">이미지</td>
					<td height="25" bgcolor="EFEFEF">상품명</td>
					<td height="25">판매가격</td>
					<td height="25">관리</td>
				</tr>
				<form name="form" method="post">
				<?
				$table				= "cs_goods";
				$listScale			=	15; 		// 리스트 수
				$pageScale		=	15;		// 페이지 수
				if( !$startPage ) { $startPage = 0; }		// 스타트 페이지
				$totalPage = floor($startPage / ($listScale * $pageScale));		// 토탈페이지
				if( $search_item == 1 ) {
					$totalList	= $db->cnt( $table, "where part_idx=$part_idx and name like '%$search_order%'" );
					$result		= $db->select( $table, "where part_idx=$part_idx and name like '%$search_order%' order by idx desc" );
				} else if( $search_item == 2 ) {
					$totalList	= $db->cnt( $table, "where part_idx=$part_idx and code like '$search_order'" );
					$result		= $db->select( $table, "where part_idx=$part_idx and code like '$search_order' order by idx desc" );
				} else { 
					$totalList	= $db->cnt( $table, "where part_idx=$part_idx" );
					$result		= $db->select( $table, "where part_idx=$part_idx order by idx desc" );
				}
				
				$form_name=0; // 폼리스트 변수
				if( $startPage ) { $listNo = $totalList - $startPage; } else { $listNo = $totalList; }		// 페이지넘버
				while( $row = mysql_fetch_object($result)) {
						$form_name++; // 폼네임변경 숫자증가
						$goods_data = $tools->encode("idx=".$row->idx."&startPage=".$startPage."&listNo=".$listNo."&table=".$table."&part_idx=".$part_idx."&search_item=".$search_item."&search_order=".$search_order);
				?>
				<input type="hidden" name="hidden_goods_idx" value="<?=$row->idx;?>">
				<tr align="center"> 
					<td width="40" height="25"><?=$listNo;?></td>
					<td width="65" height="25"><?=$row->code;?></td>
					<td width="65" height="25"><img src="../../data/goodsImages/<?=$row->images1?>" border='0' width=40 height=40 align=center></td>
					<td height="25" align="left">&nbsp;<font color="#"><?=$db->stripSlash($row->name);?></font></td>
					<td width="80" height="25" align="right"><?=number_format($row->shop_price);?>&nbsp;원</td>
					<td width="100" height="25"><input type=checkbox name=check[] value="<?=$row->idx?>"></td>
				</tr>
				
				<?
					$listNo--;	
				}
				?>
				</form>
				<tr>
					<td colspan=6 align=right><a href="javascript:send(this.form);">[선택상품등록]</a></td>
				</tr>
				
				<? if( !$totalList ) { ?>
				<tr align="center"> 
					<td height="100" colspan="8" align="center"> 등록된 상품이 없습니다.</td>
				</tr>
				<?}?>
			</table>
			
			<!--table width=690 border="0" cellpadding="0" cellspacing="0" class="submenu">
				<tr> 
					<td height="25" align="center" valign="middle"><? $page->goods( $part_idx, $table, $totalPage, $totalList, $listScale, $pageScale, $startPage, "<img src='../images/prev.gif' border='0'>", "<img src='../images/next.gif' border='0'>", $search_item, $search_order );?></td>
				</tr>
			</table-->
			
			<table width=690 border="0" cellspacing="0" cellpadding="0">
				<form method="post" name="goods_search_form" action="<?=$_SERVER[PHP_SELF];?>">
				<input type="hidden" name="part_code" value="<?=$_POST[part_code];?>">
				<tr> 
					<td height="25">
						<select name="search_item" class="input">
							<option value="1">제품명</option>
							<option value="2">제품번호</option>
						</select> 
						<input name="search_order" type="text" class="input"> <a href="javascript:search();"><img src="../images/bt_search.gif" width="38" height="19" align="absmiddle" border="0"></a>
					</td>
				</tr>
				</form>
			</table>
			<?} else {?>
			
			<table width=690 border="0" cellspacing="0" cellpadding="3" class="menu" style='border-collapse: collapse'>
				<tr>
					<td><?=$part_name;?></td>
				</tr>
			</table>
			<table width=690 border="1" cellspacing="0" cellpadding="3" bordercolor='#BDBEBD' class="menu" style='border-collapse: collapse'>
				<tr align="center" bgcolor="EFEFEF"> 
					<td height="25">No</td>
					<td height="25">상품코드</td>
					<td height="25">이미지</td>
					<td height="25" bgcolor="EFEFEF">상품명</td>
					<td height="25">판매가격</td>
					<td height="25">관리</td>
				</tr>
				<form name="form" method="post">
				<?
				$table				= "cs_goods";
				$listScale			=	15; 		// 리스트 수
				$pageScale		=	15;		// 페이지 수
				if( !$startPage ) { $startPage = 0; }		// 스타트 페이지
				$totalPage = floor($startPage / ($listScale * $pageScale));		// 토탈페이지
				$totalList	= $db->cnt( $table, "" );
				$result		= $db->select( $table, "order by idx desc" );
				
				$form_name=0; // 폼리스트 변수
				if( $startPage ) { $listNo = $totalList - $startPage; } else { $listNo = $totalList; }		// 페이지넘버
				while( $row = mysql_fetch_object($result)) {
						$form_name++; // 폼네임변경 숫자증가
						$goods_data = $tools->encode("idx=".$row->idx."&startPage=".$startPage."&listNo=".$listNo."&table=".$table."&part_idx=".$part_idx."&search_item=".$search_item."&search_order=".$search_order);
				?>
				<input type="hidden" name="hidden_goods_idx" value="<?=$row->idx;?>">
				<tr align="center"> 
					<td width="40" height="25"><?=$listNo;?></td>
					<td width="65" height="25"><?=$row->code;?></td>
					<td width="65" height="25"><img src="../../data/goodsImages/<?=$row->images1?>" border='0' width=40 height=40 align=center></td>
					<td height="25" align="left">&nbsp;<font color="#"><?=$db->stripSlash($row->name);?></font></td>
					<td width="80" height="25" align="right"><?=number_format($row->shop_price);?>&nbsp;원</td>
					<td width="100" height="25"><input type=checkbox name=check[] value="<?=$row->idx?>"></td>
				</tr>
				
				<?
					$listNo--;	
				}
				?>
				</form>
				<tr>
					<td colspan=6 align=right><a href="javascript:send(this.form);">[선택상품등록]</a></td>
				</tr>
				<? if( !$totalList ) { ?>
				<tr align="center"> 
					<td height="100" colspan="8" align="center"> 등록된 상품이 없습니다.</td>
				</tr>
				<?}?>
			</table>
			<?}?><br>
		</td>
		<td></td>
	</tr>
</table>