<? $mod=menu07 ?>
<? $menu=1?>
<?include ("../header.php");?>
<?include($ROOT_DIR.'/lib/style_class.php');?>


<? include $_SERVER['DOCUMENT_ROOT']."/webeditor/webeditor_script.php"; ?>


<div>
	<h3 class="page-header">팝업창 리스트</h3>
</div>

		<form name="tx_editor_form" id="tx_editor_form" action="popup_add_ok.php" method="post" enctype="multipart/form-data">
		<input type="hidden" name="sum_img" value="">

			<table class="table table-bordered">
				<thead>

					<caption></caption>
						<colgroup>
							<col width="20%">
							<col width="80%">
						</colgroup>
			

				<tr>
					<th>팝업 종류</th>
					<td>
						<label class="radio-inline"><input type="radio" name="kind" value="0" checked>&nbsp;팝업</label>&nbsp;&nbsp;&nbsp;
						<label class="radio-inline"><input type="radio" name="kind" value="1">&nbsp;레이어</label>
					</td>
				</tr>

				<tr>
					<th>형태 선택</th>
					<td>
						<label class="radio-inline"><input type="radio" name="display" value="0" checked onClick="popupReg()">&nbsp;HTML</label>&nbsp;
						<label class="radio-inline"><input type="radio" name="display" value="1" onClick="popupReg()">&nbsp;단일 이미지</label>
					</td>
				</tr>

				<tr>
					<th>시작일/종료일</th>
					<td>
						<select name="start_year" class="form-control2"><? for($i=date("Y");$i<date("Y")+10;$i++){	$today_y=date("Y");?><option value="<?=$i?>" <?if($i==$today_y) echo("selected");?>><?=$i?></option><?}?></select>&nbsp;년&nbsp;&nbsp;
						<select name="start_mon" class="form-control2"><? for($i=1;$i<13;$i++){if(strlen($i)==1)$i="0".$i; $today_m=date("m");?><option value="<?=$i?>" <?if($i==$today_m) echo("selected");?>><?=$i?></option><?}?></select>&nbsp;월&nbsp;&nbsp;
						<select name="start_day" class="form-control2"><? for($i=1;$i<32;$i++){if(strlen($i)==1)$i="0".$i; $today_d=date("d");?><option value="<?=$i?>" <?if($i==$today_d) echo("selected");?>><?=$i?></option><?}?></select>&nbsp;일&nbsp;~&nbsp;
						<select name="end_year" class="form-control2"><? for($i=date("Y");$i<date("Y")+10;$i++){	$today_y=date("Y");?><option value="<?=$i?>" <?if($i==$today_y) echo("selected");?>><?=$i?></option><?}?></select>&nbsp;년&nbsp;&nbsp;
						<select name="end_mon" class="form-control2"><? for($i=1;$i<13;$i++){if(strlen($i)==1)$i="0".$i; $today_m=date("m");?><option value="<?=$i?>" <?if($i==$today_m) echo("selected");?>><?=$i?></option><?}?></select>&nbsp;월&nbsp;&nbsp;
						<select name="end_day" class="form-control2"><? for($i=1;$i<32;$i++){if(strlen($i)==1)$i="0".$i; $today_d=date("d");?><option value="<?=$i?>" <?if($i==$today_d) echo("selected");?>><?=$i?></option><?}?></select>&nbsp;일
					</td>
				</tr>

				<tr>
					<th>팝업창 사이즈</th>
					<td>
						<input name="width" type="text" class="form-control2" style="width:100px" <?=$style->colorAlign("#000000", 0);?> <?=$style->strCheck(0);?>>&nbsp;가로 X&nbsp; 
						<input name="height" type="text" class="form-control2" style="width:100px" <?=$style->colorAlign("#000000", 0);?> <?=$style->strCheck(0);?>>&nbsp;세로 &nbsp;&nbsp;&nbsp;(새로운 창의 크기를 설정해주세요)
					</td>
				</tr>

				<tr>
					<th>팝업창 위치</th>
					<td>
						<input name="tops" type="text"  class="form-control2" style="width:100px" <?=$style->colorAlign("#000000", 0);?> <?=$style->strCheck(0);?>>&nbsp;Top&nbsp;
						<input name="lefts" type="text"  class="form-control2" style="width:100px" <?=$style->colorAlign("#000000", 0);?> <?=$style->strCheck(0);?>>&nbsp;Left &nbsp;&nbsp;&nbsp;(새로운 창의 위치를 설정해주세요)
					</td>
				</tr>

				<tr>
					<th>브라우져 타이틀바</th>
					<td><input name="title_bar" type="text" class="form-control"> &nbsp;간단한 설명</td>
				</tr>

				<tr>
					<th>쿠키 설정</th>
					<td>
						<label class="radio-inline"><input type="radio" name="live" value="0">※ 오늘은 이창을 다시 띄우지 않음</label>&nbsp;
						<label class="radio-inline"><input type="radio" name="live" value="1">※ 이창은 다시는 띄우지 않음</label>
					</td>
				</tr>

				<tr id="popup_view" style="display:none;">
					<th>링크URL</th>
					<td>HTTP://<input name="link_url" type="text" class="form-control"></td>
				</tr>

				<tr id="popup_view" style="display:none;">
					<th>출력 이미지</th>
					<td><input name="popup_images" type="file" > 출력할 이미지를 등록해 주세요</td>
				</tr>

				<tr id="popup_view" style="display:none;">
					<td colspan=2>
						<textarea id="contents_source" style="display:none;"></textarea>
						<?include $_SERVER['DOCUMENT_ROOT']."/webeditor/webeditor_area.php";?>
					</td>
				</tr>
	
				</thead>
			</table>
			
			<p id="popup_view" style="display:none;">단일이미지 업로드시 링크URL 을 입력하시면 이미지를 클릭할 경우 해당페이지로 이동시킵니다. </p>
	

			<table class="table">
				<tr>
					<td class="text-right"><a href="javascript:Editor.save();" class="btn btn-primary">저장하기</a></td>
				</tr>
			</table>


	</form>


