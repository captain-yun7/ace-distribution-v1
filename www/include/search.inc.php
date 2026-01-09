<script language="javascript">
<!--
// 메인 로그인
function searchSendit() {
	var form=document.search_form;
	if(form.search.value=="") {
		alert("검색어를 입력해 주십시오.");
		form.search.focus();
	} else {
		form.submit();
	}
}

function searchInputSendit() {
	if(event.keyCode==13) { 
		searchSendit();
	}
}
//-->
</script>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
			<form name="search_form" method="post" action="../product/product_search.php"  onsubmit="searchInputSendit();event.returnValue = false;">
				<tr> 
					<td height="33" align="center"><img src="../images/pd_search.gif" align="absmiddle">&nbsp;<input name="search" type="text" class="box" size="10" onKeyDown="searchInputSendit();" onMouseOut="this.style.backgroundColor='#FFFFFF'" onMouseOver="this.style.backgroundColor='#FAFAFA'"> <a href="javascript:searchSendit();"><img src="../images/bt_search.gif" border="0" align="absmiddle"></a></td>
				</tr>
			</form>
			</table>