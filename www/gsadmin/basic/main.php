<? 
include('../header.php');
include($ROOT_DIR."/lib/page_class.php");

$today_cnt = $db->row("cs_connect", "where DATE_FORMAT(register,'%Y-%m-%d')=CURDATE()", "count(ip)");
$total_cnt = $db->row("cs_connect", "", "count(ip)");
?>

<table width="851" border="0" align="left" cellpadding="0" cellspacing="0">
	<tr> 
		
		<td height="100" bgcolor="#FFFFFF" class="menu">
			<table width="800" border="0" cellspacing="0" cellpadding="0" class="menu" align="center">
			<tr>
				<td align="right"><span class="enbold">방문자 접속수:  today </span><span class="enboldno"><?=$today_cnt[0];?></span> <span class="enbold">/ total</span> <span class="enboldno2"><?=$total_cnt[0];?></span><span class="enbold"></span>&nbsp;</td>
				<td width="54"><a href="../stat/crm5.php"><img src="../images/bt_more.gif" width="54" height="15" align="absmiddle" border="0"></a></td>
			</tr>
			</table>
		</td>
		
	</tr>
	<tr>
		<td height="200" align="center" bgcolor="#FFFFFF" class="menu">
		관리자 화면입니다.			
		</td>
    </tr>
</table>
<? include('../footer.php'); ?>