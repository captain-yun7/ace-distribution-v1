<table width="187" border="0" cellpadding="0" cellspacing="0" id="category">
	<tr>
		<td valign="top" align="center"><table width="166" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td valign="top">
				<!-- 1차 카테고리 출력 -->
				<table width="166" border="0" cellpadding="0" cellspacing="0" class="menu">
					<tr>
						<td height="5"></td>
					</tr>
				<?
					$part_empty=0;
					$part1_result = $db->select("cs_part", "where part_index=1 and part_display_check=1 order by part_ranking asc");
					while( $part1_row = @mysql_fetch_object( $part1_result )) {
						$part_empty++;
						//이미지 초기화
						$P1_images = ""; $P2_images = "";
						// 카테고리 이미지 출력
						if( $part1_row->list_display_check == 1 ) {	$P1_images = "../data/designImages/".$part1_row->list_display_images1; }
						// 카테고리 목록이미지 출력(마우스 롤오버)
						if( $part1_row->list_display_check == 2 ) {	$P1_images = "../data/designImages/".$part1_row->list_display_images1; $P2_images = "../data/designImages/".$part1_row->list_display_images2; }
				?>
					<!-- TEXT 출력방식 -->
					<? if($part1_row->list_display_check==0) { ?>
					<tr>
						<td height="23">&nbsp;&nbsp;<a href="../product/product_list.php?part_idx=<?=$part1_row->idx;?>"><?=$tools->strHtmlNo($part1_row->part_name);?></a></td>
					</tr>
					<tr>
						<td height="1" bgcolor="#ECECEC"></td>
					</tr>
					<!-- 단일이미지출력방식 -->
					<?} else if($part1_row->list_display_check==1) { ?>
					<tr>
						<td height="23"><a href="../product/product_list.php?part_idx=<?=$part1_row->idx;?>"><img src="<?=$P1_images;?>" border="0" align="absmiddle" ></a></td>
					</tr>
					<!-- 두개이미지출력방식 (마우스롤오버) -->
					<?} else if($part1_row->list_display_check==2) { ?>
					<tr>
						<td height="23"><a href="../product/product_list.php?part_idx=<?=$part1_row->idx;?>" onMouseOver='rollover<?=$part1_row->idx?>.src="<?=$P2_images;?>"' onMouseOut='rollover<?=$part1_row->idx?>.src="<?=$P1_images;?>"'><img src="<?=$P1_images;?>" name="rollover<?=$part1_row->idx?>" border="0" align="absmiddle"></a></td>
					</tr>
					<?}?>
					<?}?>
					<? if(!$part_empty) {?>
					<tr>
						<td height="100" align="center">등록된 카테고리가 없습니다.</td>
					</tr>
					<?}?>
					<tr height="1">
						<td></td>
					</tr>
				</table>
				<!-- 1차 카테고리 출력 -->
				</td>
			</tr>
		</table></td>
	</tr>
</table>