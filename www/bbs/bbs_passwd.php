<?

// 게시판 환경 

$mv_data	= $_GET[bbs_data];
$bbs_data	= $tools->decode( $_GET[bbs_data] );
if( $_GET[idx] )					{ $idx = $_GET[idx]; }											else { $idx = $bbs_data[idx]; }
if( $_GET[code] )					{ $code = $_GET[code]; }									else { $code = $bbs_data[code]; }
if( $_GET[listNo] )				{ $listNo = $_GET[listNo]; }									else { $listNo = $bbs_data[listNo]; }
if( $_GET[startPage] )			{ $startPage = $_GET[startPage]; }					else { $startPage	= $bbs_data[startPage]; }
if( $_POST[search_item] )	{ $search_item = $_POST[search_item]; }			else { $search_item	= $bbs_data[search_item]; }
if( $_POST[search_order] )	{ $search_order = $_POST[search_order]; }		else { $search_order	= $bbs_data[search_order]; }

if(!$code) { $tools->errMsg("잘못된 접근입니다");}
$bbs_admin_stat		=	$db->object("cs_bbs", "where code='$code'");

$bbs_stat			= $db->object("cs_bbs_data", "where idx='$idx'");
$bbs_admin_stat	= $db->object("cs_bbs", "where code='$bbs_stat->code'");

// 게시판 접근 권한 설정
if( $bbs_admin_stat->bbs_access == 1 ) {
	if( !$_SESSION[LEVEL] ) { $tools->errMsg('회원 전용입니다.\n\n로그인을 해주세요');}
}
?>

					<div>

						<? if( $_GET[coment_del] ) {	?>
						<form name="bbs_passwd_form" action="/bbs/bbs_coment_ok.php?bbs_data=<?=$_GET[bbs_data];?>" method="post">
						<input type="hidden" name="coment_del" value="<?=$_GET[coment_del];?>">
						<input type="hidden" name="coment_idx" value="<?=$_GET[coment_idx];?>">
						<input type="hidden" name="url" value="<?=$PHP_SELF?>">
						
						<? } else if( $_GET[bbs_view_del] ) {	?>
						<form name="bbs_passwd_form" action="/bbs/bbs_view_del.php?bbs_data=<?=$_GET[bbs_data];?>" method="post">
						<input type="hidden" name="bbs_view_del" value="<?=$_GET[bbs_view_del];?>">
						<input type="hidden" name="url" value="<?=$PHP_SELF?>">
						<? } else if( $_GET[bbs_view_edit] ) {	?>
						<form name="bbs_passwd_form" action="<?=$PHP_SELF?>?bbs_data=<?=$_GET[bbs_data];?>&bgu=edit" method="post">
						<input type="hidden" name="bbs_view_edit" value="<?=$_GET[bbs_view_edit];?>">
						<? } else if( $_GET[bbs_view_secr] ) {	?>
						<form name="bbs_passwd_form" action="<?=$PHP_SELF?>?bbs_data=<?=$_GET[bbs_data];?>&bgu=view" method="post">
						<input type="hidden" name="bbs_view_secr" value="<?=$_GET[bbs_view_secr];?>">
						<? }?>

							<fieldset>
								<legend>글쓰기</legend>
								<table class="board_write">
								<colgroup>
								<col width="125px" />
								<col width="" />
								</colgroup>
								<tbody>
								<tr>
									<th scope="row">비밀번호</th>
									<td>
										<input type="password" name="pwd" class="ib50" />
									</td>
								</tr>
								</tbody>
								</table>
							</fieldset>
							<div class="btnSec tr">
								<span class="button large blue"><input type="submit" value="확인"></span>
							</div>
						</form>
					</div>

