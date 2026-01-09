<? $mod=menu05 ?>
<?
include("../header.php");
$_GET=&$HTTP_GET_VARS;
?>

<table width="851" border="0" cellpadding="0" cellspacing="0">
	<tr> 
		
		<td align="center" bgcolor="#FFFFFF" class="menu"><br> <img src="../images/title_bbs.jpg" width="800" height="70"> 
			<table width="800" border="0" cellspacing="0" cellpadding="0">
				<tr> 
					<td width="205">&nbsp;</td>
					<td width="595">
						<table width="422" border="0" cellspacing="0" cellpadding="0">
							<tr> 
								<td height="30">&nbsp;</td>
							</tr>
							<tr> 
								<td><img src="../images/passwd_top.gif"></td>
							</tr>
							<tr> 
								<td height="130" align="center" bgcolor="EFEFEF">
									<table width="220" border="0" cellspacing="0" cellpadding="3">
										<? if( $_GET[coment_del] ) {	?>
										<form name="bbs_passwd_form" action="bbs_coment_ok.php?bbs_data=<?=$_GET[bbs_data];?>" method="post">
										<input type="hidden" name="coment_del" value="<?=$_GET[coment_del];?>">
										<input type="hidden" name="coment_idx" value="<?=$_GET[coment_idx];?>">
										<? } else if( $_GET[bbs_view_del] ) {	?>
										<form name="bbs_passwd_form" action="bbs_view_del.php?bbs_data=<?=$_GET[bbs_data];?>" method="post">
										<input type="hidden" name="bbs_view_del" value="<?=$_GET[bbs_view_del];?>">
										<? } else if( $_GET[bbs_view_edit] ) {	?>
										<form name="bbs_passwd_form" action="bbs_edit.php?bbs_data=<?=$_GET[bbs_data];?>" method="post">
										<input type="hidden" name="bbs_view_edit" value="<?=$_GET[bbs_view_edit];?>">
										<? }?>
										<tr> 
											<td align="center" height="70" class="menu">й? <input type="password" name="pwd" class="input" value="<?=$_SESSION[ADMIN_PASSWD];?>"></td>
										</tr>
										<tr> 
											<td align="center"><input type="image" src="../images/passwd_del.gif" border=0  value="submit">&nbsp;<a href="javascript: history.back()"><img src="../images/passwd_cancel.gif" border="0"></a></td>
										</tr>
										</form>
									</table>
								</td>
							</tr>
						</table><br><br>
					</td>
				</tr>
			</table>
		</td>
		
	</tr>
</table>
<? include('../footer.php');?>