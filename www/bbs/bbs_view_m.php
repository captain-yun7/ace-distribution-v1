<?

$mv_data	= $_GET[bbs_data];
$bbs_data	= $tools->decode( $_GET[bbs_data] );
if( $_GET[idx] )					{ $idx = $_GET[idx]; }											else { $idx = $bbs_data[idx]; }
if( $_GET[code] )					{ $code = $_GET[code]; }									else { $code = $bbs_data[code]; }
if( $_GET[listNo] )				{ $listNo = $_GET[listNo]; }									else { $listNo = $bbs_data[listNo]; }
if( $_GET[startPage] )			{ $startPage = $_GET[startPage]; }					else { $startPage	= $bbs_data[startPage]; }
if( $_POST[search_item] )	{ $search_item = $_POST[search_item]; }			else { $search_item	= $bbs_data[search_item]; }
if( $_POST[search_order] )	{ $search_order = $_POST[search_order]; }		else { $search_order	= $bbs_data[search_order]; }


// 게시판 환경 
$bbs_admin_stat	= $db->object("cs_bbs", "where code='$code'", "bbs_pds, header, footer, bbs_secret");

// 수정 정보 체크 	
if( $_POST[bbs_view_secr] ) {
	$bbs_stat	= $db->object("cs_bbs_data", "where idx='$idx'");
	
	if($bbs_stat->re_level==1){
		
		$query="select * from cs_bbs_data where ref='$bbs_stat->ref' and re_level='0' order by idx asc";
		$rs = mysql_query($query);
		$row = mysql_fetch_array($rs);
		
		if( $bbs_stat->pwd  != $_POST[pwd]) {
			
			if($row[pwd]!= $_POST[pwd]){
				$tools->alertJavaGo("패스워드가 올바르지 않습니다.", "$url?bgu=pass&bbs_view_secr=1&bbs_data=$mv_data");
			}
		}		
		
	} else {
	
		if( $bbs_stat->pwd  != $_POST[pwd]) {
			$tools->alertJavaGo("패스워드가 올바르지 않습니다.", "$url?bgu=pass&bbs_view_secr=1&bbs_data=$mv_data");
		}
	}
}


	$db->update("cs_bbs_data", "read_cnt=read_cnt+1 where idx='$idx'");
	$bbs_stat			= $db->object("cs_bbs_data", "where idx='$idx'");
	$bbs_admin_stat	= $db->object("cs_bbs", "where code='$bbs_stat->code'");
	
	// 게시판 접근 권한 설정
	if( $bbs_admin_stat->bbs_read == 1 ) {
		if( !$_SESSION[USERID] ) { $tools->errMsg('회원 전용입니다.\n\n로그인을 해주세요');}
	}

	$name			= $bbs_stat->name;
	$email			= $bbs_stat->email;
	$reg_date	= $tools->strDateCut($bbs_stat->reg_date, 6);
	$subject		= $bbs_stat->subject;
	$read_cnt				=		$bbs_stat->read_cnt;

	// 내용 출력 방식
	
	if($bbs_admin_stat->editor==1){
		if($bbs_stat->tag==2){
			$content  = nl2br($bbs_stat->content);
		} else {
			$content = $bbs_stat->content;
			$content = str_replace("<P>","",$content);
			$content = str_replace("</P>","<br>",$content);
			$content = str_replace("<p>","",$content);
			$content = str_replace("</p>","<br>",$content);
		}
	} else {
		$content		= $bbs_stat->content;

		if( $bbs_admin_stat->view==0 ) {						// BBS 관리자 환경에서 AUTO 
		
			if( $bbs_stat->tag==0) {
				$content=$tools->strHtmlBr($content);


			} else if( $bbs_stat->tag==1) {
				$content=$tools->strHtml($content);			
			} else if( $bbs_stat->tag==2) {
				$content=$tools->strHtmlNo($content);			
			}
		} else if( $bbs_admin_stat->view==1 ) {				// BBS 관리자 환경에서 HTML	
			if( $bbs_stat->tag==0) {
				$content=$tools->strHtmlBr($content);
			} else if( $bbs_stat->tag==1) {
				$content=$tools->strHtml($content);			
			} else if( $bbs_stat->tag==2) {
				$content=$tools->strHtmlNo($content);
			}
		} else if( $bbs_admin_stat->view==2 ) {				// BBS 관리자 환경에서 TEXT
			if( $bbs_stat->tag==0) {
				$content=$tools->strHtmlNo($content);
			} else if( $bbs_stat->tag==1) {
				$content=$tools->strHtmlNo($content);
			} else if( $bbs_stat->tag==2) {
				$content=$tools->strHtmlNo($content);
			}
		}
		
		$content = $db->stripSlash($content);
		
	}
