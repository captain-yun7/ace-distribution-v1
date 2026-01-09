<? $mod=menu04 ?>
<? $menu=2?>
<?
include("../header.php");
include($ROOT_DIR."/lib/page_class.php");

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
    var choice = confirm( '제품정보변경을 하시겠습니까?');
	if(choice) {form_data.submit();}
}


// 카테고리 수정
function goodsEdit( mv_data ) {
    var choice = confirm( '제품정보를을 수정 하시겠습니까?');
	if(choice) {	location.href='product_edit.php?goods_data='+mv_data; }
	else { return; }
}

// 카테고리 삭제
function goodsDel( mv_data ) {
    var choice = confirm( '제품을 삭제 하시겠습니까?');
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

function goodsRanking(part_idx){
	var winleft = (screen.width - 400) / 2;
	var wintop = (screen.height - 500) / 2;
	window.open("product_ranking.php?part_idx="+part_idx,"","scrollbars=no, width=320, height=420, top="+wintop+", left="+winleft+"");
}

//-->
</script>


<div>
	<h3 class="page-header">제품목록</h3>
</div>


			<table class="table table-bordered">
				<form action="<?=$_SERVER[PHP_SELF];?>" method="post" name="goods_form">
				<input type="hidden" name="part_code" value="<?=$_POST[part_code];?>">

				<tr> 
					<th>분류선택</th>
					<th>
						<table class="table table-bordered">
							<tr> 
								<td><span class="btn btn-primary btn-xs btn-grad btn-rect">&nbsp;&nbsp;1차 카테고리&nbsp;&nbsp;</span></td>
								<td><span class="btn btn-primary btn-xs btn-grad btn-rect">&nbsp;&nbsp;2차 카테고리&nbsp;&nbsp;</span></td>
								<td><span class="btn btn-primary btn-xs btn-grad btn-rect">&nbsp;&nbsp;3차 카테고리&nbsp;&nbsp;</span></td>
							</tr>
							<tr> 
								<td>
									<select name="select1" onClick='change(1, this.form.select1.selectedIndex, this.form)'  class="form-control"  multiple="multiple">
										<script language = "javascript">
										for ( i = 0 ; i <= depth1.length -1 ; i++ ){	document.write ("<option value='"+ depth1_value[i] + sep + i + "' >" + depth1[i] + "</option>");}
										</script>
									</select>
								</td>
								<td>
									<select name="select2" onclick='change(2, this.form.select2.selectedIndex, this.form)' class="form-control"  multiple="multiple"></select>
								</td>
								<td>
									<select name="select3" onclick='change(3, this.form.select3.selectedIndex, this.form)' class="form-control"  multiple="multiple"></select>
								</td>
							</tr>
						</table>	

						</th>
					</tr>
					</form>
				</table><br>

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
			} else {
				$part_name = "전체";
			}
			?>


			<table class="table table-bordered table-hover ">
				<tr>
					<th><?=$part_name;?>&nbsp;&nbsp;
					<? if($part_idx){ ?><a href="javascript:goodsRanking(<?=$part_idx;?>)" class="glyphicon glyphicon-th-list btn btn-danger btn-xs" aria-hidden="true"> 순위설정</a><? } ?>
					</th>
				</tr>
			</table>



			<table class="table table-bordered table-hover " >

				<colgroup>
					<col width="5%" title="No" >
					<col width="10%" title="Display">
					<col width="10%" title="상품코드">
					<col width="*" title="제품명">
					<col width="10%" title="메인위치">
					<col width="10%" title="서브위치">
					<col width="15%" title="관리">
				</colgroup>

				<thead>
					<th>No</th>
					<th>Display</th>
					<th>상품코드</th>
					<th>제품명</th>
					<!-- <th>판매가격</th> -->
					<th>메인위치</th>
					<th>서브위치</th>
					<th>관리</th>
				</thead>

				<?
				$table				= "cs_goods";
				$listScale			=	15; 		// 리스트 수
				$pageScale		=	15;		// 페이지 수
				if( !$startPage ) { $startPage = 0; }		// 스타트 페이지
				$totalPage = floor($startPage / ($listScale * $pageScale));		// 토탈페이지
					
				if($part_idx){
					
					if( $search_item == 1 ) {
						$totalList	= $db->cnt( $table, "where part_idx=$part_idx and name like '%$search_order%'" );
						$result		= $db->select( $table, "where part_idx=$part_idx and name like '%$search_order%' order by idx desc LIMIT $startPage, $listScale" );
					} else if( $search_item == 2 ) {
						$totalList	= $db->cnt( $table, "where part_idx=$part_idx and code like '$search_order'" );
						$result		= $db->select( $table, "where part_idx=$part_idx and code like '$search_order' order by idx desc LIMIT $startPage, $listScale" );
					} else { 
						$totalList	= $db->cnt( $table, "where part_idx=$part_idx" );
						$result		= $db->select( $table, "where part_idx=$part_idx order by idx desc LIMIT $startPage, $listScale" );
					}

				} else {
					
					if( $search_item == 1 ) {
						$totalList	= $db->cnt( $table, "where name like '%$search_order%'" );
						$result		= $db->select( $table, "where name like '%$search_order%' order by idx desc LIMIT $startPage, $listScale" );
					} else if( $search_item == 2 ) {
						$totalList	= $db->cnt( $table, "where code like '$search_order'" );
						$result		= $db->select( $table, "where code like '$search_order' order by idx desc LIMIT $startPage, $listScale" );
					} else { 
						
						$totalList	= $db->cnt( $table, "" );
						$result		= $db->select( $table, " order by idx desc LIMIT $startPage, $listScale" );

					}
				}
				
				$form_name=0; // 폼리스트 변수
				if( $startPage ) { $listNo = $totalList - $startPage; } else { $listNo = $totalList; }		// 페이지넘버
				while( $row = mysql_fetch_object($result)) {
						$form_name++; // 폼네임변경 숫자증가
						$goods_data = $tools->encode("idx=".$row->idx."&startPage=".$startPage."&listNo=".$listNo."&table=".$table."&part_idx=".$row->part_idx."&search_item=".$search_item."&search_order=".$search_order);
				?>
				<form name="form_<?=$form_name?>" method="post" action="<?=$_SERVER[PHP_SELF];?>?goods_data=<?=$goods_data;?> " class="input-medium search-query">
				<input type="hidden" name="hidden_goods_idx" value="<?=$row->idx;?>">
				<tr> 
					<td class="text-center"><?=$listNo;?></td>
					<td class="text-center">
						<select name="display" class="form-control"  onChange="javascript:goodsChange(document.form_<?=$form_name?>);" >
							<option value="0" <? if( $row->display == 0 ) { echo("selected");} ?>>준비중</option>
							<option value="1" <? if( $row->display == 1 ) { echo("selected");} ?>>판매중</option>
						</select>
					</td>
					<td class="text-center"><?=$row->code;?></td>
					<td>&nbsp;<font color="#"><?=$db->stripSlash($row->name);?></font></td>
					<!-- <th><?=number_format($row->shop_price);?>&nbsp;원</th> -->
					<td class="text-center">
						<select name="main_position" class="form-control"  onChange="javascript:goodsChange(document.form_<?=$form_name?>);" >
							<option value="0" <? if( $row->main_position == 0 ) { echo("selected");} ?>>선 택</option>
							<option value="1" <? if( $row->main_position == 1 ) { echo("selected");} ?>>BEST</option>
						</select>
					</td>
					<td class="text-center">
						<select name="sub_position" class="form-control"  onChange="javascript:goodsChange(document.form_<?=$form_name?>);" >
							<option value="0" <? if( $row->sub_position == 0 ) { echo("selected");} ?>>선 택</option>
							<option value="1" <? if( $row->sub_position == 1 ) { echo("selected");} ?>>BEST</option>
						</select>
					</td>

					<td class="text-center">
						<a href="javascript:goodsEdit('<?=$goods_data;?>');" class="btn btn-primary">수 정</a>&nbsp;
						<a href="javascript:goodsDel('<?=$goods_data;?>');" class="btn btn-danger">삭 제</a>
					</td>

				</tr>
				</form>
				<?
					$listNo--;	
				}
				?>
				
				
				<? if( !$totalList ) { ?>
				<tr> 
					<td colspan="8" class="text-center" style="font-weight:bold"> 등록된 상품이 없습니다.</td>
				</tr>
				<?}?>
			</table>
			
		
			<div align="center">
				<nav>
				  <ul class="pagination">
						<? $page->goods( $part_idx, $table, $totalPage, $totalList, $listScale, $pageScale, $startPage, "<span aria-hidden='true'>&laquo;</span>", "<span aria-hidden='true'>&raquo;</span>", $search_item, $search_order );?></td>
				 </ul>
				</nav>
			</div>

	
			<div class="well well-small">
				<form method="post" name="goods_search_form" class="form-inline" action="<?=$_SERVER[PHP_SELF];?>">
				<input type="hidden" name="part_code" value="<?=$_POST[part_code];?>">
				<tr> 
					<td>
						<select name="search_item" class="form-control">
							<option value="1">제품명</option>
							<option value="2">제품번호</option>
						</select> 
						<input name="search_order" type="text" class="form-control" placeholder="Search"> 
						<a href="javascript:search();" class="btn btn-primary" title="검색"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>
					</td>
				</tr>
				</form>
			</div>
		

<? include('../footer.php');?>