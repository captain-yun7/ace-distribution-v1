<table width="668" border="0" cellpadding="0" cellspacing="0" id="event">
	<tr>
		<td height="2"><img src="images/line.gif"></td>
	</tr>
	<tr> 
		<td><table width="665" border="1" cellspacing="0" cellpadding="0" bordercolor='#D9D9D9' class="menu" style='border-collapse: collapse'>
			<tr>
				<td><table width="663" border="0" cellspacing="0" cellpadding="0">
					<tr> 
						<td colspan="3"><img src="images/bar_event.gif"></td>
					</tr>
					<tr> 
 <?
	$table				= "cs_goods";
	$listScale			=	50; 		// 출력 상품수
	$pageScale		=	10;		// 페이지 수
	if( !$startPage ) { $startPage = 0; }		// 스타트 페이지
	$totalPage = floor($startPage / ($listScale * $pageScale));		// 토탈페이지
	$totalList	= $db->cnt( $table, "where main_position=4 and display=1" );
	$result		= $db->select( $table, "where main_position=4 and display=1 order by idx desc LIMIT $startPage, $listScale" );
	if( $startPage ) { $listNo = $totalList - $startPage; } else { $listNo = $totalList; }		// 페이지넘버
	$new_cnt = 0; $new_tr = 0; $td_width = 3; // 가로리스트 수
	while( $row = mysql_fetch_object($result)) {
		$new_cnt++;
		//new IMG
		$new_img=""; $hit_img="";
		if($admin_stat->new_mark && $row->new_mark) { $new_img = $page->newImg( $row->register, $admin_stat->new_mark, $row->new_mark, $row->new_mark );}
		// hit IMG
		if($admin_stat->hit_mark && $row->hit_mark) { $hit_img = $page->hitImg( $admin_stat->hit_mark, $row->click, $row->hit_mark, $row->hit_mark );}
		$goods_data = $tools->encode("idx=".$row->idx."&startPage=".$startPage."&listNo=".$listNo."&table=".$table."&part_idx=".$part_idx."&search_item=".$search_item);
?>
				<td width="221" align="center"><table width="215" border="0" cellspacing="0" cellpadding="0">
					<tr> 
						<td width="80" height="80" align="center"><a href="product_view.php?part_idx=<?=$row->part_idx;?>&goods_data=<?=$goods_data;?>"><img src="../data/goodsImages/<?=$row->images1;?>" width="70" height="70" border="1" style="border-color=#dadada"></a></td>
						<td>
							<span class="menu"><a href="product_view.php?part_idx=<?=$row->part_idx;?>&goods_data=<?=$goods_data;?>"><?=$db->stripSlash($tools->strCut($row->name,40));?><?=$hit_img;?>
							<!-- 소비자가 -->
							<? if( !$_SESSION[USERID] && $admin_stat->nomember_old_price ) {?>
							<br><span class="oldprice"><?=number_format($row->old_price);?> 원</span></a>&nbsp;<?=$new_img;?>
							<?} else if( $_SESSION[USERID] && $admin_stat->member_old_price ) {?>
							<br><span class="oldprice"><?=number_format($row->old_price);?> 원</span></a>&nbsp;<?=$new_img;?>
							<?}?>
							<!-- 판매가 -->
							<? if( !$_SESSION[USERID] && $admin_stat->nomember_shop_price ) {?>
							<br><span class="menupurple"><?=number_format($row->shop_price);?> 원</span>&nbsp;
							<?} else if( $_SESSION[USERID] && $admin_stat->member_shop_price ) {?>
							<br><span class="menupurple"><?=number_format($row->shop_price);?> 원</span>&nbsp;							
							<?}?></td>
					</tr>
				</table></td>
			<? if (($new_cnt % $td_width) == 0) { $new_tr++;?>
			</tr>
			<tr>
				<td height="3" colspan="3"></td>
			</tr>
			<tr>
				<td height="1" colspan="3" background="images/dot_line.gif"></td>
			</tr>
			<tr>
				<td height="3" colspan="3"></td>
			</tr>
			<tr>
			<?}}?>
			<? $new_td = $td_width - ($new_cnt%$td_width);	for($i=0; $i<$new_td; $i++) { if( $new_cnt != $td_width * $new_tr) {?>
			<!-- 반복 빈<TD>생성 -->
					 <td align="center" valign="top"></td>
			<? }}?>
			<!-- 상품 등록된 상품이 없는 경우 -->
			<? if(!$new_cnt) {?>
			<tr> 
				<td height="100" align="center" class="menu">등록된 이벤트상품이 없습니다.</td>
			</tr>
			<?}?>
			</tr>
		</table></td></tr></table></td>
	</tr>
</table>