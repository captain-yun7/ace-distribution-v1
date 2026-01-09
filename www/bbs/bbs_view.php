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
	$reg_date = substr($bbs_stat->reg_date,0,10);
	$subject		= $bbs_stat->subject;
	$read_cnt				=		$bbs_stat->read_cnt;

	// 내용 출력 방식

	if($bbs_admin_stat->editor==1){
		$content = $bbs_stat->content;
		/*
		$content = str_replace("<P>","",$content);
		$content = str_replace("</P>","<br/>",$content);
		$content = str_replace("<p>","",$content);
		$content = str_replace("</p>","<br/>",$content);
		*/
		$content = $tools->strHtml($content);
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

                	<!-- View -->
					<div class="board_view">						
						<!-- 제목 -->
						<div class="tit_sec">
							<span class="tit"><?=$db->stripSlash($subject);?></span>
							<div class="date">
								<img src="/images/board/icon_writer.gif" alt=""> <strong>작성자</strong> : <?=$name;?>
								<span><?=$reg_date;?></span> <span>HIT <?=$read_cnt?></span>
							</div>
						</div>
						<!-- 제목 //-->						
						<!-- 내용 -->
						<div class="con">
							<!-- 첨부파일이 있을경우 노출 -->

								<? if($code=="guin"){ ?>
								<table class="board_write" style="margin-top:-20px;">
								<colgroup>
								<col width="125px" />
								<col width="" />
								</colgroup>
								<tbody>
								<tr>
									<th scope="row">업체</th>
									<td class="myid"><?=$bbs_stat->company?></td>
								</tr>
								<tr>
									<th scope="row">연락처</th>
									<td>
										<?=$bbs_stat->tel?>
									</td>
								</tr>
								<tr>
									<th scope="row">경력</th>
									<td>
										<?=$bbs_stat->kyung?>
									</td>
								</tr>
								<tr>
									<th scope="row">급여</th>
									<td>
										<?=$bbs_stat->price?>
									</td>
								</tr>
								<tr>
									<th scope="row">근무시간</th>
									<td>
										<?=$bbs_stat->time?>
									</td>
								</tr>
								<tr>
									<th scope="row">휴무</th>
									<td>
										<?=$bbs_stat->holiday?>
									</td>
								</tr>
								<tr>
									<th scope="row">기타사항</th>
									<td>
										<?=$bbs_stat->etc?>
									</td>
								</tr>
								</tbody>
								</table>
								<br>
								<? } ?>

								<? if($code=="gujik"){ ?>
								<table class="board_write" style="margin-top:-20px;">
								<colgroup>
								<col width="125px" />
								<col width="" />
								</colgroup>
								<tbody>
								<tr>
									<th scope="row">업체</th>
									<td class="myid"><?=$bbs_stat->company?></td>
								</tr>
								<tr>
									<th scope="row">연락처</th>
									<td>
										<?=$bbs_stat->tel?>
									</td>
								</tr>
								<tr>
									<th scope="row">경력사항</th>
									<td>
										<?=$bbs_stat->kyung?>
									</td>
								</tr>
								<tr>
									<th scope="row">기타사항</th>
									<td>
										<?=$bbs_stat->etc?>
									</td>
								</tr>
								</tbody>
								</table>
								<br>
								<? } ?>
							
							
							<? if( $bbs_admin_stat->bbs_pds ){ ?>
							<?
							if( $bbs_admin_stat->bbs_pds && $bbs_stat->bbs_file != "none" )  {
								$bbs_file = $bbs_stat->sbbs_file;
							?>

							<div class="attached">
								<img src="/images/board/icon_attached.gif" alt="첨부파일"><a href="/bbs/bbs_download.php?bbs_data=<?=$mv_data?>&download=1"><?=$bbs_file;?></a>
							</div>

							<? }  } ?>
							<!-- 첨부파일이 있을경우 노출 //-->
							<p class="mt10" id="DivContents"><?=$content;?></p>
<script>
function imgResize()
{
 // DivContents 영역에서 이미지가 maxsize 보다 크면 자동 리사이즈 시켜줌
maxsize = 750; // 가로사이즈 ( 다른값으로 지정하면됨)
var content = document.getElementById("DivContents");
 var img = content.getElementsByTagName("img");
 for(i=0; i<img.length; i++ )
{



if ( eval('img['+i+'].width > maxsize') )
{
var heightSize = ( eval('img['+i+'].height')*maxsize )/eval('img['+i+'].width') ;
 eval('img['+i+'].width = maxsize') ;
 eval('img['+i+'].height = heightSize') ;
}
 }
}
window.onload = imgResize;
</script>
						</div>

<script language="javascript">
<!--
function dele(){

	ans = confirm("삭제 하시겠습니까?");
	if (ans==true)
	{
		form2.action = "/bbs/bbs_view_del.php?bbs_data=<?=$mv_data;?>";
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

						<!-- 내용// -->						
						<div class="btnSec tr">

							<? if($bbs_admin_stat->bbs_write!=9) {?>
								<? if($_SESSION[USERID]){ ?>
									<? if($_SESSION[USERID]==$bbs_stat->userid){ ?>
									<span class="button large blue"><a href="#none" onclick="modi();">수정</a></span>
									<span class="button large blue"><a href="#none" onclick="dele();">삭제</a></span>
									<? } ?>
								<? } else { ?>
								<span class="button large blue"><a href="<?=$PHP_SELF?>?bbs_view_edit=1&bbs_data=<?=$mv_data;?>&bgu=pass">수정</a></span>
								<span class="button large blue"><a href="<?=$PHP_SELF?>?bbs_view_del=1&bbs_data=<?=$mv_data;?>&bgu=pass">삭제</a></span>
								<? } ?>
								<span class="button large blue"><a href="<?=$PHP_SELF?>?reWrite=1&bbs_data=<?=$mv_data;?>&bgu=write">답글</a></span>
							<? } ?>

							<span class="button large blue"><a href="<?=$PHP_SELF?>?bbs_data=<?=$mv_data;?>&bgu=list">목록</a></span>
						</div>		
						
			<?

			$ref = $bbs_stat->ref;
			$re_level = $bbs_stat->re_level;
			$notice = $bbs_stat->notice;

			//이전글

				if($notice>0){

					$query = "select idx,subject,secret from cs_bbs_data where code='$code' and idx<'$idx' and notice>0 order by idx desc limit 1";

				} else {

					$query = "select idx from cs_bbs_data where code='$code' and ref='$ref' and re_level>'$re_level' and notice<1";
					$rs = mysql_query($query);
					$count = mysql_num_rows($rs);

					if($count==0){
						$query = "select idx,subject,secret from cs_bbs_data where code='$code' and ref<$ref and idx!='$idx' and notice<1 order by ref desc, re_step DESC limit 1";
					} else {
						$query = "select idx,subject,secret from cs_bbs_data where code='$code' and ref<=$ref and idx!='$idx' and re_level>'$re_level' and notice<1 order by ref desc, re_step DESC limit 1";
					}
				}
					$rs_m = mysql_query($query);
					$row_m = mysql_fetch_array($rs_m);

				$mv_data1	= $tools->encode("idx=".$row_m[idx]."&startPage=".$startPage."&listNo=".$listNo."&table=".$table."&code=".$code."&search_item=".$search_item."&search_order=".$search_order);
				$bbs_data	= $tools->decode( $_GET[bbs_data] );
		   ?>


		   <?
		   //다음글
		   if($notice>0){

			   $query = "select idx,subject,secret from cs_bbs_data where code='$code' and idx>'$idx' and notice>0 order by idx asc limit 1";

		   } else {

			   if($re_level>0){

					if($re_level>1){
						$query = "select idx,subject,secret from cs_bbs_data where code='$code' and ref='$ref' and re_level<'$re_level' and idx!='$idx' and notice<1 order by ref asc, re_step ASC limit 1";
					} else {
						$query = "select idx,subject,secret from cs_bbs_data where code='$code' and ref='$ref' and re_level<'$re_level' and idx!='$idx' and notice<1 order by ref asc, re_step ASC limit 1";
					}
			   } else {

					$query = "select idx,subject,secret from cs_bbs_data where code='$code' and ref>'$ref' and notice<1 order by ref asc, re_step DESC limit 1";
			   }
		   }
				$rs_p = mysql_query($query);
				$row_p = mysql_fetch_array($rs_p);
				$mv_data2	= $tools->encode("idx=".$row_p[idx]."&startPage=".$startPage."&listNo=".$listNo."&table=".$table."&code=".$code."&search_item=".$search_item."&search_order=".$search_order);
				$bbs_data	= $tools->decode( $_GET[bbs_data] );
		   ?>

                        <!-- 이전글,다음글 -->
                        <div class="prev_next mt50">
                            <table summary="">
                            <colgroup>
                            <col width="110px">
                            </colgroup>
                            <tr>
                                <th>PREV <img src="../images/board/btn_prev_arrow.png" alt=""></th>
                                <td>
								  <? if($row_m[secret]=="y"){ ?>
								  <a href="<?=$PHP_SELF?>?code=<?=$code?>&idx=<?=$row_m[idx]?>&bbs_data=<?=$mv_data1;?>&bgu=pass">
								  <? } else { ?>
								  <a href="<?=$PHP_SELF?>?code=<?=$code?>&idx=<?=$row_m[idx]?>&bbs_data=<?=$mv_data1;?>&bgu=view">
								  <? } ?>
								  <? if($row_m[idx]){ ?><? echo $row_m[subject] ?><? } else { ?>이전글이 없습니다.<? } ?>
								  </a>
                                </td>
                            </tr>
                            <tr>
                                <th>NEXT <img src="../images/board/btn_next_arrow.png" alt=""></th>
                                <td>
								  <? if($row_p[secret]=="y"){ ?>
								  <a href="<?=$PHP_SELF?>?code=<?=$code?>&idx=<?=$row_p[idx]?>&bbs_data=<?=$mv_data2;?>&bgu=pass">
								  <? } else { ?>
								  <a href="<?=$PHP_SELF?>?code=<?=$code?>&idx=<?=$row_p[idx];?>&bbs_data=<?=$mv_data2;?>&bgu=view">
								  <? } ?>
								  <? if($row_p[idx]){ ?><? echo $row_p[subject] ?><? } else { ?>다음글이 없습니다.<? } ?>
								  </a>
                                </td>
                            </tr>
                            </table>
                        </div>
                        <!-- 이전글,다음글 //-->						
					</div>
					<!-- View //-->
