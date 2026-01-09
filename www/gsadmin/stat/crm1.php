<? include('../header.php');?>

<table width="851" border="0" align="center" cellpadding="0" cellspacing="0">
	<tr> 
		<td width="1" rowspan="8" bgcolor="BDBEBD"></td>
		<td height="150" align="center" valign="top" bgcolor="#FFFFFF" class="menu"><br><img src="../images/title_crm_a.jpg" width="800" height="70">
			<table width="800" border="0" cellspacing="0" cellpadding="0">
				<tr> 
					<td height="25"><img src="../images/bar_crm1.gif" alt="상품별매출통계"></td>
				</tr>
			</table>
			<? 
			if(file_exists('../../data/csv/crm1.csv')) { unlink('../../data/csv/crm1.csv');    }  // 만일 이전에 만든 화일이 있으면 지운다 
			$newline = chr(10);            //  LF(줄바꿈)의 ascii 값을 얻는다. 
			$fp = fopen( "../../data/csv/crm1.csv", "w" ) or die("../../data/csv/crm1.csv 화일을 열수 없습니다") ;  // crm1.csv 를 새로 연다 
			fwrite($fp,"번호, 제품명, 제품번호, 판매가격, 판매수량, 판매금액");		 //  타이틀 쓰고 
			fwrite($fp,$newline);                     //  줄바꾸기 
			?>
			<table width="800" border="1" cellspacing="0" cellpadding="3" class="menu" bordercolor='#BDBEBD' style='border-collapse: collapse'>
				<tr bgcolor="EFEFEF"> 
					<td height="25" align="center">No</td>
					<td height="25" align="center">제품명</td>
					<td height="25" align="center">제품번호</td>
					<td height="25" align="center">판매가격</td>
					<td height="25" align="center">판매수량</td>
					<td height="25" align="center">판매금액</td>
					<td height="25" align="center">그래프(%)</td>
				</tr>
				<?
				$total_price = $db->sum("cs_trade_goods inner join cs_trade USING(trade_code)", "where cs_trade.trade_stat=4", "(cs_trade_goods.goods_price*cs_trade_goods.goods_cnt)");
				$result		    = $db->result( "select (sum(goods_cnt)*goods_price), goods_price,  sum(goods_cnt), goods_name, goods_code from cs_trade_goods inner join cs_trade USING(trade_code) where cs_trade.trade_stat=4 group by goods_code order by 1 desc" );
				while( $row = @mysql_fetch_array($result)) {
					$percent = intval(($row[0] / $total_price) * 10000 ) / 100;
				?>
				<tr> 
					<td height="25" align="center"><?=++$listNo;?></td>
					<td height="25" align="center"><?=$row[3];?></td>
					<td height="25" align="center"><?=$row[4];?></td>
					<td height="25" align="center"><?=number_format($row[1]);?></td>
					<td height="25" align="center"><?=number_format($row[2]);?></td>
					<td height="25" align="center"><?=number_format($row[0]);?></td>
					<td height="25">
						<table width="80" height="17" border="0" cellpadding="0" cellspacing="0" class="menupurple">
							<tr> 
								<td width="<?=$percent;?>" background="../images/graph.gif"></td>
								<td align="center">&nbsp;<?=round($percent);?>% </td>
							</tr>
						</table>
					</td>
				</tr>
				<?
					fwrite($fp, $listNo.",".$row[3].",".$row[4].",".$row[1].",".$row[2].",".$row[0]);
					fwrite($fp, $newline);     // 줄 바꾸기             
				}
				fclose($fp); 
				?>
			</table>
			
			<table width="800" border="0" cellspacing="0" cellpadding="0" height="55">
				<tr> 
					<td height="25" align="right"><a href="../../data/csv/crm1.csv"><img src="../images/bt_excell.gif" align="absmiddle" border="0"></a></td>
				</tr>
			</table>
		</td>
		<td width="1" rowspan="8" bgcolor="BDBEBD"></td>
	</tr>
</table>
<? include('../footer.php');?>