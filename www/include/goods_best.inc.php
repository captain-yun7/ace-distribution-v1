<table width="100%" border="0" cellpadding="0" cellspacing="0" id="recomment">
	
	<tr> 
		<td><table width="100%" border="0" cellspacing="0" cellpadding="0" bordercolor='#D9D9D9' class="menu" style='border-collapse: collapse'>
			<tr>
				<td>
				 <table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr> 
						<td><img src="../images/bar_best.gif"></td>
					</tr>
					<tr>
	<?
	$table				= "cs_goods";
	$listScale			=	1; 		// 출력 상품수
	$pageScale		=	1;		// 페이지 수
	if( !$startPage ) { $startPage = 0; }		// 스타트 페이지
	$totalPage = floor($startPage / ($listScale * $pageScale));		// 토탈페이지
	$totalList	= $db->cnt( $table, "where main_position=3 and display=1" );
	$result		= $db->select( $table, "where main_position=3 and display=1 order by idx desc LIMIT $startPage, $listScale" );
	if( $startPage ) { $listNo = $totalList - $startPage; } else { $listNo = $totalList; }		// 페이지넘버
	$new_cnt = 0; $new_tr = 0; $td_width = 1; // 가로리스트 수
	while( $row = mysql_fetch_object($result)) {
		$new_cnt++;
		//new IMG
		$new_img=""; $hit_img="";
		if($admin_stat->new_mark && $row->new_mark) { $new_img = $page->newImg( $row->register, $admin_stat->new_mark, $row->new_mark );}
		// hit IMG
		if($admin_stat->hit_mark && $row->hit_mark) { $hit_img = $page->hitImg( $admin_stat->hit_mark, $row->click, $row->hit_mark );}
		$goods_data = $tools->encode("idx=".$row->idx."&startPage=".$startPage."&listNo=".$listNo."&table=".$table."&part_idx=".$part_idx."&search_item=".$search_item);
?>
				<td align="center" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0" style='table-layout:fixed;'>
					<tr> 
						<td height="120" width="50%"><a href="../product/product_view.php?part_idx=<?=$row->part_idx;?>&goods_data=<?=$goods_data;?>"><img src="../data/goodsImages/<?=$row->images1;?>" width="110" height="110" border="1" style="border-color:#efefef"></a></td>
						<td width="50%" style="padding-left:10"><span class="menu"><?=$hit_img;?>&nbsp;&nbsp;<a href="../product/product_view.php?part_idx=<?=$row->part_idx;?>&goods_data=<?=$goods_data;?>"><?=$db->stripSlash($tools->strCut($row->name,30));?>&nbsp;&nbsp;<?=$new_img;?><br><? if( !$_SESSION[USERID] && $admin_stat->nomember_old_price ) {?><span class="oldprice"><?=number_format($row->old_price);?> 원</span>&nbsp;<?} else if( $_SESSION[USERID] && $admin_stat->member_old_price ) {?><span class="oldprice"><?=number_format($row->old_price);?> 원</span>&nbsp;<?}?><? if( !$_SESSION[USERID] && $admin_stat->nomember_shop_price ) {?><span class="menupurple"><?=number_format($row->shop_price);?> 원</span><?} else if( $_SESSION[USERID] && $admin_stat->member_shop_price ) {?><span class="menupurple"><?=number_format($row->shop_price);?> 원</span><?}?></a></td>
					</tr>
				</table></td>
			<? if (($new_cnt % $td_width) == 0) { $new_tr++;?>
			</tr>
			<tr>
			<?}}?>
			<? $new_td = $td_width - ($new_cnt%$td_width);	for($i=0; $i<$new_td; $i++) { if( $new_cnt != $td_width * $new_tr) {?>
			<!-- 반복 빈<TD>생성 -->
					 <td align="center" valign="top">&nbsp;</td>
			<? }}?>
			<!-- 상품 등록된 상품이 없는 경우 -->
			<? if(!$new_cnt) {?>
			<tr> 
					<td height="100" align="center" class="menu">등록된 베스트 상품이 없습니다.</td>
			</tr>
			<?}?>
			</tr>
		</table></td></tr></table></td>
	</tr>
</table>