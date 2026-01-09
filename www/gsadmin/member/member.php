<? $mod=menu03 ?>
<? $menu=1?>
<?
include('../header.php');
include($ROOT_DIR."/lib/page_class.php");
// 회원레벨 수정(level) 변수
if($level && $hidden_level_idx) { $db->update("cs_member", "level='$level' where idx='$hidden_level_idx'");}

?>
<script language="JavaScript">
<!--
// 검색기능
function search(){
	var form=document.mem_form;
	if(form.search_item.value < 4 && form.search_order.value=="")	{
		alert("검색할 내용을 입력해 주십시오.");
		form.search_order.focus();
	} else {
		form.submit();
	}
}

// 통합 정렬 검색
function orderSearch() {
	var form=document.form_search_total;
	if(form.order_chk.value=="0")	{
		alert("통합검색의 옵션을 선택해주세요.");
	} else if(form.order_chk.value=="1" && form.order_list.value=="0")	{
		alert("정렬방식을 선택해주세요.");
	} else if(form.order_chk.value=="2" && form.search_01.value=="0")	{
		alert("회원등급을 선택해주세요.");
	} else if(form.order_chk.value=="4" && form.search_03.value=="0")	{
		alert("지역을 선택해주세요.");
	} else {
		form.submit();
	}
}

// 회원레벨수정
function levelChange(form_data){
	form_data.submit();
}


// 회원정보 삭제
function memDel( idx,startPage,listNo,table,search_item,search_order,order_chk,order_list,search_01,search_02,search_03 ) {
    var choose = confirm( '영구히 삭제 하시겠습니까?');
	if(choose) {	location.href='member_del_ok.php?idx='+idx+'startPage='+startPage+'listNo='+listNo+'table='+table+'search_item='+search_item+'search_order='+search_order+'order_chk='+order_chk+'order_list='+order_list+'search_01='+search_01+'search_02='+search_02+'search_03='+search_03; }
	else { return; }
}

// 포인트 설정창 오픈
function pointWinOpen(data) {
	window.open("point.php?userid="+data,"","scrollbars=yes, width=418, height=300");
}

// 회원에게 메일 보내기
function userSendmailWinOpen(data) {
	window.open("user_sendmail.php?user_mail="+data,"","scrollbars=no, width=484, height=500");
}

// 검색부분
function showSearch(){
	var form=document.form_search_total;
	if(form.order_chk.value== 1) {
		form.order_list.style.display="";
		form.search_01.style.display="none";
		form.search_02.style.display="none";
		form.search_03.style.display="none";
	} else if(form.order_chk.value ==2) {
		form.order_list.style.display="none";
		form.search_01.style.display="";
		form.search_02.style.display="none";
		form.search_03.style.display="none";
	} else if(form.order_chk.value ==3) {
		form.order_list.style.display="none";
		form.search_01.style.display="none";
		form.search_02.style.display="";
		form.search_03.style.display="none";
	} else if(form.order_chk.value ==4) {
		form.order_list.style.display="none";
		form.search_01.style.display="none";
		form.search_02.style.display="none";
		form.search_03.style.display="";
	} else {
		form.order_list.style.display="none";
		form.search_01.style.display="none";
		form.search_02.style.display="none";
		form.search_03.style.display="none";
	}
}
//-->
</script>
<?
$listScale			=	15; 		// 리스트갯수
$pageScale		=	15;		// 페이지 갯수
if( !$startPage ) { $startPage = 0; }		// 스타트 페이지
$totalPage = floor($startPage / ($listScale * $pageScale));		// 토탈페이지
if( $search_item == 1 ) {
	$totalList	= $db->cnt( "cs_member", "where userid like '$search_order%'" );
	$result		= $db->select( "cs_member", "where userid like '$search_order%' order by idx desc LIMIT $startPage, $listScale" );
} else if( $search_item == 2 ) {
	$totalList	= $db->cnt( "cs_member", "where name like '$search_order%'" );
	$result		= $db->select( "cs_member", "where name like '$search_order%' order by idx desc LIMIT $startPage, $listScale" );
} else if( $search_item == 3 ) {
	$totalList	= $db->cnt( "cs_member", "where email like '$search_order%'" );
	$result		= $db->select( "cs_member", "where email like '$search_order%' order by idx desc LIMIT $startPage, $listScale" );
} else if( $order_chk == 2 ) {
	$totalList	= $db->cnt( "cs_member", "where level =$search_01" );
	$result		= $db->select( "cs_member", "where level =$search_01 order by idx desc LIMIT $startPage, $listScale" );
} else if( $order_chk == 3 ) {
	if(!$search_02) { $search_02 =0;}
	$totalList	= $db->cnt( "cs_member", "where mailing=$search_02" );
	$result		= $db->select( "cs_member", "where mailing=$search_02 order by idx desc LIMIT $startPage, $listScale" );
} else if( $order_chk == 4 ) {
	$totalList	= $db->cnt( "cs_member", "where add1 like '%$search_03%'" );
	$result		= $db->select( "cs_member", "where add1 like '%$search_03%' order by idx desc LIMIT $startPage, $listScale" );
} else {
	// 정렬방식 1:이름, 2:아이디, 3:가입일, 4:포인트, 5:구매금액, 6:구매횟수
	if($order_list ==1) {
		$totalList	= $db->cnt( "cs_member", "" );
		$result		= $db->select( "cs_member", "order by name asc LIMIT $startPage, $listScale" );
	} else if($order_list==2) {
		$totalList	= $db->cnt( "cs_member", "" );
		$result		= $db->select( "cs_member", "order by userid asc LIMIT $startPage, $listScale" );
	} else if($order_list==3) {
		$totalList	= $db->cnt( "cs_member", "" );
		$result		= $db->select( "cs_member", "order by register desc LIMIT $startPage, $listScale" );
	} else {
		$totalList	= $db->cnt( "cs_member", "" );
		$result		= $db->select( "cs_member", "order by idx desc LIMIT $startPage, $listScale" );
	}
}
?>


