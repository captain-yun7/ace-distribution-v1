<? $mod=menu06 ?>
<? $menu=1; ?>
<? include('../header.php'); ?>

<script language="JavaScript">
<!--
// 카테고리 수정
function pageEdit( idx ) {
    
	location.href='page_edit.php?idx='+idx; 
}

// 카테고리 삭제
function pageDel( idx ) {
    var choose = confirm( '삭제 하시겠습니까?');
	if(choose) {	location.href='page_del_ok.php?idx='+idx; }
	else { return; }
}
//-->
</script>


			<!-- <table class="table table-bordered table-hover ">
				<tr> 
					<td height="35" align="right"><a href="page_add.php" class="btn btn-primary">페이지등록</a></td>
				</tr>
			</table> -->
			<h3 class="page-header">페이지관리</h3>
			<table class="table table-bordered table-hover ">
				<tr bgcolor="EFEFEF"> 
					<td width="30" height="25" align="center">No</td>
					<td width="150" height="25" align="center">페이지 INDEX</td>
					<td height="25" align="center">페이지 타이틀</td>
					<!-- <td width="70" height="25" align="center">작성형태</td> -->
					<td width="200" height="25" align="center">관리</td>
				</tr>
				<?
				$table = "cs_page";
				$list_check = $totalCnt	= $db->cnt( $table, "" );
				$result	= $db->select( $table, "order by idx asc" );
				$totalCnt=1;
				while( $row = mysql_fetch_object($result)) {
				?>
				<tr> 
					<td height="25" align="center"><?=$totalCnt;?></td>
					<td height="25" align="center"><?=$row->page_index;?></td>
					<td height="25" align="center"><?=$row->title;?></td>
					<!-- <td height="25" align="center"><? if( $row->tag==0 ) { echo('TEXT');} else if( $row->tag==1 ) { echo('HTML');}?></td>           -->
					<td height="25" align="center"><a href="javascript:pageEdit(<?=$row->idx;?>)" class="btn btn-primary">수정</a><!-- &nbsp;<a href="javascript:pageDel(<?=$row->idx;?>)"class="btn btn-danger">삭제</a> --></td>
				</tr>
				<?
					$totalCnt++;
				}
				?>
				
				<? if( !$list_check ) {?>
				<tr align="center"> 
					<td height="100" colspan="7" align="center"> 등록된 베너 목록이 없습니다.</td>
				</tr>
				<?}?>
			</table><br>
		
<? include('../footer.php');?>