?>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td class="bor-board01 board-title"><a href="#"><?=$db->stripSlash($subject);?></a><br />
      <?=$name?> | <?=$reg_date;?> | 조회 <?=$read_cnt?></td>
  </tr>
  <tr>
    <td class="bor-board01 board-txt">
	
										<? 
											$bbs_file = $bbs_stat->sbbs_file; 
											$bbs_fileExt = explode( ".", $bbs_file ); if( $bbs_fileExt[1] == "gif" || $bbs_fileExt[1] == "jpg" || $bbs_fileExt[1] == "GIF" || $bbs_fileExt[1] == "JPG" ) { 	$view_img = @getimagesize("../../data/bbsData/".$bbs_stat->bbs_file);  if(  $view_img[0] > 300 ) {$view_img_width	= "width=300"; }	?>
										<img src="/data/bbsData/<?=$bbs_stat->bbs_file;?>" <?=$view_img_width;?>><br><br>
										<? }?>
	
	<?=$content;?></td>
  </tr>


<? if( $bbs_admin_stat->bbs_coment ) { ?>		

<tr>
	<td class="bor-board01 board-txt">

<script language="javascript">
<!--
	function comentSendit() {
		var form=document.bbs_coment_form;
		if(form.name.value=="") {
			alert("이름을 입력해 주십시오.");
			form.name.focus();
		<? if($_SESSION[USERID]==""){ ?>
		} else if(form.pwd.value=="") {
			alert("패스워드를 입력해 주십시오.");
			form.pwd.focus();
		<? } ?>
		} else if(form.coment.value=="") {
			alert("코멘트를 입력해 주십시오.");
			form.coment.focus();
		} else {
			form.submit();			
		}
	}

	function co_dele(text){

		ans = confirm("삭제 하시겠습니까?");
		if(ans==true){
			location.href="../bbs/bbs_coment_ok.php?coment_del=1&coment_idx="+text+"&bbs_data=<?=$mv_data;?>&url=<?=$_SERVER['PHP_SELF']?>";
		}

	}

//-->
</script>

				<br />
                <br />
                <br />
                <!--  리플 내용 출력 시작  -->
<?
$query = "select * from cs_bbs_coment where link='$bbs_stat->idx'";
$query.=" order by reg_date asc";
$rs = mysql_query($query);
$count = mysql_num_rows($rs);
$rows = 100000;

	if (empty($start)) $start=0;
	$end = $start+$rows;
	$end = min($count,$end);
	
	$total = ceil(($count)/$rows);
	$current = ceil(($start+1)/$rows);

?>

		<?   
		
		
			$i = 1;
			if ($count > 1) mysql_data_seek($rs,$start);
			
			$n = $count - ($rows*($current-1));
			$odate = date("Y-m-d");
			
			for ($for2count=$start;$for2count<$end;$for2count++)
													
			{
				
			$co_row = @mysql_fetch_object($rs);
		?>

			<?
				//$co_result = $db->select( "cs_bbs_coment", "where link=$bbs_stat->idx order by reg_date asc");
				//while( $co_row = @mysql_fetch_object($co_result)) {
					$co_idx			= $co_row->idx;
					$co_name		= htmlspecialchars($co_row->name);
					$co_coment		= htmlspecialchars($co_row->coment);
					$co_coment		= str_replace("\n","<br>", $co_coment);
					$co_coment		= stripslashes($co_coment);
					$co_reg_date	= $tools->strDateCut($co_row->reg_date);

					
			?>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" class="board-view-reline">
                  <tr>
                    <td class="board-reple-font01"><?=$co_name;?><span class="board-reple-font02"><?=$co_reg_date;?></span></td>
                    <td>
										<? if($_SESSION[USERID]){ ?>
											<? if($_SESSION[USERID]==$co_row->userid){ ?>
											<a href="#none" onclick="co_dele('<?=$co_idx?>');" class="bt-board-reple bt-gray">
											<? } else { ?>
											<a href="<?=$PHP_SELF?>?bgu=pass&coment_del=1&coment_idx=<?=$co_idx;?>&bbs_data=<?=$mv_data;?>" class="bt-board-reple bt-gray">
											<? } ?>
										<? } else { ?>
										<a href="<?=$PHP_SELF?>?bgu=pass&coment_del=1&coment_idx=<?=$co_idx;?>&bbs_data=<?=$mv_data;?>" class="bt-board-reple bt-gray">
										<? } ?>
										삭제</a>
						  
						 
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" class="board-reple-font03"><?=$co_coment;?></td>
                    </tr>
              </table>

		<? 
		
			$i = $i + 1;
			$n = $n - 1;
			} 
		
		?>

              <!--  리플 내용 출력 끝  -->

<form name="bbs_coment_form" action="../bbs/bbs_coment_ok.php?bbs_data=<?=$mv_data;?>" method="post">
			<input type="hidden" name="coment_reg" value="1">
			<input type="hidden" name="url" value="<?=$_SERVER['PHP_SELF']?>">

              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="board-view-rewrite">
					<? if($_SESSION[USERID]){ ?>
					<table width="100%" border="0" cellspacing="0" cellpadding="0" style="height:28px;">
                      <tr>
                        <td width="50" align="left">이름 :</td>
                        <td width="220" align="left"><?=$_SESSION[USERID]?><input type="hidden" name="name" value="<?=$_SESSION[USERID]?>"></td>
                        <td width="62" align="left"></td>
                        <td align="left"></td>
                      </tr>
                    </table>
					<? } else { ?>
					<table width="100%" border="0" cellspacing="0" cellpadding="0" style="height:28px;">
                      <tr>
                        <td width="50" align="left">이름 :</td>
                        <td width="220" align="left"><input name="name" type="text" class="board-formbox01" id="textfield2" style="width:150px;" /></td>
                        <td width="62" align="left">비밀번호 :</td>
                        <td align="left"><input name="pwd" type="password" class="board-formbox01" id="textfield3" style="width:150px;" /></td>
                      </tr>
                    </table>
					<? } ?>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="left"><textarea name="coment" id="textarea" class="board-txtbox01" style="width:150px;height:80px;"></textarea></td>
                          <td>
                          
                                <a href="#none" onclick="javascript:comentSendit();" class="bt-board-reple-ok bt-black">확인</a>
                          </td>
                        </tr>
                      </table></td>
                  </tr>
                  </table>

</form>
		</td>
	</tr>
<? } ?>


 
</table>
<br />

