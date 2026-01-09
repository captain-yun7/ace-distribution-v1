<table width="187" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="65" align="center"><?
		$logo_stat=$db->object("cs_main_design", "where item=0 and status=1 limit 1");
		if($logo_stat->d_type) {
			$logo_img="<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0' width='$logo_stat->d_width' height='$logo_stat->d_height'><param name='menu' value='false'><param name='movie' value='../data/design../images/$logo_stat->d_file'><param name='quality' value='high'><embed src='../data/design../images/$logo_stat->d_file' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='$logo_stat->d_width' height='$logo_stat->d_height'></embed></object>";
		} else {
			$logo_img="<img src='../data/designimages/$logo_stat->d_file' width='$logo_stat->d_width' height='$logo_stat->d_height' border='0' align='absmiddle'>";
		}
		?>
		<a href="/index.php"><img src="/data/designImages/MAIN_DESIGN_1137117137.gif" border="0"></a>
		</td>
	</tr>
	<tr>
		<td align="center"><table width="171" height="22" cellpadding="0" cellspacing="0" border="0">
			<tr>
				<td><img src="../images/bt_start.gif" border="0" onClick="this.style.behavior='url(#default#homepage)';this.setHomePage('http://<?=$admin_stat->shop_domain;?>');" style="cursor:hand"></td>
				<td><img src="../images/bt_add_favor.gif" border="0" onClick="javascript:window.external.AddFavorite(parent.location.href, document.title);" style="cursor:hand"></a></td>
			</tr>
		</table></td>
	</tr>
</table>