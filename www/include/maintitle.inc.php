	<table width="668" border="0" cellpadding="0" cellspacing="0" id="titleImage">
		<tr>
		<?
		$main_stat=$db->object("cs_main_design", "where item=1 and status=1 limit 1");
		if($main_stat->d_type) {
			$main_img="<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0' width='$main_stat->d_width' height='$main_stat->d_height'><param name='movie' value='../data/designImages/$main_stat->d_file'><param name='menu' value='false'><param name='quality' value='high'><embed src='../data/designImages/$main_stat->d_file' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='$main_stat->d_width' height='$main_stat->d_height'></embed></object>";
		} else {
			$main_img="<img src='../data/designImages/$main_stat->d_file' width='$main_stat->d_width' height='$main_stat->d_height' border='0' align='absmiddle'>";
		}
		?>
			<td width="453"><!--img src="/data/designImages/MAIN_DESIGN_1131780332.jpg" width="433" height="200"--><?=$main_img;?></td>
		</tr>
	</table>