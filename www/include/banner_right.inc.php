<? if($db->cnt( "cs_banner", "where status=4" )) {?>
<table width="150" border="0" cellpadding="0" cellspacing="0" id="bannerRight">
	<tr> 
		<td><table width="150" border="0" cellpadding="0" cellspacing="0" id="bannerRight">
			<?
			$result	= $db->select( "cs_banner", "where status=4 order by idx asc" );
			while( $row = mysql_fetch_object($result)) {
			?>
			<? if($row->display==1) {?>
			<tr> 
				<td><? if($row->link_url) {?><a href="http://<?=$row->link_url;?>" target="<? if($row->target) { echo('_self'); } else { echo('_blank');}?>"><img src="../data/designImages/<?=$row->banner_images;?>" border="0"></a><?} else {?><img src="../data/designImages/<?=$row->banner_images;?>" border="0"><?}?></td>
			</tr>
			<? } else if($row->display==0) {?>
			<tr> 
				<td><?=$tools->strHtml($row->content);?></td>
			</tr>
			<?}?>
			<?}?>
		</table></td>
	</tr>
</table>
<?}?>