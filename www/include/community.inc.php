<!--? if($db->cnt( "cs_bbs", "where code!='notice'" )) {?-->
<? if($db->cnt( "cs_bbs", "" )) {?>
<table width="181" border="0" cellpadding="0" cellspacing="0" id="community">
	<tr> 
		<td height="25"><img src="../images/bar_community.gif"></td>
	</tr>
	<tr> 
		<td align="center"><table width="181" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="4" colspan="3" bgcolor="#ECECEC">
			</tr>
			<tr>
				<td width="4" bgcolor="#ECECEC"></td>
				<td width="173" align="center"><table width="169" border="0" cellspacing="0" cellpadding="0">
			<tr> 
				<td valign="top">
				<!-- 게시판 출력 -->
				<table width="161" border="0" cellpadding="0" cellspacing="0" class="menu">
				<?
				//$bbs_result = $db->select("cs_bbs", "where code!='notice' order by code asc");
				$bbs_result = $db->select("cs_bbs", "order by code asc");
				while( $bbs_row = @mysql_fetch_object( $bbs_result )) {
				?>
					<tr> 
						<td height="22">&nbsp;<a href="../bbs/bbs_list.php?code=<?=$bbs_row->code;?>"><?=$tools->strHtmlNo($bbs_row->name);?></a></td>
					</tr>
				<? } ?>
					<tr> 
						<td height="22">&nbsp;<a href="../bbs/diary.php">일정관리</a></td>
					</tr>
				</table>
				<!-- 1차 카테고리 출력 --></td>
			</tr>
		</table></td>
				<td width="4" bgcolor="#ECECEC"></td>
			</tr>
			<tr>
				<td height="4" colspan="3" bgcolor="#ECECEC">
			</tr>
		</table></td>
	</tr>
</table>
<?}?>