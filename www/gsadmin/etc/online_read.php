<? $mod=menu09 ?>
<? $menu=1 ?>
<?
include("../header.php");
include($ROOT_DIR."/lib/page_class.php");
?>
<?
$query = "select * from cs_online where idx=$idx";
$rs = mysql_query($query);
$row = mysql_fetch_array($rs);

$row[content]=ereg_replace("\n","<br>",$row[content]);
$row[content] = stripslashes($row[content]);
?>


	<div>
		<h3 class="page-header">온라인 신청서</h3>
	</div>


		<table class="table table-bordered table-hover ">
			<tbody>
				<colgroup>
					<col width="20%">
					<col width="80%">
				</colgroup>

				<tr>
					<th>접수일</th>
					<td><? echo $row[udate] ?></td>
				</tr>
				<tr>
					<th>회사명</th>
					<td><? echo $row[company] ?></td>
				</tr>
				<tr>
					<th>성 명</th>
					<td><? echo $row[name] ?></td>
				</tr>
				<tr>
					<th>이메일</th>
					<td><? echo $row[email] ?></td>
				</tr>
				<tr>
					<th>연락처</th>
					<td><? echo $row[tel1] ?> - <? echo $row[tel2] ?> - <? echo $row[tel3] ?></td>
				</tr>
				<tr>
					<th>내 용</th>
					<td><? echo $row[content] ?></td>
				</tr>

				<tr> 
					<th>첨부</th>
					<td>
						<? if( $row[file] != "" )  { $file = $row[file]; ?><a href="download.php?idx=<?=$row[idx]?>&download=1"><?=$file?></a><? } else {	echo("자료 미등록");	}  ?>
					</td>
				</tr>

		</tbody>
	</table>


			<div class="submitBtn" style="text-align:right;" >
				<div class="submitBtnBtn">
					<a href="online_list.php?start=<? echo $start ?>&key=<? echo $key ?>&keyfield=<? echo $keyfield ?>" class="btn btn-primary">목록</a>
				</div>
			</div>


      <!-- ############# 글보기 끝 ########### -->
<? include('../footer.php');?>
      
