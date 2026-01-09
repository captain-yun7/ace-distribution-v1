<? $mod=menu02 ?>
<?include ("../header.php");?>
<?
// 게시판 환경
$bbs_admin_stat	= $db->object("cs_bbs", "where code='$code'", "bbs_pds, bbs_pds_ea, header, footer, bbs_secret,editor,bbs_type");
if( $_GET[reWrite] ) {
  	$view_row		= $db->object("cs_bbs_data", "where idx=$idx");
	$subject			= $db->stripSlash($view_row->subject);
	$content			= $db->stripSlash($view_row->content);
	$content			= "$view_row->name 님 쓰신글\n\n"."제목 : ".$subject."\n".$content."\n\n"."[답변] ";
}
?>
<!-- 에디터 스크립트 -->
<? include $_SERVER['DOCUMENT_ROOT']."/webeditor/webeditor_script.php"; ?>


				<form name="tx_editor_form" id="tx_editor_form" class="inline"  action="bbs_write_ok.php" method="post" enctype="multipart/form-data" >
				<input type="hidden" name="code" value="<?=$code;?>">
				<input type="hidden" name="table" value="<?=$table;?>">
				<input type="hidden" name="ref" value="<?=$view_row->ref;?>">
				<input type="hidden" name="re_step" value="<?=$view_row->re_step;?>">
				<input type="hidden" name="re_level" value="<?=$view_row->re_level;?>">
				<input type="hidden" name="sum_img" value="">
				<input type="hidden" name="menu" value="<?=$menu?>">

					<table class="table table-bordered">
						<tbody>
							<tr>
								<th>작성자</th>
								<td><input type="text" name="name" class="form-control col-md-3" value="관리자">&nbsp;(예 : 홍길동)</td>
							</tr>

							<tr>
								<th>비밀번호</th>
								<td><input type="password" name="pwd" class="form-control col-md-3" value="<?=$admin_stat->admin_passwd ;?>">&nbsp;(수정 및 삭제시 필요합니다)</td>
							</tr>

							<tr>
								<th>제 목</th>
								<td><input type="text" name="subject" class="form-control col-md-7" ></td>
							</tr>

								<? if($code=="guin"){ ?>

								<tr>
									<th scope="row">업체</th>
									<td class="myid"><input type="text" name="company" class="form-control col-md-7" /></td>
								</tr>
								<tr>
									<th scope="row">연락처</th>
									<td>
										<input type="text" class="form-control col-md-7" name="tel" value="<?=$mem_row->phone?>">
									</td>
								</tr>
								<tr>
									<th scope="row">경력</th>
									<td>
										<input type="text" class="form-control col-md-7" name="kyung">
									</td>
								</tr>
								<tr>
									<th scope="row">급여</th>
									<td>
										<input type="text" class="form-control col-md-7" name="price">
									</td>
								</tr>
								<tr>
									<th scope="row">근무시간</th>
									<td>
										<input type="text" class="form-control col-md-7" name="time">
									</td>
								</tr>
								<tr>
									<th scope="row">휴무</th>
									<td>
										<input type="text" class="form-control col-md-7" name="holiday">
									</td>
								</tr>
								<tr>
									<th scope="row">기타사항</th>
									<td>
										<input type="text" class="form-control col-md-7" name="etc">
									</td>
								</tr>

								<? } ?>

								<? if($code=="gujik"){ ?>
								<tr>
									<th scope="row">업체</th>
									<td class="myid"><input type="text" name="company" class="form-control col-md-7" /></td>
								</tr>
								<tr>
									<th scope="row">연락처</th>
									<td>
										<input type="text" class="form-control col-md-7" name="tel" value="<?=$mem_row->phone?>">
									</td>
								</tr>
								<tr>
									<th scope="row">경력사항</th>
									<td>
										<input type="text" class="form-control col-md-7" name="kyung">
									</td>
								</tr>
								<tr>
									<th scope="row">기타사항</th>
									<td>
										<input type="text" class="form-control col-md-7" name="etc">
									</td>
								</tr>
								<? } ?>

							<? if($code=="bodo"){ ?>
							<tr>
								<th>간단설명</th>
								<td><textarea name="content_re" style="width:800px;height:200px;" class="form-control"></textarea></td>
							</tr>
							<? } ?>


