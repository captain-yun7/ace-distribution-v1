<? $mod=menu07 ?>
<? $menu=1?>
<?include ("../header.php");?>
<?include($ROOT_DIR.'/lib/style_class.php');

$row = $db->object("cs_popup", " where idx='$_GET[idx]'");
$popup_images_size=@getimagesize("../../data/designImages/$row->popup_images");// 이미지 사이즈
$popup_width=$popup_images_size[0];// 가로 길이
$popup_height=$popup_images_size[1];// 세로 길이
?>


<? include $_SERVER['DOCUMENT_ROOT']."/webeditor/webeditor_script.php"; ?>

<script language="JavaScript">
<!--


function imagesView( idx, w, h ){
	window.open("popup_images_view.php?idx="+idx,"","scrollbars=no,width="+w+",height="+h+",top=200,left=200");
}

//  웹FTP 새창 오픈
function ftpWinOpen() {
	window.open("../webftp.php","","scrollbars=yes, width=500, height=600");
}

//  TEXTAREA 입력 폼 크기 조정
function textarea_resize( formname, size ) {
	if( size=='reset' ){
		formname.rows = 10;
	}else{
		var value = formname.rows + size;
		if(value>11) formname.rows = value;
		else return;
	}
}

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


<div>
	<h3 class="page-header">팝업창 설정</h3>
</div>


