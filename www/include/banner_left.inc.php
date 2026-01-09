<? if($db->cnt( "cs_banner", "where status=3" )) {?>
<table width="187" border="0" cellpadding="0" cellspacing="0" id="bannerRight">
	<tr>
		<td height="5"></td>
	</tr>
	<tr> 
		<td><table width="100%" border="0" cellpadding="0" cellspacing="0">
			<tr> 
				<td align="center"><table width="100%" border="0" cellpadding="0" cellspacing="0" id="bannerRight">
				<?
				$result	= $db->select("cs_banner", "where status=3 order by idx asc" );
				while( $row = mysql_fetch_object($result)) {
				?>
					<? if($row->display==1) {?>
						<tr> 
							<td align="center"><? if($row->link_url) {?><a href="http://<?=$row->link_url;?>" target="<? if($row->target) { echo('_self'); } else { echo('_blank');}?>"><img src="../data/designImages/<?=$row->banner_images;?>" border="0"></a><?} else {?><img src="../data/designImages/<?=$row->banner_images;?>" border="0"><?}?></td>
						</tr>
					<? } else if($row->display==0) {?>
						<tr> 
							<td align="center"><?=$tools->strHtml($row->content);?></td>
						</tr>
					<?}?>
				<?}?>
				</table></td>
			</tr>
		</table></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
</table>
<?}?>