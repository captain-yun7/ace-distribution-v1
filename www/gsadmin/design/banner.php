<? $mod=menu07 ?>
<? $menu = "02"; ?>
<? include('../header.php');?>
<script language="JavaScript">
<!--
// 수정
function bannerEdit( idx ) {
    var choose = confirm( '수정 하시겠습니까?');
	if(choose) {	location.href='banner_edit.php?idx='+idx; }
	else { return; }
}

// 삭제
function bannerDel( idx ) {
    var choose = confirm( '삭제 하시겠습니까?');
	if(choose) {	location.href='banner_del_ok.php?idx='+idx; }
	else { return; }
}
//-->
</script>

<div class="span10">
<div>
	<h3 class="page-header">배너관리</h3>
</div>

			<table class="table table-bordered table-hover ">
				<tr> 
					<td align=right>
					<a href="banner_add.php" class="btn btn-primary">배너등록</a></td>
				</tr>
			</table>
			<table class="table table-bordered table-hover ">
				<tr bgcolor="EFEFEF"> 
					<th width="30" height="25" align="center">No</td>
					<th width="70" height="25" align="center">출력 형태</td>
					<th width="120" height="25" align="center">베너 위치</td>
					<th height="25" align="center">베 너 명</td>
					<th width="200" height="25" align="center">관리</td>
				</tr>
				<?
				$table = "cs_banner";
				$list_check = $totalCnt	= $db->cnt( $table, "" );
				$result	= $db->select( $table, "order by idx desc" );
				while( $row = mysql_fetch_object($result)) {
				?>
				<tr> 
					<td width="30" height="25" style="text-align:center;"><?=$totalCnt;?></td>
					<td width="70" height="25" style="text-align:center;"><? if( $row->display==0 ) { echo('HTML');} else if( $row->display==1 ) { echo('IMAGES');}?></td>
					<td width="120" height="25" style="text-align:center;"><? if( $row->status==0 ) { echo('미사용');} else if( $row->status==1 ) { echo('메인중앙');} else if( $row->status==2 ) { echo('메인하단');} else if( $row->status==3 ) { echo('연혁');} else if( $row->status==4 ) { echo('우측');} else if( $row->status==5 ) { echo('스크롤1');}?></td>
					<td height="25" style="text-align:center;"><?=$row->title;?></td>
					<td width="200" height="25" style="text-align:center;"><a href="javascript:bannerEdit(<?=$row->idx;?>)" class="btn btn-primary">수정</a>&nbsp;<a href="javascript:bannerDel(<?=$row->idx;?>)" class="btn btn-danger">삭제</a></td>
				</tr>
				<?
					$totalCnt--;
				}
				?>
				
				<? if( !$list_check ) {?>
				<tr align="center"> 
					<td height="100" colspan="7" align="center"> 등록된 베너 목록이 없습니다.</td>
				</tr>
				<?}?>
			</table>

</div>
</div>

<? include('../footer.php');?>