<div>
	<h3 class="page-header">회원 목록</h3>
</div>


		<form name="form_search_total" class="form-inline" method="get" action="<?=$_SERVER[PHP_SELF];?>?mem_data=<?=$mem_data;?>" >
			<div class="well well-small" style="text-align:right;">

					전체 회원 : <font color="#FF0000"><?=number_format($totalList);?></font> 명&nbsp;&nbsp;
					<select name="order_chk" class="form-control"   onchange="javascript:showSearch();">
						<option value="0" <? if($order_chk == 0) echo('selected');?>>통합검색</option>
						<option value="1" <? if($order_chk == 1) echo('selected');?>>정렬방식</option>
						<option value="2" <? if($order_chk == 2) echo('selected');?>>회원등급</option>
						<!-- <option value="4" <? if($order_chk == 4) echo('selected');?>>지역검색</option> -->
					</select>

					<select name="order_list" class="form-control"   style="display:none" >
						<option value="0" <? if($order_list == 0) echo('selected');?>>정렬방식</option>
						<option value="1" <? if($order_list == 1) echo('selected');?>>이름</option>
						<option value="2" <? if($order_list == 2) echo('selected');?>>아이디</option>
						<option value="3" <? if($order_list == 3) echo('selected');?>>가입일</option>
					</select>

					<select name="search_01" class="form-control"   style="display:none" >
						<option value="0" <? if($search_01 == 0) echo('selected');?>>회원등급</option>
						<option value="1" <? if($search_01 == 1) echo('selected');?>>학생회원</option>
						<option value="2" <? if($search_01 == 2) echo('selected');?>>특별회원</option>
					</select>

					<select name="search_02" class="form-control"   style="display:none" >
						<option value="0" <? if($search_02 == 0) echo('selected');?>>메일거부</option>
						<option value="1" <? if($search_02 == 1) echo('selected');?>>메일수신</option>
					</select>

					
					<a href="javascript:orderSearch();" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>

			</div>
			</form>