<script language="javascript">
<!--
function dele(){

	ans = confirm("삭제 하시겠습니까?");
	if (ans==true)
	{
		form2.action = "../bbs/bbs_view_del.php?bbs_data=<?=$mv_data;?>";
		form2.submit();
	}

}

function modi(){

	form2.action = "<?=$PHP_SELF?>?bbs_data=<?=$mv_data;?>&bgu=edit";
	form2.submit();

}
-->
</script>
<form method="post" action="" name="form2">
<input type="hidden" name="bbs_view_del" value="1">
<input type="hidden" name="bbs_view_edit" value="1">
<input type="hidden" name="url" value="<?=$PHP_SELF?>">
</form>

<table width="100%" border="0" cellspacing="0" cellpadding="0" style="display:none;">
  <tr>
    <td class="font-sub-menu">
	<? if($bbs_admin_stat->bbs_write!=9) {?>

                        <? if($_SESSION[USERID]){ ?>
							<? if($_SESSION[USERID]==$bbs_stat->userid){ ?>
							<a href="#none" onclick="modi();"><img src="/img/board/bt_modify.gif" /></a>
							<a href="#none" onclick="dele();"><img src="/img/board/bt_del.gif" /></a>
							<? } ?>
						<? } else { ?>
							<a href="<?=$PHP_SELF?>?bbs_view_edit=1&bbs_data=<?=$mv_data;?>&bgu=pass"><img src="/img/board/bt_modify.gif" /></a>
                            <a href="<?=$PHP_SELF?>?bbs_view_del=1&bbs_data=<?=$mv_data;?>&bgu=pass"><img src="/img/board/bt_del.gif" /></a>
						<? } ?>

	<? } ?>
	
	<a href="<?=$PHP_SELF?>?bbs_data=<?=$mv_data;?>&bgu=list"><img src="/img/board/bt_list.gif" /></a></td>
  </tr>
</table>

					<div class="btnSec tr">
						<span class="btn"><a href="<?=$PHP_SELF?>?bbs_data=<?=$mv_data;?>&bgu=list">목록</a></span>
					</div>			
