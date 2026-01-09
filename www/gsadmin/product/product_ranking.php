<?
$menu = "04";
include "../../common.php";
if($_GET[hidden_goods_list]) {
	$arr_goods_list = explode("&&", $_GET[hidden_goods_list] );
	foreach($arr_goods_list as $key=>$val) {
		if($val) $db->update('cs_goods','ranking='.$key.' where idx='.$val);
	}
}
?>
<HTML>
<HEAD>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<TITLE>&nbsp;상품순위설정 </TITLE>
<script language="JavaScript">
<!--
// 순위 변경 ( up or down )
function cateMove(index,to)
{
	var list = index;
	var total = list.length-1;
	var index = list.selectedIndex;

	if (index==-1){
		alert("상품을 선택하세요.");
		return;
	}
	
	if (to == +1 && index == total) return alert('이동이 불가능합니다');
	if (to == -1 && index == 0) return alert('이동이 불가능합니다');
	
	var items = new Array;
	var values = new Array;
	
	for (i = total; i >= 0; i--) {
		items[i] = list.options[i].text;
		values[i] = list.options[i].value;
	}
		
	for (i = total; i >= 0; i--) {
		if (index == i) {
			list.options[i + to] = new Option(items[i],values[i], 0, 1);
			list.options[i] = new Option(items[i + to], values[i + to]);
			i--;
		}
		else
		{
			list.options[i] = new Option(items[i], values[i]);
		}
	}
	return;
}

// 옵션 데이타 입력
function dataInput() {
	var form=document.myform;
	var data_cnt=0;
	form.hidden_goods_list.value="";
	for( data_cnt=0; data_cnt < form.goods_list.length; data_cnt ++) {
		form.hidden_goods_list.value =form.hidden_goods_list.value + form.goods_list.options[data_cnt].value;
		form.hidden_goods_list.value= form.hidden_goods_list.value + "&&";
	}
}

// 폼 전송
function sendit(f) {
	if(confirm("정말 저장하시겠습니까?")) {
		dataInput();
		f.submit();
	}
}

//-->
</script>
</HEAD>
<link href="../codeshop.css" rel="stylesheet" type="text/css">
<body bgcolor="FFFFFF" text="000000" leftmargin="0" topmargin="0">
<table width="100%" height="" border="0" cellpadding="0" cellspacing="0">
<form action="?" method="get" name="myform">
<input type="hidden" name="hidden_goods_list">
<input type="hidden" name="part_idx" value="<?=$_GET[part_idx];?>">
<tr>
	<td height="65" valign="top"><img src="../images/bar_pd_rank.gif"></td>
</tr>
<tr>
	<td align="center"><select name="goods_list" size="20" style="width:300;" class="input">
	<?
	$no=0;
	$result=$db->select("cs_goods", "where part_idx=$_GET[part_idx] order by ranking asc","idx,name,ranking");
	while($row=mysql_fetch_object($result)) {
		++$no;
	?>
	<option value="<?=$row->idx;?>"><?=$no;?> : <?=$row->name;?></option>
	<?}?>
	</select></td>
</tr>
<tr>
	<td align="right" height="33"><a href="javascript:cateMove(document.myform.goods_list,-1);;"><img src="../images/bt_up.gif" width="19" height="19" border=0></a>&nbsp;<a href="javascript:cateMove(document.myform.goods_list,1);"><img src="../images/bt_down.gif" width="19" height="19" border=0></a>&nbsp;&nbsp;&nbsp;<a href="javascript:sendit(document.myform);"><img src="../images/bt_up_save.gif"  border=0></a>&nbsp;&nbsp;&nbsp;</td>
</tr>
</form>
</table>
</BODY>
</HTML>