<div class="table-responsive" >

			<table class="table table-bordered table-hover" >
				<caption></caption>
				<colgroup>
					<col width="5%" title="No" >
					<col width="10%" title="아이디">
					<col width="10%" title="이름">
					<col width="15%" title="생년월일">
					<col width="10%" title="휴대폰">
					<col width="*" title="이메일">
					<col width="10%" title="가입일자">
					<col width="10%" title="관리">
				</colgroup>

				<thead>
					<tr>
						<th>No</th>
						<th>아이디</th>
						<th>이 름</th>
						<th>생년월일</th>
						<th>휴대폰</th>
						<th>이메일</th>
						<th>가입일자</th>
						<th>관리</th>
					</tr>
					</thead>
				<tbody>

				<?
				$form_name=0; // 폼리스트 변수
				if( $startPage ) { $listNo = $totalList - $startPage; } else { $listNo = $totalList; }		// 페이지넘버
				while( $row = mysql_fetch_object($result)) {
					$form_name++; // 폼네임변경 숫자증가
					
				?>
				<form name="form_<?=$form_name?>" class="form-inline"  method="get" action="<?=$_SERVER[PHP_SELF];?>?mem_data=<?=$mem_data;?>">
				<input type="hidden" name="hidden_level_idx" value="<?=$row->idx;?>">
				<tr>
					<td class="text-center"><?=$listNo;?></td>
					<td class="text-center"><?=$row->userid;?></td>
					<td class="text-center"><?=$row->name;?></td>
					<td class="text-center"><?=$row->birth?></td>		
					<td class="text-center"><?=$row->phone;?></td>
					<td class="text-center"><a href="mailto:<?=$row->email;?>"><?=$row->email;?></a></td>	
					<td class="text-center"><?=$tools->strDateCut($row->register,1);?></td>
					<td class="text-center">
					<a href="member_view.php?idx=<?=$row->idx?>&startPage=<?=$startPage?>&listNo=<?=$listNo?>&table=<?=$table?>&search_item=<?=$search_item?>&search_order=<?=$search_order?>&order_chk=<?=$order_chk?>&order_list=<?=$order_list?>&search_01=<?=$search_01?>&search_02=<?=$search_02?>&search_03=<?=$search_03?>" class="btn btn-primary">상세</a>
					<a href="javascript:memDel('<?=$row->idx?>','<?=$startPage?>','<?=$listNo?>','<?=$table?>','<?=$search_item?>','<?=$search_order?>','<?=$order_chk?>','<?=$order_list?>','<?=$search_01?>','<?=$search_02?>','<?=$search_03?>');" class="btn btn-danger">삭제</a>
					</td>
				</tr>
				</form>
				<?
					$listNo--;
				}
				?>

				<? if(!$totalList) {?>
				<tr>
					<td colspan="10" class="text-center"> 가입한 회원이 없습니다.</td>
				</tr>
				<?}?>
				</tbody>
			</table>
</div>




	<div align="center">
		<nav>
		  <ul class="pagination">

<?
		if( $totalList > $listScale ) {
			if( $startPage+1 > $listScale*$pageScale ) {
				$prePage = $startPage - $listScale * $pageScale;
				
				echo "<li><a href='$_SERVER[PHP_SELF]?startPage=$prePage&search_item=$search_item&search_order=$search_order&order_chk=$order_chk&order_list=$order_list&search_01=$search_01&search_02=$search_02&search_03=$search_03' ><span aria-hidden='true'>&laquo;</span></a></li>";
			}

			for( $j=0; $j<$pageScale; $j++ ) {
				$nextPage = ($totalPage * $pageScale + $j) * $listScale;
				$pageNum = $totalPage * $pageScale + $j+1;
				if( $nextPage < $totalList ) {
					if( $nextPage!= $startPage ) {
						
						echo "<li><a href='$_SERVER[PHP_SELF]?startPage=$nextPage&search_item=$search_item&search_order=$search_order&order_chk=$order_chk&order_list=$order_list&search_01=$search_01&search_02=$search_02&search_03=$search_03' >$pageNum</a></li>";
					} else {
						echo "<li class='active'><a href='#none'>$pageNum</a></li>";
					}
				}
			}
			if( $totalList > (($totalPage+1) * $listScale * $pageScale)) {
				$nNextPage = ($totalPage+1) * $listScale * $pageScale;
				$mv_data=$this->encode("startPage=".$nNextPage."&search_item=".$search_item."&search_order=".$search_order."&order_chk=".$order_chk."&order_list=".$order_list."&search_01=".$search_01."&search_02=".$search_02."&search_03=".$search_03);
				echo "<li><a href='$_SERVER[PHP_SELF]?startPage=$nNextPage&search_item=$search_item&search_order=$search_order&order_chk=$order_chk&order_list=$order_list&search_01=$search_01&search_02=$search_02&search_03=$search_03' ><span aria-hidden='true'>&raquo;</span></li>";
			}
		}
		if( $totalList <= $listScale) {
			echo "<li class='active'><a href='#none' >1</a></li>";
		}
?>

				 </ul>
			</nav>
		</div>


			
				<form action="<?=$_SERVER[PHP_SELF];?>" method="get" name="mem_form" class="form-inline">	
						<select name="search_item"  class="form-control" >
							<option value="1">아이디</option>
							<option value="2">이 름</option>
							<option value="3">메 일</option>
						</select><input name="search_order" type="text" class="form-control"	placeholder="Search"/>
						<a href="javascript:search();" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>
				</form>



<? include('../footer.php');?>