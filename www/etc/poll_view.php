<? include('../common.php'); ?>
<?
$_GET=&$HTTP_GET_VARS;
$_POST=&$HTTP_POST_VARS;

if($_GET[idx] && $_GET[poll_reg]){
	$_GET[poll_num]++;
	if($HTTP_COOKIE_VARS[POLL_COOKIE]=="NO") { $tools->msgClose('이미 투표를 하셨습니다.');}
	$db->update("cs_poll", "answer$_GET[poll_num] = answer$_GET[poll_num]+1, answer_total = answer_total+1 where idx=$_GET[idx]");
	$poll_stat=$db->object("cs_poll", "where idx=$_GET[idx]");
    $answer_content=explode("&&", $poll_stat->answer_content);
	$poll_live = ($poll_stat->end_day - $poll_stat->start_day)*86400;
	setcookie("POLL_COOKIE","NO", time()+$poll_live,'/');
} else {
	$poll_stat=$db->object("cs_poll", "where idx=$_GET[idx]");
    $answer_content=explode("&&", $poll_stat->answer_content);
}
?>
<html>
<head>
<title>온라인투표</title>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
<link href="../css/style.css" rel="stylesheet" type="text/css">
</head>

<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<table width="350" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="350" height="45"><img src="../images/poll_top.gif" width="350" height="45"></td>
  </tr>
  <tr>
    <td align="center"><br>
      <table width="330" border="0" cellpadding="3" cellspacing="0" class="menu">
        <tr> 
          <td colspan="2"><b><?=$poll_stat->question;?></b></td>
        </tr>
		<?
		for($i=0; $i<$poll_stat->answer_cnt; $i++) {
			
			$cnt = $i+1;
			$answer_cnt='answer'.$cnt;
			if( $poll_stat->answer_total) {
				$percent = intval( $poll_stat->$answer_cnt / $poll_stat->answer_total * 10000 ) / 100;
			} else {
				$percent = 0;
			}
			if($percent) {
				$table_width=intval( 2 * $percent )*1.3;
			} else {
				$table_width=1;
			}	
		?>
		<tr> 
          <td><?=$cnt;?>. <?=$answer_content[$i];?></td>
          <td> 
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td><table width="<?=$table_width;?>" height="15" border="0" cellpadding="0" cellspacing="0" background="../images/poll_graph.gif"><tr><td height="15"></td></tr></table></td>
                <td class="cp">&nbsp;<?=round($percent);?>%(<?=$poll_stat->$answer_cnt;?>명)</td>
              </tr>
            </table></td>
        </tr>
		<?}?>        
      </table>
      <br>
      <table width="330" border="0" cellpadding="0" cellspacing="0" class="menu">
        <tr>
          <td> <img src="../images/arrow_orange.gif" width="7" height="7" align="absmiddle">&nbsp;참가 인원 : <?=$poll_stat->answer_total;?> 명<br>
            <img src="../images/arrow_orange.gif" width="7" height="7" align="absmiddle">&nbsp;투표 기간 : <?=date("Y년 m월 d일", $poll_stat->start_day);?> ~ <?=date("Y년 m월 d일", $poll_stat->end_day);?></td>
        </tr>
      </table> 
      <br>
    </td>
  </tr>
  <tr>
    <td height="25" align="right" bgcolor="E7E7E7"><a href="javascript:window.close();"><img src="../images/bt_pop_close.gif" border="0" align="absmiddle"></a>&nbsp;</td>
  </tr>
</table>
</body>
</html>
