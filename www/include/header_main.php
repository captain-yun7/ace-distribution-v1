<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onLoad="fSetLinksOnFocus()">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
	<tr> 
		<td height="4" bgcolor="0099FF"></td>
	</tr>
	<tr> 
		<td align="<? if($design_stat->status==1) { echo('left');} else if( $design_stat->status==2) { echo('center');} else if( $design_stat->status==3) { echo('right');}?>" valign="top"><table width="956" border="0" cellspacing="0" cellpadding="0">
			<tr> 
				<td width="1" bgcolor="DADADA"></td>
				<td width="187" valign="top"><table width="187" cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td align="right"><? include('../include/logo.inc.php');?></td>
					</tr>
					<tr>
						<td align="right"><!-- 카테고리 include --><? include('../include/category.inc.php');?></td>
					</tr>
				    <tr>
						<td height="20"></td>
					</tr>
					<tr>
						<td align="right"><!-- 커뮤니티 include --><? include('../include/community.inc.php');?></td>
					</tr>
					<tr>
						<td height="20"></td>
					</tr>
					<tr>
						<td align="right"><!-- 투표 include --><? include('../include/poll.inc.php');?></td>
					</tr>
					<tr>
						<td height="20"></td>
					</tr>
					<tr>
						<td align="right"><!-- 좌측배너 include --><? include('../include/banner_left.inc.php');?></td>
					</tr>
				</table></td>
				<td width="12" valign="top"></td>
				<td width="668" align="center" valign="top">
				<? include('../include/menu.inc.php');?>