<!--start///////////////////////////////////////////////////////////////////공 지 기 능////////////////////////////////////////////////////////////////////////////////////// -->
						<? if($_GET[reWrite] || $bbs_admin_stat->bbs_type==1 || $bbs_admin_stat->bbs_type==3 || $bbs_admin_stat->bbs_type==4) {?>
								<input type="hidden" name="notice" value="0">
						<?} else {?>
							<tr>
								<th>공지기능</th>
								<td>
									<label class="radio-inline"><input type="radio" name="notice" value="1">&nbsp;yes&nbsp;</label>
									<label class="radio-inline"><input type="radio" name="notice" value="0">&nbsp;no</label>
								</td>
							</tr>
						<? } ?>



<!--end///////////////////////////////////////////////////////////////////공 지 기 능////////////////////////////////////////////////////////////////////////////////////// -->




<!--start///////////////////////////////////////////////////////////////////비 밀 글////////////////////////////////////////////////////////////////////////////////////// -->
						<? if($bbs_admin_stat->bbs_secret==1){ ?>
							<tr>
								<th>비밀글</th>
									<td>
										<label class="checkbox-inline"><input type="checkbox" class="uniform" name="secret"  value="y">(비밀글 기능 사용시 체크 해 주세요)</label>
									</td>
							</tr>
						<? } ?>
<!--end///////////////////////////////////////////////////////////////////비 밀 글////////////////////////////////////////////////////////////////////////////////////// -->
					</tbody>
				</table>


			<table class="table table-bordered">
<!--start///////////////////////////////////////////////////////////////////에 디 터////////////////////////////////////////////////////////////////////////////////////// -->			
						<? if($bbs_admin_stat->editor=="1"){ ?>
								<tr>
									<td align="center" colspan='2'>
			<textarea id="contents_source" style="display:none;"><?=$re_content;?></textarea>
			<?include $_SERVER['DOCUMENT_ROOT']."/webeditor/webeditor_area.php";?>
									</td>
								</tr>
						<?}else{?>
								<tr>
									<th>내용</th>
									<td>
										<textarea id="wr_content" name="tx_content" rows="20" class="form-control"><?=$content;?></textarea>
									</td>
								</tr>
						<?}?>
<!--end///////////////////////////////////////////////////////////////////에 디 터////////////////////////////////////////////////////////////////////////////////////// -->




<!--start///////////////////////////////////////////////////////////////////파일 업로드////////////////////////////////////////////////////////////////////////////////////// -->			
							<? if( $bbs_admin_stat->bbs_pds ) { ?>

								<? if($bbs_admin_stat->bbs_pds_ea==1){ ?>
								<tr>
									<th>파 일</td>
									<td><input type="file" name="bbs_file" ></td>
								</tr>

								<? } else { ?>

									<? for($i=1;$i<=$bbs_admin_stat->bbs_pds_ea;$i++){ ?>
									<tr>
										<th>파 일<?=$i?></td>
										<td>
										<? if($i==1){ ?>
										<input type="file" name="bbs_file" >
										<? } else { ?>
										<input type="file" name="bbs_file<?=$i?>" >
										<? } ?>
										</td>
									</tr>

									<? } ?>

								<? } ?>
							<?}?>
<!-- end/////////////////////////////////////////////////////////////////////////파일 업로드////////////////////////////////////////////////////////////////////////////////////// -->			

					</table>

					<table class="table">
						<tr>
							<td class="text-center">
							<? if($bbs_admin_stat->editor=="1"){ ?>
								<a href="#" class="btn btn-primary" onClick="Editor.save();">
							<?}else{?>
								<a href="#" class="btn btn-primary" onClick="tx_editor_form.submit()">
								<?}?>글쓰기</a>
								 <a href="bbs_list.php?menu=<?=$menu;?>&startPage=<?=$startPage;?>&listNo=<?=$listNo;?>&table=<?=$table;?>&code=<?=$code;?>&search_item=<?=$search_item;?>&search_order=<?=$search_order;?>" class="btn btn-default">목록</a>
							</td>
						</tr>
					</table>

				</form>




<script src="/webeditor/webeditor_config.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
<!--
function validForm(editor) {
	var validator = new Trex.Validator();
	var content = editor.getContent();

		if (document.tx_editor_form.name.value == '') {
				alert('이름을 입력해 주세요');
				document.tx_editor_form.name.focus();
				return false;
			}
			if (document.tx_editor_form.pwd.value == '') {
			alert('비밀번호를 입력해 주세요');
				document.tx_editor_form.pwd.focus();
				return false;
			}
			if (document.tx_editor_form.subject.value == '') {
				alert('제목을 입력해 주세요');
				document.tx_editor_form.subject.focus();
				return false;
			}

	if (!validator.exists(content)) {
		$("#contents_validate").html('내용을 입력해주세요.');
		Editor.focus();
		return false;
	}
	return true;
}
//-->
</script>

<? include('../footer.php');?>



