<? $mod=menu02 ?>
<?include ("../header.php");?>
<?

// 게시판 환경
$bbs_admin_stat	= $db->object("cs_bbs", "where code='$code'");

// 수정 정보 체크
if( $_POST[bbs_view_secr] ) {
	$bbs_stat	= $db->object("cs_bbs_data", "where idx=$idx");
	if( $bbs_stat->pwd  != $_POST[pwd] && $_SESSION[ADMIN_PASSWD]!=$_POST[pwd]) {
		$tools->alertJavaGo("패스워드가 올바르지 않습니다.", "bbs_passwd.php?bbs_view_secr=1&bbs_data=$mv_data");
	}
} else {
	//$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}


// 조회수 증가
$db->update("cs_bbs_data", "read_cnt=read_cnt+1 where idx=$idx");
$board_name = $bbs_admin_stat->name;
$bbs_stat			= $db->object("cs_bbs_data", "where idx=$idx");
$bbs_admin_stat	= $db->object("cs_bbs", "where code='$bbs_stat->code'", "view, editor, bbs_coment, bbs_pds, header, footer,bbs_type");
$name			= $bbs_stat->name;
$email			= $bbs_stat->email;
$reg_date	= $tools->strDateCut($bbs_stat->reg_date, 6);
$subject		= $db->stripSlash($bbs_stat->subject);

// 내용 출력 방식


	if($bbs_admin_stat->editor==1){
		$content = $bbs_stat->content;
		$content = str_replace("<P>","",$content);
		$content = str_replace("</P>","<br>",$content);
		$content = str_replace("<p>","",$content);
		$content = str_replace("</p>","<br>",$content);
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

function korfile($filename){

    $filename=iconv("EUC-KR", "UTF-8", $filename);

    $filename=urlencode($filename);

    $filename=str_replace("+", "%20", $filename);

    $filename=str_replace("%2F", "/", $filename);



    return $filename;

}


?>


			<div>
				<h3 class="page-header">게시판 관리(<?=$board_name;?>)</h3>
			</div>

							<table class="table table-bordered">
							
										<tr>
											<th>제 목</th>
											<td colspan='3'>&nbsp;<?=$subject;?></td>
										</tr>
										<tr>
											<th>이 름</th>
											<td>&nbsp;<?=$name;?></td>
											<th>작성일</th>
											<td>&nbsp;<?=$reg_date;?></td>
										</tr>
										<tr>
											<th>파 일</th>
											<td colspan='3'>&nbsp;<!-- 파일 다운로드 -->
											<?
											if( $bbs_admin_stat->bbs_pds && $bbs_stat->bbs_file != "none" )  {
												$bbs_file = $bbs_stat->sbbs_file;
											?>
											&nbsp;<a href="bbs_download.php?code=<?=$code?>&idx=<?=$bbs_stat->idx?>&download=1"><?=$bbs_file;?></a>
											<? } ?>

											<?
											if( $bbs_admin_stat->bbs_pds && $bbs_stat->bbs_file2 != "none" )  {
												$bbs_file2 = $bbs_stat->sbbs_file2;
											?>
											/&nbsp;<a href="bbs_download.php?code=<?=$code?>&idx=<?=$bbs_stat->idx?>&download=2"><?=$bbs_file2;?></a>
											<? } ?>

											<?
											if( $bbs_admin_stat->bbs_pds && $bbs_stat->bbs_file3 != "none" )  {
												$bbs_file3 = $bbs_stat->sbbs_file3;
											?>
											/&nbsp;<a href="bbs_download.php?code=<?=$code?>&idx=<?=$bbs_stat->idx?>&download=3"><?=$bbs_file3;?></a>
											<? } ?>

											<?
											if( $bbs_admin_stat->bbs_pds && $bbs_stat->bbs_file4 != "none" )  {
												$bbs_file4 = $bbs_stat->sbbs_file4;
											?>
											/&nbsp;<a href="bbs_download.php?code=<?=$code?>&idx=<?=$bbs_stat->idx?>&download=4"><?=$bbs_file4;?></a>
											<? } ?>

											<?
											if( $bbs_admin_stat->bbs_pds && $bbs_stat->bbs_file5 != "none" )  {
												$bbs_file5 = $bbs_stat->sbbs_file5;
											?>
											/&nbsp;<a href="bbs_download.php?code=<?=$code?>&idx=<?=$bbs_stat->idx?>&download=5"><?=$bbs_file5;?></a>
											<? } ?>
											</td>
										</tr>

								<? if($code=="guin"){ ?>
								<tr>
									<th scope="row">업체</th>
									<td class="myid" colspan='3'><?=$bbs_stat->company?></td>
								</tr>
								<tr>
									<th scope="row">연락처</th>
									<td colspan='3'>
										<?=$bbs_stat->tel?>
									</td>
								</tr>
								<tr>
									<th scope="row">경력</th>
									<td colspan='3'>
										<?=$bbs_stat->kyung?>
									</td>
								</tr>
								<tr>
									<th scope="row">급여</th>
									<td colspan='3'>
										<?=$bbs_stat->price?>
									</td>
								</tr>
								<tr>
									<th scope="row">근무시간</th>
									<td colspan='3'>
										<?=$bbs_stat->time?>
									</td>
								</tr>
								<tr>
									<th scope="row">휴무</th>
									<td colspan='3'>
										<?=$bbs_stat->holiday?>
									</td>
								</tr>
								<tr>
									<th scope="row">기타사항</th>
									<td colspan='3'>
										<?=$bbs_stat->etc?>
									</td>
								</tr>
								<? } ?>

								<? if($code=="gujik"){ ?>
								<tr>
									<th scope="row">업체</th>
									<td class="myid" colspan='3'><?=$bbs_stat->company?></td>
								</tr>
								<tr>
									<th scope="row">연락처</th>
									<td colspan='3'>
										<?=$bbs_stat->tel?>
									</td>
								</tr>
								<tr>
									<th scope="row">경력사항</th>
									<td colspan='3'>
										<?=$bbs_stat->kyung?>
									</td>
								</tr>
								<tr>
									<th scope="row">기타사항</th>
									<td colspan='3'>
										<?=$bbs_stat->etc?>
									</td>
								</tr>
								<? } ?>

										<tr>
											<td colspan="4"><?=$content;?></td>
										</tr>

								
								</table>


						<br>

						<!-- 코멘트 시작 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
						<? if( $bbs_admin_stat->bbs_coment ) { ?>
						<script language="javascript">
						<!--
						function comentSendit() {
							var form=document.bbs_coment_form;
							if(form.name.value=="") {
								alert("이름을 입력해 주십시오.");
								form.name.focus();
							} else if(form.pwd.value=="") {
								alert("패스워드를 입력해 주십시오.");
								form.pwd.focus();
							} else if(form.coment.value=="") {
								alert("코멘트를 입력해 주십시오.");
								form.coment.focus();
							} else {
								form.submit();
							}
						}
						//-->
						</script>
						<table class="table table-bordered">
							<colgroup >
								<col width="15%"  />
								<col width="*" />
								<col width="15%" />
								<col width="5%" />
							</colgroup>
							<?
							$co_result = $db->select( "cs_bbs_coment", "where link=$bbs_stat->idx");
							while( $co_row = @mysql_fetch_object($co_result)) {
								$co_idx			= $co_row->idx;
								$co_name		= htmlspecialchars($co_row->name);
								$co_coment		= htmlspecialchars($co_row->coment);
								$co_coment		= str_replace("\n","<br>", $co_coment);
								$co_coment		= stripslashes($co_coment);
								$co_reg_date	= $tools->strDateCut($co_row->reg_date);
							?>


						<thead>
							<tr>
								<td class="text-center"><b><?=$co_name;?></b></td>
								<td><?=$co_coment;?></td>
								<td class="text-center"><?=$co_reg_date;?></td>
								<td><a href="bbs_passwd.php?coment_del=1&coment_idx=<?=$co_idx;?>&code=<?=$code?>&idx=<?=$bbs_stat->idx?>" class="btn btn-danger">삭제</a></td>
							</tr>
						</thead>
							<?} ?>
						</table><br>

						<table class="table table-bordered" >
							<colgroup >
								<col width="15%"  />
								<col width="30%" />
								<col width="*" />
								<col width="5" />
							</colgroup>
							<form name="bbs_coment_form" action="bbs_coment_ok.php?&code=<?=$code?>&idx=<?=$bbs_stat->idx;?>" method="post" role="form">
							<input type="hidden" name="coment_reg" value="1">
							<tr>
								<th>코멘트</th>

								<td>
									  <div class="form-group text-left">
											<label>성명</label>
											<input type="text" name="name" class="form-control " placeholder="성명을 입력해주세요.">
									  </div>
									  <div class="form-group text-left">
											<label>비밀번호</label>
											<input type="text" name="pwd" class="form-control " placeholder="비밀번호를 입력해주세요.">
									  </div>
								</td>
									
								<td><textarea name="coment" rows="6" class="form-control"></textarea></td>		
								<td><a href="javascript:comentSendit();" class="btn btn-primary">등록</a></td>
							</tr>
							</form>
						</table><br>
						<? }?>
						<!-- 코멘트 종료 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------->

 <a href="bbs_write.php?reWrite=1&bbs_data=<?=$mv_data;?>"><!-- <img src="../images/bReply.gif" border="0" align="absmiddle"> --></a>

			<table class="table">
				<tr>
					<td class="text-center">

					<?if($bbs_admin_stat->bbs_type==1){?>
						<a href="bbs_write.php?menu=<?=$menu?>&reWrite=1&idx=<?=$bbs_stat->idx;?>&startPage=<?=$startPage;?>&listNo=<?=$listNo;?>&table=<?=$table;?>&code=<?=$code;?>&search_item=<?=$search_item;?>&search_order=<?=$search_order;?>" class="btn btn-primary">답변</a>			
					<?}?>

						 <a href="bbs_passwd.php?menu=<?=$menu?>&bbs_view_del=1&idx=<?=$bbs_stat->idx;?>&startPage=<?=$startPage;?>&listNo=<?=$listNo;?>&table=<?=$table;?>&code=<?=$code;?>&search_item=<?=$search_item;?>&search_order=<?=$search_order;?>" class="btn btn-danger">삭제</a>
						 <a href="bbs_edit.php?menu=<?=$menu?>&bbs_view_edit=1&idx=<?=$bbs_stat->idx;?>&startPage=<?=$startPage;?>&listNo=<?=$listNo;?>&table=<?=$table;?>&code=<?=$code;?>&search_item=<?=$search_item;?>&search_order=<?=$search_order;?>" class="btn btn-primary">수정</a>
						 <a href="bbs_list.php?menu=<?=$menu?>&startPage=<?=$startPage;?>&listNo=<?=$listNo;?>&table=<?=$table;?>&code=<?=$code;?>&search_item=<?=$search_item;?>&search_order=<?=$search_order;?>" class="btn btn-default">목록</a>
					</td>
				</tr>
			</table>


<? include('../footer.php');?>