<? $mod=menu07 ?>
<? $menu=1?>
<?include ("../header.php");?>


<div>
	<h3 class="page-header">팝업창 리스트</h3>
</div>

			<table class="table table-bordered table-hover ">
				<colgroup>
					<col width="10%">
					<col width="15%">
					<col width="*">
					<col width="10%">
					<col width="10%">
					<col width="10%">
					<col width="20%">
				</colgroup>
				<thead>
				<tr>
					<th >No</th>
					<th>출력 형태</th>
					<th>브라우져 타이틀바</th>
					<th>시작일</th>
					<th>종료일</th>
					<th>팝업상태</th>
					<th>관리</th>
				</tr>
				 </thead>
				<?
				$table = "cs_popup";
				$list_check = $totalCnt	= $db->cnt( $table, "" );
				$result	= $db->select( $table, "order by idx desc" );
				while( $row = mysql_fetch_object($result)) {
				?>
				<tr>
					<td style="text-align:center;vertical-align:middle;"><?=$totalCnt;?></td>
					<td style="text-align:center;vertical-align:middle;">
					<? if( $row->display==0 ) { echo('HTML');} else if( $row->display==1 ) { echo('IMAGES');}?>
					/
					<? if( $row->kind==0 ) { echo('팝업');} else if( $row->kind==1 ) { echo('레이어');}?>
					</td>
					<td style="text-align:center;vertical-align:middle;"><?=$row->title_bar;?></td>
					<td style="text-align:center;vertical-align:middle;"><?=date("Y-m-d", $row->start_day);?></td>
					<td style="text-align:center;vertical-align:middle;"><?=date("Y-m-d", $row->end_day);?></td>
					<td style="text-align:center;vertical-align:middle;"><? if($row->end_day < time()) { echo "종료"; } else if(($row->start_day < time()) && ($row->end_day > time())) { echo "사용중";} else if($row->start_day > time()) { echo "미사용";}?></td>
					<td style="text-align:center;vertical-align:middle;">
					<a href="javascript:popupEdit(<?=$row->idx;?>)" class="btn btn-primary">수정</a>
					<a href="javascript:popupDel(<?=$row->idx;?>)" class="btn btn-danger">삭제</a>
					</td>
				</tr>
				<?
					$totalCnt--;
				}
				?>

				<? if( !$list_check ) {?>
				<tr>
					<td colspan="7" style="text-align:center;"> 등록된 팝업내역이 없습니다.</td>
				</tr>
				<?}?>
			</table><br>

			<div style="text-align:right;" class="submitBtn">
				<div class="submitBtnBtn">
					<a href="popup_add.php" class="btn btn-primary">팝업추가</a>
				</div>
			</div>




<script language="JavaScript">
<!--
// 수정
function popupEdit( idx ) {
    var choose = confirm( '수정 하시겠습니까?');
	if(choose) {	location.href='popup_edit.php?idx='+idx; }
	else { return; }
}

// 삭제
function popupDel( idx ) {
    var choose = confirm( '삭제 하시겠습니까?');
	if(choose) {	location.href='popup_del_ok.php?idx='+idx; }
	else { return; }
}
//-->
</script>
<? include('../footer.php');?>