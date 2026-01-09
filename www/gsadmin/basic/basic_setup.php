<? $mod=menu01 ?>
<? $menu=1?>
<?include ("../header.php");?>

<SCRIPT LANGUAGE="JavaScript">
<!--
// 입력폼 체크 자바스크립트
function sendit() {
	var form=document.admin_form;

	if(form.admin_userid.value=="") {
		alert("관리자 아이디를 입력해 주세요.");
		form.admin_userid.focus();
	} else if(form.admin_passwd.value=="") {
		alert("관리자 패스워드를 입력해 주세요.");
		form.admin_passwd.focus();

	} else {

		form.submit();
	}
}

//-->
</SCRIPT>

  
          <h3 class="page-header">관리자 계정정보</h3>

			<form action="basic_setup_ok.php" method="post" name="admin_form" id="admin_form" ENCTYPE="multipart/form-data">
				<input type="hidden" name="mode" value="admin" />

				<table class="table table-bordered table-hover">
				 <tbody>

					<tr>
						<th>관리자 아이디</td>
						<td><input name="admin_userid" type="text" maxlength="30" class="form-control col-md-7"   value="<?=$admin_stat->admin_userid;?>"></td>
						<th>관리자 비밀번호</td>
						<td><input name="admin_passwd" type="text" maxlength="30" class="form-control col-md-7" value="<?=$admin_stat->admin_passwd;?>"></td>
					</tr>

					<tr>
						<th>상호</td>
						<td><input name="shop_name" type="text"  maxlength="100" class="form-control col-md-10" value="<?=$admin_stat->shop_name;?>"></td>
						<th>이메일</td>
						<td><input name="shop_email" type="text" maxlength="100" class="form-control col-md-10" value="<?=$admin_stat->shop_email;?>"></td>
					</tr>

					<tr>
						<th>도메인</td>
						<td  colspan="3">HTTP://<input name="shop_domain" type="text" class="form-control col-md-12" maxlength="200" value="<?=$admin_stat->shop_domain;?>" /></td>
					</tr>

					<tr>
						<th>Home경로 URL</td>
						<td colspan="3">HTTP://<input name="shop_url" type="text" class="form-control col-md-12" maxlength="200"  value="<?=$admin_stat->shop_url;?>" /></td>
					</tr>

					<tr>
						<th>스팸문자등록</td>
						<td colspan="3" ><font color="red">구분자는 "|" 입니다.</font><br>
						<textarea name="spam_text" rows="5" class="form-control col-md-12"><?=$admin_stat->spam_text?></textarea></td>
					</tr>

					<tr>
						<th>타이틀</td>
						<td colspan="3" style="text-align:left"><input name="title" type="text" class="form-control col-md-12" value="<?=$admin_stat->title;?>"></td>
					</tr>

					<tr>
						<th>메타태그<br>description</td>
						<td colspan="3" style="text-align:left"><input name="meta_desc" type="text" class="form-control col-md-12" value="<?=$admin_stat->meta_desc;?>"></td>
					</tr>

					<tr>
						<th>메타태그<br>Keywords</td>
						<td colspan="3" style="text-align:left"><input name="meta_keyw" type="text" class="form-control col-md-12" value="<?=$admin_stat->meta_keyw;?>"></td>
					</tr>

					<tr>
						<th>메타태그<br>subject</td>
						<td colspan="3" style="text-align:left"><input name="link_cano" type="text" class="form-control col-md-12" value="<?=$admin_stat->link_cano;?>"></td>
					</tr>

				</tbody>
			</table>


			<table class="table">
				<tr>
					<td colspan="3" class="text-right"><a href="javascript:sendit();" class="btn btn-primary">저장하기</a></td>
				</tr>
			</table>

	</form>


<? include('../footer.php');?>