<form name="tx_editor_form" id="tx_editor_form" action="popup_edit_ok.php" method="post" enctype="multipart/form-data">
	<input type="hidden" name="sum_img" value="<?=$row->sum_img?>">
	<input type="hidden" name="idx" value="<?=$_GET[idx];?>">

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
						<label class="radio-inline"><input type="radio" name="kind" value="0" <? if($row->kind==0){ echo "checked"; } ?>>&nbsp;팝업</label>&nbsp;&nbsp;&nbsp;
						<label class="radio-inline"><input type="radio" name="kind" value="1" <? if($row->kind==1){ echo "checked"; } ?>>&nbsp;레이어</label>
					</td>
				</tr>

				<tr>
					<th>형태 선택</th>
					<td>
						<label class="radio-inline"><input type="radio" name="display" value="0" onClick="popupReg()" <? if( $row->display == 0 ) { echo("checked");}?>>&nbsp;HTML</label>&nbsp;
						<label class="radio-inline"><input type="radio" name="display" value="1" onClick="popupReg()" <? if( $row->display == 1 ) { echo("checked");}?>>&nbsp;단일 이미지</label>
					</td>
				</tr>

				<tr>
					<th>시작일/종료일</th>
					<td>
						<select name="start_year" class="form-control2"><? for($i=date("Y");$i<date("Y")+10;$i++){	$today_y=date("Y", $row->start_day);?><option value="<?=$i?>" <?if($i==$today_y) echo("selected");?>><?=$i?></option><?}?></select>&nbsp;년&nbsp;&nbsp;
						<select name="start_mon" class="form-control2"><? for($i=1;$i<13;$i++){if(strlen($i)==1)$i="0".$i; $today_m=date("m", $row->start_day);?><option value="<?=$i?>" <?if($i==$today_m) echo("selected");?>><?=$i?></option><?}?></select>&nbsp;월&nbsp;&nbsp;
						<select name="start_day" class="form-control2"><? for($i=1;$i<32;$i++){if(strlen($i)==1)$i="0".$i; $today_d=date("d", $row->start_day);?><option value="<?=$i?>" <?if($i==$today_d) echo("selected");?>><?=$i?></option><?}?></select>&nbsp;일&nbsp;~&nbsp;
						<select name="end_year" class="form-control2"><? for($i=date("Y");$i<date("Y")+10;$i++){	$today_y=date("Y", $row->end_day);?><option value="<?=$i?>" <?if($i==$today_y) echo("selected");?>><?=$i?></option><?}?></select>&nbsp;년&nbsp;&nbsp;
						<select name="end_mon" class="form-control2"> <? for($i=1;$i<13;$i++){if(strlen($i)==1)$i="0".$i; $today_m=date("m", $row->end_day);?><option value="<?=$i?>" <?if($i==$today_m) echo("selected");?>><?=$i?></option><?}?></select>&nbsp;월&nbsp;&nbsp;
						<select name="end_day" class="form-control2"><? for($i=1;$i<32;$i++){if(strlen($i)==1)$i="0".$i; $today_d=date("d", $row->end_day);?><option value="<?=$i?>" <?if($i==$today_d) echo("selected");?>><?=$i?></option><?}?></select>&nbsp;일
					</td>
				</tr>

				<tr>
					<th>팝업창 사이즈</th>
					<td>
						<input name="width" type="text" class="form-control2" style="width:100px" <?=$style->colorAlign("#000000", 0);?> <?=$style->strCheck(0);?> value="<?=$row->width;?>"> 가로 X 
						<input name="height" type="text" class="form-control2" style="width:100px" <?=$style->colorAlign("#000000", 0);?> <?=$style->strCheck(0);?> value="<?=$row->height;?>"> 세로 &nbsp;&nbsp;&nbsp;(새로운 창의 크기를 설정해주세요)
					</td>
				</tr>

				<tr>
					<th>팝업창 위치</th>
					<td>
						<input name="tops" type="text" class="form-control2" style="width:100px" <?=$style->colorAlign("#000000", 0);?> <?=$style->strCheck(0);?> value="<?=$row->tops;?>"> Top 
						<input name="lefts" type="text" class="form-control2" style="width:100px" <?=$style->colorAlign("#000000", 0);?> <?=$style->strCheck(0);?> value="<?=$row->lefts;?>"> Left &nbsp;&nbsp;&nbsp;(새로운 창의 위치를 설정해주세요)</td>
				</tr>

				<tr>
					<th>브라우져 타이틀바</th>
					<td><input name="title_bar" type="text" class="form-control" value="<?=$row->title_bar;?>"> &nbsp;간단한 설명</td>
				</tr>

				<tr>
					<th>쿠키 설정</th>
					<td>
						<label class="radio-inline"><input type="radio" name="live" value="0" <? if( $row->live == 0 ) { echo("checked");}?>>※ 오늘은 이창을 다시 띄우지 않음</label>&nbsp;
						<label class="radio-inline"><input type="radio" name="live" value="1" <? if( $row->live == 1 ) { echo("checked");}?>>※ 이창은 다시는 띄우지 않음</label>
					</td>
				</tr>

				<tr id="popup_view" style="display:none;">
					<th>링크URL</th>
					<td>HTTP://<input name="link_url" type="text" class="form-control" value="<?=$row->link_url;?>"></td>
				</tr>

				<tr id="popup_view" style="display:none;">
					<th>출력 이미지</th>
					<td>
						<input name="popup_images" type="file" >
						<? if( $row->popup_images) { ?> 
							<a href="javascript:imagesView( '<?=$row->idx;?>', '<?=$popup_width;?>', '<?=$popup_height;?>' );" class="glyphicon glyphicon-picture btn btn-default" aria-hidden="true"> View</a>
						<? }?>&nbsp;
					</td>
				</tr>

				<tr id="popup_view" style="display:none;">
					<td colspan=2>
						<textarea id="contents_source" style="display:none;"><?=$row->content;?></textarea>
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



<!-- <textarea id="tx_load_content" cols="80" rows="10" style="display:none;"><?=$row->content;?></textarea> -->


<script src="/webeditor/webeditor_config.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
<!--

function saveContent() {
	Editor.save(); // 이 함수를 호출하여 글을 등록하면 된다.
}
	function validForm(editor) {




		var validator = new Trex.Validator();
		var content = editor.getContent();


		return true;
	}

	function clearContent() {
	$("#contents_validate").empty();
	Editor.modify({ content: " ", attachments: [] });
}



	//-->
</script>

<script type="text/javascript">
	function loadContent() {
		var attachments = {};
		attachments['image'] = [];

		attachments['file'] = [];


		Editor.modify({
			"attachments": function () {
				var allattachments = [];
				for (var i in attachments) {
					allattachments = allattachments.concat(attachments[i]);
				}
				return allattachments;
			}(),
			"content": document.getElementById("tx_load_content")
		});
	}
	loadContent();
</script>


<? include('../footer.php');?>
