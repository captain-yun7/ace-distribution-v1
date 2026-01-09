<? $mod=menu04 ?>
<? $menu=3?>
<?
include('../header.php');
include($ROOT_DIR.'/lib/style_class.php');
include $_SERVER['DOCUMENT_ROOT']."/gsadmin/basic/in_editor_script.php";
$edit_row = $db->object("cs_part", "where idx='$_GET[idx]'"); 
?>


<div>
	<h3 class="page-header">카테고리 기본설정</h3>
</div>

		<table class="table table-bordered">
			<form action="category_edit3_ok.php" method="post" name="part_form" id="tx_editor_form" enctype="multipart/form-data">
			<input type="hidden" name="hidden_part_index" value="3">
			<input type="hidden" name="idx" value="<?=$edit_row->idx;?>">
			<input type="hidden" name="hidden_title_display_images" value="<?=$edit_row->title_display_images;?>">
			<input type="hidden" name="sum_img" value="">

			<thead>
			<caption></caption>
				<colgroup>
					<col width="20%">
					<col width="*">
				</colgroup>


				<tr> 
					<th>카테고리 상태</th>
					<td>&nbsp;&nbsp;3차 카테고리 수정</td>
				</tr>

				<tr> 
					<th>카테고리 이름</th>
					<td>&nbsp;
						<input name="part_name" type="text" class="form-control"  value="<?=$edit_row->part_name?>">&nbsp;&nbsp;카테고리 이름을 적어주세요(예:컴퓨터)
					</td>
				</tr>

				<tr> 
					<th>카테고리 코드</th>
					<td>
					&nbsp;1차 코드&nbsp;<input name="part1_code" type="text" class="form-control" value="<?=$edit_row->part1_code;?>" readonly <? $style->colorAlign('#666666', 0);?>></br>
					&nbsp;2차 코드&nbsp;<input name="part2_code" type="text" class="form-control" value="<?=$edit_row->part2_code;?>" readonly <? $style->colorAlign('#666666', 0);?>></br>
					&nbsp;3차 코드&nbsp;<input name="part3_code" type="text" class="form-control" value="<?=$edit_row->part3_code;?>" readonly <? $style->colorAlign('#666666', 0);?>>
					&nbsp;카테고리 코드는 수정할수 없습니다.
					</td>
				</tr>

				<tr> 
					<th>Category Display </th>
					<td>&nbsp;
						<label class="radio-inline">
							<input type="radio" name="part_display_check" value="0" <? if( $edit_row->part_display_check == 0 ) { echo( 'checked' ); }?>>&nbsp;미사용
						</label>
						<label class="radio-inline">
							<input type="radio" name="part_display_check" value="1" <? if( $edit_row->part_display_check == 1 ) { echo( 'checked' ); }?>>&nbsp;사용
						</label>&nbsp;&nbsp;&nbsp;(사용자 화면에 Display 유무 설정)
					</td>
				</tr>
				
				<tr style="display:none"> 
					<th>내 용</th>
					<td>
						<?include $_SERVER['DOCUMENT_ROOT']."/daumeditor/editor.html";?>
						<textarea id="tx_load_content" cols="80" rows="10" style="display:none;"><?=$edit_row->content;?></textarea>
					</td>
				</tr>

				<table class="table">
					<div style="text-align:right;" class="submitBtn">
						<div class="submitBtnBtn">
							<a href="#" class="btn btn-primary" onClick="Editor.save();">변경하기</a>
						</div>
					</div>
				</table>

			<thead>
		</form>
	</table>


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
		txDecoPath: "/daumeditor/images/deco/contents/", /*본문에 사용되는 이미지 디렉터리, 서비스에서 사용할 때는 완성된 컨텐츠로 배포되기 위해 절대경로로 수정한다. */
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



<script type="text/javascript">
<!--

function saveContent() {
	Editor.save(); // 이 함수를 호출하여 글을 등록하면 된다.
}
	function validForm(editor) {

					if (document.part_form.part_name.value == '') {
					alert('카테고리 이름을 입력해주세요.');
					document.part_form.part_name.focus();
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