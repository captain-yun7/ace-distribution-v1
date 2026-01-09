<?
if($db->cnt("cs_poll", "where FROM_UNIXTIME(start_day) <= NOW() and FROM_UNIXTIME(end_day) >= NOW() order by idx asc limit 1")) {
	$poll_stat = $db->object("cs_poll", "where FROM_UNIXTIME(start_day) <= NOW() and FROM_UNIXTIME(end_day) >= NOW() order by idx asc limit 1");
    $answer_content=explode("&&", $poll_stat->answer_content);
?>

<script language="JavaScript">
<!--
function pollSendit() {
	var form=document.poll_form;
	var poll_num=0; var check=false; var i=0;
    for(i=0; i<<?=$poll_stat->answer_cnt;?>; i++) {
		if(form.answer[i].checked==true) {
			poll_num=i;
			check=true;
		}
	}
    if(!check) {
		alert("답변을 선택해 주십시오.");
	} else {
		var winleft = (screen.width - 367) / 2;
		var wintop = (screen.height - 267) / 2;
		window.open("../etc/poll_view.php?idx=<?=$poll_stat->idx;?>&poll_reg=1&poll_num="+poll_num,"", "scrollbars=yes,resizable=no,width=367,height=267, left=" + winleft + ",top=" + wintop); 
	}
}

function pollOpen() {
		var winleft = (screen.width - 367) / 2;
		var wintop = (screen.height - 267) / 2;
		window.open("../etc/poll_view.php?idx=<?=$poll_stat->idx;?>","", "scrollbars=yes,resizable=no,width=367,height=267, left=" + winleft + ",top=" + wintop); 
}
//-->
</script>

<table width="181" border="0" cellpadding="0" cellspacing="0" id="poll">
	<tr> 
		<td height="4"></td>
	</tr>
	<tr> 
		<td height="25"><img src="../images/bar_poll.gif"></td>
	</tr>
	<tr> 
		<td><table width="181" height="140" border="0" cellpadding="0" cellspacing="0" bgcolor="#F5F5F5">
			<tr> 
				<td align="center"><table width="150" border="0" cellspacing="0" cellpadding="1">
				<form method="post" name="poll_form">
					<tr> 
						<td height="3"></td>
					</tr>
					<tr> 
						<td height="25" class="menu"><u><font color="#000000"><?=$db->stripSlash($poll_stat->question);?></font></u></td>
					</tr>
					<tr> 
						<td align="center"><table width="150" border="0" cellpadding="1" cellspacing="0" class="menu">
						<? for($i=0; $i<$poll_stat->answer_cnt; $i++) {?>
							<tr> 
								<td height="20"><input type="radio" name="answer" value="<?=$i+1;?>"><?=$db->stripSlash($answer_content[$i]);?></td>
							</tr>
						<?}?>
						</table></td>
					</tr>
					<tr> 
						<td height="5"></td>
					</tr>
					<tr> 
						<td align="center"><a href="javascript:pollSendit();"><img src="../images/bt_poll_write.gif" border="0" align="absmiddle"></a>&nbsp;<a href="javascript:pollOpen();"><img src="../images/bt_poll_result.gif"  align="absmiddle" border="0"></a></td>
					</tr>
					<tr> 
						<td height="7"></td>
					</tr>
				</form>
				</table></td>
			</tr>
		</table></td>
	</tr>
</table>
<?}?>