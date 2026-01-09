<?
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

// 게시판 접근 권한 설정
if( $bbs_admin_stat->bbs_access == 1 ) {
	if( !$_SESSION[USERID] ) { $tools->errMsg('회원 전용입니다.\n\n로그인을 해주세요');}
}
if( $bbs_admin_stat->bbs_write == 1 ) {
	if( !$_SESSION[USERID] ) { $tools->errMsg('회원 전용입니다.\n\n로그인을 해주세요');}
}

// 수정 정보 체크 	
if( $_POST[bbs_view_edit] ) {
	
	$bbs_stat	= $db->object("cs_bbs_data", "where idx='$idx'");
	
	if($_SESSION[USERID]==""){
		if( $bbs_stat->pwd  != $_POST[pwd] ) {	 
			$tools->alertJavaGo("패스워드가 올바르지 않습니다.", "$url?bgu=pass&bbs_view_edit=1&bbs_data=$mv_data");
		}
	}
} else {
	$tools->errMsg('경 고 !!!\n\n비정상적으로 접근했습니다.');
}
?>
<? if($bbs_admin_stat->editor=="1"){ ?>
<? include $_SERVER['DOCUMENT_ROOT']."/webeditor/webeditor_script.php"; ?>
<?}?>

<script language="javascript">
<!--

function textarea_resize( formname, size ) {
	if( size=='reset' ){
		formname.rows = 10;
	}else{
		var value = formname.rows + size;
		if(value>11) formname.rows = value;
		else return;
	}
}
//-->
</script>

   		<form name="tx_editor_form" id="tx_editor_form" action="/bbs/bbs_edit_ok.php" method="post" enctype="multipart/form-data">
		<input type="hidden" name="bbs_data" value="<?=$mv_data;?>">
		<input type="hidden" name="url" value="<?=$PHP_SELF?>">
		<input type="hidden" name="sum_img" value="<?=$bbs_stat->sum_img?>">

                	<!-- Write -->
					<div>
							<fieldset>
								<legend>글쓰기</legend>
								<table class="board_write">
								<colgroup>
								<col width="125px" />
								<col width="" />
								</colgroup>
								<tbody>
								<tr>
									<th scope="row">제목</th>
									<td>
										<input type="text" class="ib500" name="subject" value="<?=$bbs_stat->subject?>">
										<? if($bbs_admin_stat->bbs_secret==1){ ?>
										&nbsp;<input type="checkbox" name="secret" class="input" value="y" <? if($bbs_stat->secret=="y"){ echo "checked"; } ?>> (비밀글 기능 사용시 체크 해 주세요)
										<? } ?>
									</td>
								</tr>
								<tr>
									<th scope="row">작성자</th>
									<td class="myid">
									<? if($_SESSION[USERID]==""){ ?>
									<input name="name" type="text" class="ib170" value="<?=$bbs_stat->name?>"> 
									<? } else { ?>
									<?=$_SESSION[NAME]?>
									<input type="hidden" name="name" value="<?=$bbs_stat->name?>">
									<? } ?>	
									</td>
								</tr>
