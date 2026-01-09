<table width="100%" border="0" cellpadding="0" cellspacing="0" id="news">
				<tr>
					<td height="25"><a href="../bbs/bbs_list.php?code=notice"><img src="../images/bar_news.gif" border="0"></a></td>
				</tr>
				<tr>
				<td align="center" valign="top" style="padding-left:10px; padding-right:10px"><table width="100%" border="0" cellpadding="0" cellspacing="0" class="menu">
						<tr>
							<td height="8"></td>
						</tr>
<?
	$code="notice";
	$bbs_admin_stat = $db->object("cs_bbs", "where code='$code'");
	$notice_result		= $db->select("cs_bbs_data", "where code='$code'  order by ref desc, re_step ASC LIMIT 5" );
	while( $notice_row = @mysql_fetch_object($notice_result)) {
			$subject				=		$tools->strHtmlNo($tools->strCut_utf($notice_row->subject, 45));
			$new_check			=		$bbs_admin_stat->new_check;
			
			if( $new_check ) {	$new_img			=		$page->bbsNewImg( $notice_row->reg_date, $bbs_admin_stat->new_mark, "&nbsp;&nbsp;<img src='./../images/new3.gif'>" ); }
			$bbs_data = $tools->encode("idx=".$notice_row->idx."&startPage=".$startPage."&listNo=".$listNo."&table=".$table."&code=".$code."&search_item=".$search_item."&search_order=".$search_order);
?>
						<tr>
							<td height="23"><img src="../images/arrow_notice.gif" align="absmiddle">&nbsp;<a href="../bbs/bbs_view.php?bbs_data=<?=$bbs_data;?>"><?=$db->stripSlash($subject);?></a><?=$new_img?></td>
							<td width="80" align="right">[<? echo substr($notice_row->reg_date,0,-9) ?>]</td>
						</tr>
<?}?>
                        <tr>
							<td height="20" colspan="2"></td>
						</tr>
					</table></td>
				</tr>
		   </table>