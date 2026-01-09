<? $mod=menu09 ?>
<? $menu=1 ?>
<?
include("../header.php");
include($ROOT_DIR."/lib/page_class.php");
?>
<?
$query = "select * from cs_online where 1";
if($key){ $query.=" and $keyfield like '%$key%'"; }
$query.=" order by idx desc";
$rs = mysql_query($query);
$count = mysql_num_rows($rs);
$rows = 10;

	if (empty($start)) $start=0;
	$end = $start+$rows;
	$end = min($count,$end);
	
	$total = ceil(($count)/$rows);
	$current = ceil(($start+1)/$rows);

?>


<script language="JavaScript">
<!--
function dele(text,text1){

	ans = confirm("\n정말 지우시겠습니까?");
	
	if(ans==true){
	location.href="online_del.php?number="+text+"&start="+text1+"";
	}
}

function send(form){


	
		var count=0;
	
		for(var i=0; i<form.elements.length; i++) 
		{ 
			if(form.elements[i].checked == true) 
			{ 
				count++; 
			} 
		} 
		
		if ( count == 0 ) 
		{ 
			   alert('삭제할것을 체크하세요'); 
			   return; 
		} else {
	
			ans = confirm("\n정말 삭제 하시겠습니까?");
			
			if(ans==true){
				
				form.action = "online_del.php?start=<? echo $start ?>&key=<? echo $key ?>&keyfield=<? echo $keyfield ?>";
				form.submit();
			}
		}

	

}
// -->
</script>

<!-- 검색 -->
<script language=javascript>
	<!--
	function search(form){
		val = formch.key.value;
	l = val.length;
	len = l + 1;
	for(i=1;i < len;i++) {
		temp = val.substring(i-1,i);
		if (temp == " ") l = l -1;
	}
	if (l < 1) { 
		alert("\n검색어를 입력하세요.");
		formch.key.focus();
		return;
	}
	
	
	formch.submit();
}  
	-->
	</script>

</head>


			<div>
				<h3 class="page-header">온라인 신청서</h3>
			</div>

<!-- 검색 -->	
		<form name="formch" action="online_list.php" method="post" class="form-inline">
			<div class="well well-small">
				<table >
					<tr>
						<td width="500px;">
							<select name="keyfield" class="form-control">
								<option value="title">제목</option>
								<option value="content">내용</option>
							</select>
							<input type="text" name="key" class="form-control" placeholder="Search"/>
							<button style="submit" class="btn btn- btn-primary" title="검색" onClick="search(this.form);return false;"> <span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
						</td>
					</tr>
				</table>
			</div>
		</form>
<!-- 검색종료 -->

			<table class="table table-bordered table-hover ">
					<caption></caption>
							<colgroup>
								<col width="5%">
								<col width="5%">
								<col width="*">
								<col width="10%">
								<col width="10%">
								<col width="10%">
							</colgroup>
						<thead>

						<tr>
							<th></th>
							<th>N O</th>
							<th>회사명</th>
							<th>성 명</th>
							<th>연락처</th>
							<th>작성일</th>
						</tr>
					</thead>
					<tbody>


				<form method="post" name="form">
		<?   
		
		
			$i = 1;
			if ($count > 1) mysql_data_seek($rs,$start);
			
			$n = $count - ($rows*($current-1));
			$odate = date("Y-m-d");
			
			for ($for2count=$start;$for2count<$end;$for2count++)
													
			{
				
			$row = mysql_fetch_array($rs);
			$date1 = substr($row[udate],0,-9);
		?>

		<tr>
			  <td class="text-center"><input type=checkbox value="<? echo $row[idx] ?>" name=check[]></td>
			  <td class="text-center"><? echo $n ?></td>
			  <td><a href="online_read.php?idx=<? echo $row[idx] ?>&start=<? echo $start ?>&key=<? echo $key ?>&keyfield=<? echo $keyfield ?>"><? echo $row[company] ?></a><? if($odate==$date1){ ?>&nbsp;<span class="label label-danger">New</span><? } ?></td>
			  <td class="text-center"><? echo $row[name] ?></td>
			  <td class="text-center"><? echo $row[tel1] ?> - <? echo $row[tel2] ?> - <? echo $row[tel3] ?></td>
			  <td class="text-center"><? echo $date1 ?></td>
		</tr>
	                    
		<? 
			$i = $i + 1;
			$n = $n - 1;
			} 
		?>
				</tbody>
			</table>
		
				




<div align="center">
	<nav>
	  <ul class="pagination">

		<?
				   //echo "현재 =".$current." 전체=".$total."<br>";
				   $cur = ceil(($current)/10); //현재 페이지가 10페이지 단위로 짤랐을 때 몇번째인지 구한다.
				   $tot = ceil(($total+1)/10);  //전체 페이지가  10페이지 단위로 짤랐을 때 몇페이지인가 구한다.
				   
				   $liststart = $cur*10-9; 
				   $listend = $liststart +10;
				   if($listend > $total+1) $listend = $total+1;
				   //echo "시작=".$liststart." 끝=".$listend."<br>";
				   
				   if ($cur>1) echo "<li><a href=\"online_list.php?key=$key&keyfield=$keyfield&start=".(($cur-1)*$rows*9)."&n=".($i*10-9)."&code=$code&flag=$flag\"><span aria-hidden='true'>&laquo;</span></a></li>";
				   for($i=$liststart;$i<$listend;$i++) {
				      if($i==$current) echo " <li class='active'><a href='#none'>$i</a></li>";
				      else {
				          echo "<li><a href=\"online_list.php?key=$key&keyfield=$keyfield&start=".($i-1)*$rows."&n=".($i*10-9)."&code=$code&flag=$flag\">$i</a></li>";
				      }
				   }
				   
				   if ($cur<$tot) echo "<li><a href=\"online_list.php?key=$key&keyfield=$keyfield&start=".(($i-1)*$rows)."&n=".($i*10-9)."&code=$code&flag=$flag\"><span aria-hidden='true'>&raquo;</span></li>";
				   
		mysql_close();
		?>		 

		 </ul>
	</nav>
</div>




		<table style="width:100%;" >
			<tr>
				<td align="left">
					<button type="submit" class="btn btn-danger" onClick="send(this.form);return false;">삭제</button>
				</td>
				<td align="right">
					<a href="online_list.php" class="btn btn-primary">목록</a>
				</td>
			</tr>
		</table>
	

	 </div>
</div>

</form>


		<!-- ############# 리스트 끝 ########### -->
       <? include('../footer.php');?>       