<? if( $bbs_admin_stat->bbs_pds ) { ?>
	<? if($bbs_admin_stat->bbs_pds_ea==1){ ?>
								<tr>
									<th scope="row">첨부파일</th>
									<td>
										<? if($bbs_stat->bbs_file!="none"){ ?>&nbsp;<?=$bbs_stat->bbs_file?>&nbsp;<input type=checkbox name=imdel1 value="y">삭제<br><? } ?>
										<input name="bbs_file" type="file" class="500">
									</td>
								</tr>
	<? } else { ?>

		<? for($i=1;$i<=$bbs_admin_stat->bbs_pds_ea;$i++){ ?>
								<tr>
									<th scope="row">첨부파일<?=$i?></th>
									<td>
										<? if($i==1){ ?>
										<? if($bbs_stat->bbs_file!="none"){ ?>&nbsp;<?=$bbs_stat->bbs_file?>&nbsp;<input type=checkbox name=imdel1 value="y">삭제<br><? } ?>
										<input name="bbs_file" type="file" class="500">
										<? } else { ?>
										<? 
										if($i==2){ $bbsf = $bbs_stat->bbs_file2; }
										if($i==3){ $bbsf = $bbs_stat->bbs_file3; }
										if($i==4){ $bbsf = $bbs_stat->bbs_file4; }
										if($i==5){ $bbsf = $bbs_stat->bbs_file5; }
										if($bbsf!="none"){ ?>&nbsp;<?=$bbsf?>&nbsp;<input type=checkbox name=imdel<?=$i?> value="y">삭제<br><? } ?>
										<input name="bbs_file<?=$i?>" type="file" class="500">
										<? } ?>
									</td>
								</tr>
		 <? } ?>

	<? } ?>

<? } ?>
								
								<? if($code=="guin"){ ?>

								<tr>
									<th scope="row">업체</th>
									<td class="myid"><input type="text" name="company" class="ib170" value="<?=$bbs_stat->company?>" /></td>
								</tr>
								<tr>
									<th scope="row">연락처</th>
									<td>
										<input type="text" class="ib500" name="tel" value="<?=$bbs_stat->tel?>">
									</td>
								</tr>
								<tr>
									<th scope="row">경력</th>
									<td>
										<input type="text" class="ib500" name="kyung" value="<?=$bbs_stat->kyung?>">
									</td>
								</tr>
								<tr>
									<th scope="row">급여</th>
									<td>
										<input type="text" class="ib500" name="price" value="<?=$bbs_stat->price?>">
									</td>
								</tr>
								<tr>
									<th scope="row">근무시간</th>
									<td>
										<input type="text" class="ib500" name="time" value="<?=$bbs_stat->time?>">
									</td>
								</tr>
								<tr>
									<th scope="row">휴무</th>
									<td>
										<input type="text" class="ib500" name="holiday" value="<?=$bbs_stat->holiday?>">
									</td>
								</tr>
								<tr>
									<th scope="row">기타사항</th>
									<td>
										<input type="text" class="ib500" name="etc" value="<?=$bbs_stat->etc?>">
									</td>
								</tr>

								<? } ?>

								<? if($code=="gujik"){ ?>
								<tr>
									<th scope="row">업체</th>
									<td class="myid"><input type="text" name="company" class="ib170" value="<?=$bbs_stat->company?>" /></td>
								</tr>
								<tr>
									<th scope="row">연락처</th>
									<td>
										<input type="text" class="ib500" name="tel" value="<?=$bbs_stat->tel?>">
									</td>
								</tr>
								<tr>
									<th scope="row">경력사항</th>
									<td>
										<input type="text" class="ib500" name="kyung" value="<?=$bbs_stat->kyung?>">
									</td>
								</tr>
								<tr>
									<th scope="row">기타사항</th>
									<td>
										<input type="text" class="ib500" name="etc" value="<?=$bbs_stat->etc?>">
									</td>
								</tr>
								<? } ?>
								
								
								<tr>
									<td colspan="2">
<? if($bbs_admin_stat->editor=="1"){ ?>

			<textarea id="contents_source" style="display:none;"><?=$bbs_stat->content;?></textarea>
			<?include $_SERVER['DOCUMENT_ROOT']."/webeditor/webeditor_area.php";?>

<? } else { ?>

	<textarea name="tx_content" style="width:100%;height:350px;margin-left:-10px" placeholder="내용을 입력해주세요!"><?=$bbs_stat->content?></textarea>
	
<? } ?>
									</td>
								</tr>
								<? if($_SESSION[USERID]==""){ ?>
								<tr>
									<th scope="row">비밀번호</th>
									<td>
										<input type="password" name="pwd" class="ib50" value="<?=$bbs_stat->pwd?>" /> <span class="add_tx">※ 수정/삭제 시 필요</span>
									</td>
								</tr>
								<? } ?>
								</tbody>
								</table>
							</fieldset>
							<div class="btnSec tr">
								<span class="button large blue"><input type="button" <? if($bbs_admin_stat->editor==1){ ?>onclick="Editor.save();"<? } else { ?>onclick="writeSendit();"<? } ?> value="확인"></span>
							</div>
					</div>
					<!-- Write //-->


</form>

<? if($bbs_admin_stat->editor=="1"){ ?>

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
			
			<? if($_SESSION[USERID]==""){ ?>
			if (document.tx_editor_form.pwd.value == '') {
				alert('비밀번호를 입력해 주세요');
				document.tx_editor_form.pwd.focus();
				return false;
			}
			<? } ?>

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


<? } else { ?>
<script language="javascript">
<!--
// 폼전송
function writeSendit() {
	var form=document.tx_editor_form;
	if(form.name.value=="") {
		alert("이름을 입력해 주십시오.");
		form.name.focus();
	<? if($_SESSION[USERID]==""){ ?>
	} else if( form.pwd.value=="") {
		alert("패스워드를 입력해 주십시오.");
		form.pwd.focus();
	<? } ?>
	} else if( form.subject.value=="") {
		alert("제목을 입력해 주십시오.");
		form.subject.focus();
	} else {
		form.submit();
	}
}
-->
</script>
<? } ?>
