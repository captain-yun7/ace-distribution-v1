<? include('../header.php');?>

<table width="851" border="0" align="center" cellpadding="0" cellspacing="0">
	<tr> 
		<td width="1" rowspan="8" bgcolor="BDBEBD"></td>
		<td height="150" align="center" valign="top" bgcolor="#FFFFFF" class="menu"><br><img src="../images/title_crm_d.jpg" width="800" height="70"> 
			<table width="800" border="0" cellspacing="0" cellpadding="0">
				<tr> 
					<td height="25"><img src="../images/bar_crm4.gif" alt="우수고객"></td>
				</tr>
			</table>
			<? 
			if(file_exists('../../data/csv/crm3.csv')) { unlink('../../data/csv/crm3.csv');    }  // 만일 이전에 만든 화일이 있으면 지운다 
			$newline = chr(10);            //  LF(줄바꿈)의 ascii 값을 얻는다. 
			$fp = fopen( "../../data/csv/crm3.csv", "w" ) or die("../../data/csv/crm3.csv 화일을 열수 없습니다") ;  // crm3.csv 를 새로 연다 
			fwrite($fp,"번호, 회원아이디, 이름, 구매횟수, 구매금액, 사용포인트, 적립포인트, 접속수");		 //  타이틀 쓰고 
			fwrite($fp,$newline);                     //  줄바꾸기 
			?>
			<table width="800" border="1" cellspacing="0" cellpadding="3" class="menu" bordercolor='#BDBEBD' style='border-collapse: collapse'>
				<tr bgcolor="EFEFEF"> 
					<td height="25" align="center">No</td>
					<td height="25" align="center">회원아이디</td>
					<td height="25" align="center">이름</td>
					<td height="25" align="center">구매횟수</td>
					<td height="25" align="center">구매금액</td>
					<td height="25" align="center">사용포인트</td>
					<td height="25" align="center">적립포인트</td>
					<td height="25" align="center">접속수</td>
				</tr>
				<?
				$result=$db->result("select sum(t.trade_price), t.order_userid, t.order_name, count(*), m.connect, sum(t.trade_use_point), sum(t.trade_save_point) from cs_trade t, cs_member m where order_userid is not null and t.order_userid=m.userid group by order_userid order by 1 desc");
				while($row=mysql_fetch_array($result)) {
				?>
				<tr> 
					<td height="25" align="center"><?=++$listNo;?></td>
					<td height="25" align="center"><?=$row[1];?></td>
					<td height="25" align="center"><?=$row[2];?></td>
					<td height="25" align="center"><?=number_format($row[3]);?></td>
					<td height="25" align="center"><?=number_format($row[0]);?></td>
					<td height="25" align="center"><?=number_format($row[5]);?></td>
					<td height="25" align="center"><?=number_format($row[6]);?></td>
					<td height="25" align="center"><?=number_format($row[4]);?></td>
				</tr>
				<?
					fwrite($fp, $listNo.",".$row[1].",".$row[2].",".$row[3].",".$row[0].",".$row[5].",".$row[6].",".$row[4]);
					fwrite($fp, $newline);     // 줄 바꾸기             
				}
				fclose($fp); 
				?>
			</table>
			
			<table width="800" border="0" cellspacing="0" cellpadding="0" height="55">
				<tr> 
					<td height="25" align="right"><a href="../../data/csv/crm3.csv"><img src="../images/bt_excell.gif" align="absmiddle" border="0"></a></td>
				</tr>
			</table>
		</td>
		<td width="1" rowspan="8" bgcolor="BDBEBD"></td>
	</tr>
</table>
<? include('../footer.php');?>