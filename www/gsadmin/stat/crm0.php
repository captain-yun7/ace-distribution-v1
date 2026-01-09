<? include('../header.php');?>

<table width="851" border="0" align="center" cellpadding="0" cellspacing="0">
	<tr> 
		<td width="1" rowspan="8" bgcolor="BDBEBD"></td>
		<td height="150" align="center" valign="top" bgcolor="#FFFFFF" class="menu"><br><img src="../images/title_crm_1.jpg" width="800" height="70">
			<table width="800" border="0" cellspacing="0" cellpadding="0">
				<tr> 
					<td height="25"><img src="../images/bar_crma.gif" alt="상품별매출통계"></td>
				</tr>
			</table>
			<? 
			if(file_exists('../../data/csv/crm0.csv')) { unlink('../../data/csv/crm0.csv');    }  // 만일 이전에 만든 화일이 있으면 지운다 
			$newline = chr(10);            //  LF(줄바꿈)의 ascii 값을 얻는다. 
			$fp = fopen( "../../data/csv/crm0.csv", "w" ) or die("../../data/csv/crm0.csv 화일을 열수 없습니다") ;  // crm0.csv 를 새로 연다 
			fwrite($fp,"번호, 제품명, 제품번호, 소비자가격, 쇼핑몰가격, 조회수");		 //  타이틀 쓰고 
			fwrite($fp,$newline);                     //  줄바꾸기 
			?>
			
			<table width="800" border="1" cellspacing="0" cellpadding="3" class="menu" bordercolor='#BDBEBD' style='border-collapse: collapse'>
				<tr bgcolor="EFEFEF"> 
					<td height="25" align="center">No</td>
					<td height="25" align="center">제품명</td>
					<td height="25" align="center">제품번호</td>
					<td height="25" align="center">소비자가격</td>
					<td height="25" align="center">쇼핑몰가격</td>
					<td height="25" align="center">조회수</td>
				</tr>
				<?
				$result		    = $db->select("cs_goods", "order by click desc" );
				while( $row = @mysql_fetch_object($result)) {
				?>
				<tr> 
					<td height="25" align="center"><?=++$listNo;?></td>
					<td height="25" align="center"><?=$row->name;?></td>
					<td height="25" align="center"><?=$row->code;?></td>
					<td height="25" align="center"><?=number_format($row->old_price);?></td>
					<td height="25" align="center"><?=number_format($row->shop_price);?></td>
					<td height="25" align="center"><?=number_format($row->click);?></td>
				</tr>
				<?
					fwrite($fp, $listNo.",".$row->name.",".$row->code.",".$row->old_price.",".$row->shop_price.",".$row->click);
					fwrite($fp, $newline);     // 줄 바꾸기             
				}
				fclose($fp); 
				?>
			</table>
				
			<table width="800" border="0" cellspacing="0" cellpadding="0" height="55">
				<tr> 
					<td height="25" align="right"><a href="../../data/csv/crm0.csv"><img src="../images/bt_excell.gif" align="absmiddle" border="0"></a></td>
				</tr>
			</table>
		</td>
		<td width="1" rowspan="8" bgcolor="BDBEBD"></td>
	</tr>
</table>
<? include('../footer.php');?>