<script language="JavaScript">
<!--
var form=document.tx_editor_form;
if( form.display[0].checked ) {
	document.all.popup_view[0].style.display="none";
	document.all.popup_view[1].style.display="none";
	document.all.popup_view[2].style.display="";
	document.all.popup_view[3].style.display="none";
} else if( form.display[1].checked ) {
	document.all.popup_view[0].style.display="";
	document.all.popup_view[1].style.display="";
	document.all.popup_view[2].style.display="none";
	document.all.popup_view[3].style.display="";
}
//-->
</script>


<script type="text/javascript">
	var config = {
		txHost: 'http://<?=$HTTP_HOST?>/', /* 런타임 시 리소스들을 로딩할 때 필요한 부분으로, 경로가 변경되면 이 부분 수정이 필요. ex) http://xxx.xxx.com */
		txPath: '/daumeditor/', /* 런타임 시 리소스들을 로딩할 때 필요한 부분으로, 경로가 변경되면 이 부분 수정이 필요. ex) /xxx/xxx/ */
		txService: 'sample', /* 수정필요없음. */
		txProject: 'sample', /* 수정필요없음. 프로젝트가 여러개일 경우만 수정한다. */
		initializedId: "", /* 대부분의 경우에 빈문자열 */
		wrapper: "tx_trex_container", /* 에디터를 둘러싸고 있는 레이어 이름(에디터 컨테이너) */
		form: 'tx_editor_form'+"", /* 등록하기 위한 Form 이름 */
		txIconPath: "/daumeditor/images/icon/editor/", /*에디터에 사용되는 이미지 디렉터리, 필요에 따라 수정한다. */
		txDecoPath: "/daumeditor/images/deco/", /*본문에 사용되는 이미지 디렉터리, 서비스에서 사용할 때는 완성된 컨텐츠로 배포되기 위해 절대경로로 수정한다. */
		canvas: {
			styles: {
				color: "#444444", /* 기본 글자색 */
				fontFamily: "굴림", /* 기본 글자체 */
				fontSize: "10pt", /* 기본 글자크기 */
				backgroundColor: "#fff", /*기본 배경색 */
				lineHeight: "1.5", /*기본 줄간격 */
				padding: "8px" /* 위지윅 영역의 여백 */
			},
			showGuideArea: true
		},
		events: {
			preventUnload: false
		},
		sidebar: {
			attachbox: {
				show: true,
				confirmForDeleteAll: true
			}
		},
		events:
		{
			preventUnload: false
		}
	};

	EditorJSLoader.ready(function(Editor) {
		var editor = new Editor(config);
	});


	function setForm(editor) {
        var i, input;
        var form = editor.getForm();
        var content = editor.getContent();


        var textarea = document.createElement('textarea');
        textarea.name = 'tx_content';
		textarea.style.display="none";
        textarea.value = content;
        form.createField(textarea);


        var images = editor.getAttachments('image');
        for (i = 0; i < images.length; i++) {

            if (images[i].existStage) {

             //   alert('attachment information - image[' + i + '] \r\n' + JSON.stringify(images[i].data));

				//파일경로
                input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'tx_attach_image[]';
                input.value = images[i].data.imageurl;
                form.createField(input);

				//파일명
				input2 = document.createElement('input');
                input2.type = 'hidden';
                input2.name = 'file_name[]';
                input2.value = images[i].data.filename;
                form.createField(input2);
            }
        }

        var files = editor.getAttachments('file');
        for (i = 0; i < files.length; i++) {
            input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'attach_file[]';
            input.value = files[i].data.attachurl;
            form.createField(input);
        }
        return true;
	}


