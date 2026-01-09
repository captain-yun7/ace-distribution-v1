<? include('../header.php');?>

<table width="851" border="0" align="center" cellpadding="0" cellspacing="0">
	<tr> 
		<td width="1" rowspan="8" bgcolor="BDBEBD"></td>
		<td height="150" align="center" valign="top" bgcolor="#FFFFFF" class="menu"><br><img src="../images/title_crm_2.jpg" width="800" height="70"> 
			<table width="800" border="0" cellspacing="0" cellpadding="0">
				<tr> 
					<td height="25"><img src="../images/bar_crmb.gif" alt="우수고객"></td>
				</tr>
			</table>
			<? 
			if(file_exists('../../data/csv/crm4.csv')) { unlink('../../data/csv/crm4.csv');    }  // 만일 이전에 만든 화일이 있으면 지운다 
			$newline = chr(10);            //  LF(줄바꿈)의 ascii 값을 얻는다. 
			$fp = fopen( "../../data/csv/crm4.csv", "w" ) or die("../../data/csv/crm4.csv 화일을 열수 없습니다") ;  // crm4.csv 를 새로 연다 
			fwrite($fp,"지역, 구매수, 구매금액");		 //  타이틀 쓰고 
			fwrite($fp,$newline);                     //  줄바꾸기 
			?>
			<table width="800" border="1" cellspacing="0" cellpadding="3" class="menu" bordercolor='#BDBEBD' style='border-collapse: collapse'>
				<tr bgcolor="#EFEFEF"> 
					<td height="25" align="center">지역</td>
					<td align="center">판매량</td>
					<td align="center">판매금액</td>
					<td width="300" align="center">그래프(가격대비)</td>
				</tr>
				<?
				$arrArea=Array("서울","부산","대구","인천","광주","대전","울산","경기","강원","충청북","충청남","경상북","경상남","전라북","전라남","제주");
				$strArrArea=Array("서 울","부 산","대 구","인 천","광 주","대 전","울 산","경 기","강 원","충 북","충 남","경 북","경 남","전 북","전 남","제 주");
				$total_trade_price=$db->sum("cs_trade", "where trade_stat=4", "trade_price");
				$total_trade_cnt=0;
				$total_trade_price=0;
				for($i=0;$i<count($arrArea);$i++) {
					$trade_cnt=0;
					$trade_price=0;
					$result=$db->result("select trade_price from cs_trade where trade_stat=4 and deliv_add1 like '$arrArea[$i]%'");
					while($area_row=@mysql_fetch_array($result)) {
						$trade_cnt++;
						$trade_price+=$area_row[0];
					}
					$total_trade_cnt+=$trade_cnt;
					$total_trade_price+=$trade_price;
					
					if($total_trade_price==0) { $wid=2;	} else { $wid=intval($trade_price/$total_trade_price)*300;	if($wid==0) $wid=2;}
				?>
				<tr>
					<td height="25" align="center"><b><?=$strArrArea[$i];?></b></td>
					<td align="right"><?=number_format($trade_cnt);?> 건</td>
					<td align="right"><?=number_format($trade_price);?> 원</td>
					<td width="300"><img src="../images/graph1.gif" height="22" width="<?=$wid;?>"></td>
				</tr>
				<?
					fwrite($fp, $strArrArea[$i].",".$trade_cnt.",".$trade_price);
					fwrite($fp, $newline);     // 줄 바꾸기             
				}
				fclose($fp); 
				?>
				<tr bgcolor="#EFEFEF">
					<td height="30" align="center" colspan="4"><b>총 : <font size="3" color="#FF0000"><?=number_format($total_trade_cnt)?></font> 건에  &nbsp;합 계 : <font size="3" color="#FF0000"><?=number_format($total_trade_price)?></font> 원입니다.</b></td>
				</tr>
			</table>
			<table width="800" border="0" cellspacing="0" cellpadding="0" height="55">
				<tr> 
					<td height="25" align="right"><a href="../../data/csv/crm4.csv"><img src="../images/bt_excell.gif" align="absmiddle" border="0"></a></td>
				</tr>
			</table>
		</td>
		<td width="1" rowspan="8" bgcolor="BDBEBD"></td>
	</tr>
</table>
<? include('../footer.php');?>