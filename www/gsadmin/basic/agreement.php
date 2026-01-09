<? $mod=menu01 ?>
<? $menu=2?>
<?
include('../header.php'); 

// 기본 관리자 정보 불러오기.
$bbs_stat = $db->object("cs_page", "where page_index='agreement'");
?>

<script language="javascript">
<!--
// 폼 전송
function sendit() {
	var form=document.tx_editor_form;
	if(form.agreement.value!="") {
		alert("개인정보 취급방침 내용을 입력해 주세요.");
		form.agreement.focus();
	} else {
		form.submit();
	}
}
//-->
</script>

<!-- 에디터 스크립트 -->
<?include $_SERVER['DOCUMENT_ROOT']."/gsadmin/basic/in_editor_script.php";?>	


<h3 class="page-header">이용약관</h3>


	<form name="tx_editor_form" id="tx_editor_form" action="agreement_ok.php" method="post" enctype="multipart/form-data">
		<input type="hidden" name="sum_img" value="">

		<table class="table table-bordered">
			<tr>
				<th>
					<!-- 에디터 폼-->
					<?include $_SERVER['DOCUMENT_ROOT']."/gsadmin/basic/in_editor_form.php";?>
				</th>
			</tr>
		</table>

		<table class="table">
			<tr>
				<td class="text-right"><button type="submit" onClick="Editor.save();" class="btn btn-primary">저장하기</button></td>
			</tr>
		</table>

	</form>


<? include('../footer.php');?>