</script>



<script src="/webeditor/webeditor_config.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
<!--
function saveContent() {
	Editor.save(); // 이 함수를 호출하여 글을 등록하면 된다.
}

	function validForm(editor) {


		if (document.tx_editor_form.width.value == '') {
			alert('가로 사이즈를 입력해 주세요.');
			document.tx_editor_form.width.focus();
			return false;
		}
		if (document.tx_editor_form.height.value == '') {
			alert('세로 사이즈를 입력해 주세요.');
			document.tx_editor_form.height.focus();
			return false;
		}


		if (document.tx_editor_form.title_bar.value == '') {
			alert('브라우즈 타이틀바를 입력해 주세요.');
			document.tx_editor_form.title_bar.focus();
			return false;
		}


		var validator = new Trex.Validator();
		var content = editor.getContent();

	
	/*
		if (!validator.exists(content)) {
			alert('내용을 입력하세요');
			return false;
		}
	*/
		return true;
	}
function clearContent() {
	$("#contents_validate").empty();
	Editor.modify({ content: " ", attachments: [] });
}

//-->
</script>



<script language="JavaScript">
<!--
function sendit() {
	var form=document.popup_form;
	if(form.width.value=="") {
		alert("가로 사이즈를 입력해 주세요.");
		form.width.focus();
	} else if(form.height.value=="") {
		alert("세로 사이즈를 입력해 주세요.");
		form.height.focus();
	} else if(form.title_bar.value=="") {
		alert("브라우즈 타이틀바를 입력해 주세요.");
		form.title_bar.focus();
	//} else if(form.display[0].checked==true && form.content.value=="") {
	//	alert("팝업창 내용을 입력해 주세요.");
	//	form.content.focus();
	} else {
		form.submit();
	}
}

////  웹FTP 새창 오픈  시작 ///////////////////////////////////////////////////////////////////////////////
function ftpWinOpen() {
	window.open("../webftp.php","","scrollbars=yes, width=500, height=600");
}
////  웹FTP 새창 오픈  종료 /////////////////////////////////////////////////////////////////////////////////

////  TEXTAREA 입력 폼 크기 조정 시작 //////////////////////////////////////////////////////////////////
function textarea_resize( formname, size ) {
	if( size=='reset' ){
		formname.rows = 10;
	}else{
		var value = formname.rows + size;
		if(value>11) formname.rows = value;
		else return;
	}
}
////  TEXTAREA 입력 폼 크기 조정 종료 //////////////////////////////////////////////////////////////////

function popupReg() {
	var form=document.tx_editor_form;
	if( form.display[0].checked ) {
		document.all.popup_view[0].style.display="none";
		document.all.popup_view[1].style.display="none";
		document.all.popup_view[2].style.display="";
		document.all.popup_view[3].style.display="none";
	} else if( form.display[1].checked ) {
		document.all.popup_view[0].style.display="";
		document.all.popup_view[1].style.display="";
		document.all.popup_view[2].style.display="none";
		document.all.popup_view[3].style.display="";
	}
}
//-->
</script>

<? include('../footer.php');?>
