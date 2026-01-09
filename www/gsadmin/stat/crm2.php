<?
include('../header.php');
$_GET=&$HTTP_GET_VARS;
if(!$_GET[date]) { $_GET[date] =1;}

$year_max= $db->row("cs_trade", "", "max(left(trade_day, 4))");
$year_min= $db->row("cs_trade", "", "min(left(trade_day, 4))");

?>
<script language="javascript">
<!--
function sendit() {
	var form=document.search_form;
	form.submit();
}

function showMon(){
	var form=document.search_form;
	if(form.year.selectedIndex >0) {
		form.mon.style.display="";
	} else {
		form.mon.style.display="none";
		form.mon.selectedIndex=0;
	}
}
//-->
</script>

<table width="851" border="0" align="center" cellpadding="0" cellspacing="0">
	<tr> 
		<td width="1" rowspan="8" bgcolor="BDBEBD"></td>
		<td height="150" align="center" valign="top" bgcolor="#FFFFFF" class="menu"><br><img src="../images/title_crm_b.jpg" width="800" height="70">
			<table width="800" border="0" cellspacing="0" cellpadding="0">
				<tr> 
					<td height="25"><img src="../images/bar_crm2.gif" alt="기간별매출통계"></td>
				</tr>
			</table>
			<table width="800" border="0" cellpadding="0" cellspacing="0">
				<form method=get action="<?=$_SERVER[PHP_SELF];?>" name="search_form">
				<input type="hidden" name="date" value="5">						
				<tr> 
					<td height="35" class="menu">
						<img src="../images/bt_period.gif" border="0" align="absmiddle">
						<select name="year" onChange="javascript:showMon();" class='input'>
						<option value="0" selected>연도별</option>
						<? for($year_go=$year_min[0]; $year_go<=$year_max[0]; $year_go++){?>
						<option value="<?=$year_go?>" <? if($_GET[year] == $year_go) echo('selected');?>><?=$year_go?>년</option>
						<?}?>
						</select>
						<select name="mon" id="mon" style="display:none" class='input'>
						<option value="0" selected>월별</option>
						<? for($mon_go=1;$mon_go<13;$mon_go++){?>
						<option value="<?=$mon_go?>" <? if($_GET[mon] == $mon_go) echo('selected');?>><?=$mon_go?>월</option>
						<?}?>
						</select>
						<a href="javascript:sendit();"><img src='../images/bt_sc.gif' border='0' align='absmiddle'></a>&nbsp;&nbsp;&nbsp;<a href="<?=$_SERVER[PHP_SELF];?>?date=4"><img src="../images/bt_day2.gif" border="0" align="absmiddle"></a>
					</td>
				</tr>
				</form>
			</table>
			
			<?
			// 판매완료한 총 구매수
			$total_trade_cnt=$db->cnt("cs_trade", "where trade_stat=4");
			// 판매완료한 총 구입금액
			$total_trade_price=$db->sum("cs_trade", "where trade_stat=4", "trade_price");
			?>
			<?
			if($_GET[date]==1) {
				$result=$db->result("select left(trade_day, 4), count(idx), sum(trade_price), count(order_userid) from cs_trade where trade_stat=4 group by left(trade_day, 4)");	
				
				if(file_exists('../../data/csv/crm2.csv')) { unlink('../../data/csv/crm2.csv');    }  // 만일 이전에 만든 화일이 있으면 지운다 
				$newline = chr(10);            //  LF(줄바꿈)의 ascii 값을 얻는다. 
				$fp = fopen( "../../data/csv/crm2.csv", "w" ) or die("../../data/csv/crm2.csv 화일을 열수 없습니다") ;  // crm2.csv 를 새로 연다 
				fwrite($fp,"연도, 판매수, 구매금액, 구매자정보");		 //  타이틀 쓰고 
				fwrite($fp,$newline);                     //  줄바꾸기 
			?>
			<table width="800" border="1" cellspacing="0" cellpadding="3" class="menu" bordercolor='#BDBEBD' style='border-collapse: collapse'>
				<tr bgcolor="EFEFEF"> 
					<td height="25" align="center">연도</td>
					<td height="25" align="center">판매수</td>
					<td height="25" align="center">구매금액</td>
					<td height="25" align="center">구매자정보</td>
					<td width="300" height="25" align="center" bgcolor="EFEFEF">판매수/구매금액 그래프</td>
				</tr>
				<?
				while($row = @mysql_fetch_array( $result )) {
					$no_cnt=$row[1]-$row[3]; 
				?>
				<tr> 
					<td height="25" align="center"><?=$row[0];?></td>
					<td height="25" align="center"><?=number_format($row[1]);?></td>
					<td height="25" align="center"><?=number_format($row[2]);?></td>
					<td height="25" align="center">회원(<?=number_format($row[3]);?>), 비회원(<?=number_format($no_cnt);?>)</td>
					<td width="300" height="25">
						<table width="" height="25" border="0" cellpadding="0" cellspacing="0" class="menupurple">
							<tr> 
								<td height="12"><img src="../images/graph2.gif" height="11" width="<?= intval( $row[1] / $total_trade_cnt * 10000 ) / 100*3;?>"></td>
							</tr>
							<tr> 
								<td height="12"><img src="../images/graph1.gif" height="11" width="<?= intval( $row[2] / $total_trade_price * 10000 ) / 100*3;?>"></td>
							</tr>
						</table>
					</td>
				</tr>
				<?
					fwrite($fp, $row[0].",".$row[1].",".$row[2].","."회원(".$row[3].")"." / "."비회원(".$no_cnt.")");
					fwrite($fp, $newline);     // 줄 바꾸기             
				}
				fclose($fp); 
				?>
			</table>
			
			<?
			} else if($_GET[date]==2) {
				$result=$db->result("select substring(trade_day, 6, 2), count(idx), sum(trade_price), count(order_userid) from cs_trade where trade_stat=4 group by substring(trade_day, 6, 2)");
				
				if(file_exists('../../data/csv/crm2.csv')) { unlink('../../data/csv/crm2.csv');    }  // 만일 이전에 만든 화일이 있으면 지운다 
				$newline = chr(10);            //  LF(줄바꿈)의 ascii 값을 얻는다. 
				$fp = fopen( "../../data/csv/crm2.csv", "w" ) or die("../../data/csv/crm2.csv 화일을 열수 없습니다") ;  // crm2.csv 를 새로 연다 
				fwrite($fp,"월별, 판매수, 구매금액, 구매자정보");		 //  타이틀 쓰고 
				fwrite($fp,$newline);                     //  줄바꾸기 
			?>
			<table width="800" border="1" cellspacing="0" cellpadding="3" class="menu" bordercolor='#BDBEBD' style='border-collapse: collapse'>
				<tr bgcolor="EFEFEF"> 
					<td height="25" align="center">월별</td>
					<td height="25" align="center">판매수</td>
					<td height="25" align="center">구매금액</td>
					<td height="25" align="center">구매자정보</td>
					<td width="300" height="25" align="center" bgcolor="EFEFEF">판매수/구매금액 그래프</td>
				</tr>
				<?
				while( $row = @mysql_fetch_array( $result )) {
					$no_cnt=$row[1]-$row[3]; 
				?>
				<tr> 
					<td height="25" align="center"><?=$row[0];?></td>
					<td height="25" align="center"><?=number_format($row[1]);?></td>
					<td height="25" align="center"><?=number_format($row[2]);?></td>
					<td height="25" align="center">회원(<?=number_format($row[3]);?>), 비회원(<?=number_format($no_cnt);?>)</td>
					<td width="300" height="25">
						<table width="" height="25" border="0" cellpadding="0" cellspacing="0" class="menupurple">
							<tr> 
								<td height="12"><img src="../images/graph2.gif" height="11" width="<?= intval( $row[1] / $total_trade_cnt * 10000 ) / 100*3;?>"></td>
							</tr>
							<tr> 
								<td height="12"><img src="../images/graph1.gif" height="11" width="<?= intval( $row[2] / $total_trade_price * 10000 ) / 100*3;?>"></td>
							</tr>
						</table>
					</td>
				</tr>
				<?
					fwrite($fp, $row[0].",".$row[1].",".$row[2].","."회원(".$row[3].")"." / "."비회원(".$no_cnt.")");
					fwrite($fp, $newline);     // 줄 바꾸기             
				}
				fclose($fp); 
				?>
			</table>
			
			<?
			} else if($_GET[date]==3) {
				$result=$db->result("select substring(trade_day, 9, 2), count(idx), sum(trade_price), count(order_userid) from cs_trade where trade_stat=4 group by substring(trade_day, 9, 2)");
				
				if(file_exists('../../data/csv/crm2.csv')) { unlink('../../data/csv/crm2.csv');    }  // 만일 이전에 만든 화일이 있으면 지운다 
				$newline = chr(10);            //  LF(줄바꿈)의 ascii 값을 얻는다. 
				$fp = fopen( "../../data/csv/crm2.csv", "w" ) or die("../../data/csv/crm2.csv 화일을 열수 없습니다") ;  // crm2.csv 를 새로 연다 
				fwrite($fp,"일별, 판매수, 구매금액, 구매자정보");		 //  타이틀 쓰고 
				fwrite($fp,$newline);                     //  줄바꾸기 
			?>
			<table width="800" border="1" cellspacing="0" cellpadding="3" class="menu" bordercolor='#BDBEBD' style='border-collapse: collapse'>
				<tr bgcolor="EFEFEF"> 
					<td height="25" align="center">일별</td>
					<td height="25" align="center">판매수</td>
					<td height="25" align="center">구매금액</td>
					<td height="25" align="center">구매자정보</td>
					<td width="300" height="25" align="center" bgcolor="EFEFEF">판매수/구매금액 그래프</td>
				</tr>
				<?
				while( $row = @mysql_fetch_array( $result )) {
					$no_cnt=$row[1]-$row[3];
				?>
				<tr> 
					<td height="25" align="center"><?=$row[0];?></td>
					<td height="25" align="center"><?=number_format($row[1]);?></td>
					<td height="25" align="center"><?=number_format($row[2]);?></td>
					<td height="25" align="center">회원(<?=number_format($row[3]);?>), 비회원(<?=number_format($no_cnt);?>)</td>
					<td width="300" height="25">
						<table width="" height="25" border="0" cellpadding="0" cellspacing="0" class="menupurple">
							<tr> 
								<td height="12"><img src="../images/graph2.gif" height="11" width="<?= intval( $row[1] / $total_trade_cnt * 10000 ) / 100*3;?>"></td>
							</tr>
							<tr> 
								<td height="12"><img src="../images/graph1.gif" height="11" width="<?= intval( $row[2] / $total_trade_price * 10000 ) / 100*3;?>"></td>
							</tr>
						</table>
					</td>
				</tr>
				<?
					fwrite($fp, $row[0].",".$row[1].",".$row[2].","."회원(".$row[3].")"." / "."비회원(".$no_cnt.")");
					fwrite($fp, $newline);     // 줄 바꾸기             
				}
				fclose($fp); 
				?>
			</table>
			
			<?
			} else if($_GET[date]==4) {
				$result=$db->result("select DAYNAME(left(trade_day, 10)), count(idx), sum(trade_price), count(order_userid) from cs_trade where trade_stat=4 group by DAYNAME(left(trade_day, 10))");

				if(file_exists('../../data/csv/crm2.csv')) { unlink('../../data/csv/crm2.csv');    }  // 만일 이전에 만든 화일이 있으면 지운다 
				$newline = chr(10);            //  LF(줄바꿈)의 ascii 값을 얻는다. 
				$fp = fopen( "../../data/csv/crm2.csv", "w" ) or die("../../data/csv/crm2.csv 화일을 열수 없습니다") ;  // crm2.csv 를 새로 연다 
				fwrite($fp,"요일별, 판매수, 구매금액, 구매자정보");		 //  타이틀 쓰고 
				fwrite($fp,$newline);                     //  줄바꾸기 
			?>
			<table width="800" border="1" cellspacing="0" cellpadding="3" class="menu" bordercolor='#BDBEBD' style='border-collapse: collapse'>
				<tr bgcolor="EFEFEF"> 
					<td height="25" align="center">요일별</td>
					<td height="25" align="center">판매수</td>
					<td height="25" align="center">구매금액</td>
					<td height="25" align="center">구매자정보</td>
					<td width="300" height="25" align="center" bgcolor="EFEFEF">판매수/구매금액 그래프</td>
				</tr>
				<?
				while( $row = @mysql_fetch_array( $result )) {
					$no_cnt=$row[1]-$row[3];
				?>
				<tr> 
					<td height="25" align="center"><?=$row[0];?></td>
					<td height="25" align="center"><?=number_format($row[1]);?></td>
					<td height="25" align="center"><?=number_format($row[2]);?></td>
					<td height="25" align="center">회원(<?=number_format($row[3]);?>), 비회원(<?=number_format($no_cnt);?>)</td>
					<td width="300" height="25">
						<table width="" height="25" border="0" cellpadding="0" cellspacing="0" class="menupurple">
							<tr> 
								<td height="12"><img src="../images/graph2.gif" height="11" width="<?= intval( $row[1] / $total_trade_cnt * 10000 ) / 100*3;?>"></td>
							</tr>
							<tr> 
								<td height="12"><img src="../images/graph1.gif" height="11" width="<?= intval( $row[2] / $total_trade_price * 10000 ) / 100*3;?>"></td>
							</tr>
						</table>
					</td>
				</tr>
				<?
					fwrite($fp, $row[0].",".$row[1].",".$row[2].","."회원(".$row[3].")"." / "."비회원(".$no_cnt.")");
					fwrite($fp, $newline);     // 줄 바꾸기             
				}
				fclose($fp); 
				?>
			</table>
			<?
			} else if($_GET[date]==5 && $_GET[year]==0 && $_GET[mon]==0) {
				$result=$db->result("select left(trade_day, 4), count(idx), sum(trade_price), count(order_userid) from cs_trade where trade_stat=4 group by left(trade_day, 4)");	
				
				if(file_exists('../../data/csv/crm2.csv')) { unlink('../../data/csv/crm2.csv');    }  // 만일 이전에 만든 화일이 있으면 지운다 
				$newline = chr(10);            //  LF(줄바꿈)의 ascii 값을 얻는다. 
				$fp = fopen( "../../data/csv/crm2.csv", "w" ) or die("../../data/csv/crm2.csv 화일을 열수 없습니다") ;  // crm2.csv 를 새로 연다 
				fwrite($fp,"연도, 판매수, 구매금액, 구매자정보");		 //  타이틀 쓰고 
				fwrite($fp,$newline);                     //  줄바꾸기 
			?>
			<table width="800" border="1" cellspacing="0" cellpadding="3" class="menu" bordercolor='#BDBEBD' style='border-collapse: collapse'>
				<tr bgcolor="EFEFEF"> 
					<td height="25" align="center">연도</td>
					<td height="25" align="center">판매수</td>
					<td height="25" align="center">구매금액</td>
					<td height="25" align="center">구매자정보</td>
					<td width="300" height="25" align="center" bgcolor="EFEFEF">판매수/구매금액 그래프</td>
				</tr>
				<?
				while($row = @mysql_fetch_array( $result )) {
					$no_cnt=$row[1]-$row[3]; 
				?>
				<tr> 
					<td height="25" align="center"><?=$row[0];?></td>
					<td height="25" align="center"><?=number_format($row[1]);?></td>
					<td height="25" align="center"><?=number_format($row[2]);?></td>
					<td height="25" align="center">회원(<?=number_format($row[3]);?>), 비회원(<?=number_format($no_cnt);?>)</td>
					<td width="300" height="25">
						<table width="" height="25" border="0" cellpadding="0" cellspacing="0" class="menupurple">
							<tr> 
								<td height="12"><img src="../images/graph2.gif" height="11" width="<?= intval( $row[1] / $total_trade_cnt * 10000 ) / 100*3;?>"></td>
							</tr>
							<tr> 
								<td height="12"><img src="../images/graph1.gif" height="11" width="<?= intval( $row[2] / $total_trade_price * 10000 ) / 100*3;?>"></td>
							</tr>
						</table>
					</td>
				</tr>
				<?
					fwrite($fp, $row[0].",".$row[1].",".$row[2].","."회원(".$row[3].")"." / "."비회원(".$no_cnt.")");
					fwrite($fp, $newline);     // 줄 바꾸기             
				}
				fclose($fp); 
				?>
			</table>
			<?
			} else if($_GET[date]==5 && $_GET[year] && $_GET[mon]==0) {
				// 판매완료한 총 구매수
				$total_trade_cnt=$db->cnt("cs_trade", "where left(trade_day, 4)='$_GET[year]' and trade_stat=4");
				// 판매완료한 총 구입금액
				$total_trade_price=$db->sum("cs_trade", "where left(trade_day, 4)='$_GET[year]' and trade_stat=4", "trade_price");
				$result=$db->result("select substring(trade_day, 6, 2), count(idx), sum(trade_price), count(order_userid) from cs_trade where left(trade_day, 4)='$_GET[year]' and trade_stat=4 group by substring(trade_day, 6, 2)");
				
				if(file_exists('../../data/csv/crm2.csv')) { unlink('../../data/csv/crm2.csv');    }  // 만일 이전에 만든 화일이 있으면 지운다 
				$newline = chr(10);            //  LF(줄바꿈)의 ascii 값을 얻는다. 
				$fp = fopen( "../../data/csv/crm2.csv", "w" ) or die("../../data/csv/crm2.csv 화일을 열수 없습니다") ;  // crm2.csv 를 새로 연다 
				fwrite($fp,"월별, 판매수, 구매금액, 구매자정보");		 //  타이틀 쓰고 
				fwrite($fp,$newline);                     //  줄바꾸기 
			?>
			<table width="800" border="1" cellspacing="0" cellpadding="3" class="menu" bordercolor='#BDBEBD' style='border-collapse: collapse'>
				<tr bgcolor="EFEFEF"> 
					<td height="25" align="center">월별</td>
					<td height="25" align="center">판매수</td>
					<td height="25" align="center">구매금액</td>
					<td height="25" align="center">구매자정보</td>
					<td width="300" height="25" align="center" bgcolor="EFEFEF">판매수/구매금액 그래프</td>
				</tr>
				<?
				while( $row = @mysql_fetch_array( $result )) {
					$no_cnt=$row[1]-$row[3]; 
				?>
				<tr> 
					<td height="25" align="center"><?=$row[0];?></td>
					<td height="25" align="center"><?=number_format($row[1]);?></td>
					<td height="25" align="center"><?=number_format($row[2]);?></td>
					<td height="25" align="center">회원(<?=number_format($row[3]);?>), 비회원(<?=number_format($no_cnt);?>)</td>
					<td width="300" height="25">
						<table width="" height="25" border="0" cellpadding="0" cellspacing="0" class="menupurple">
							<tr> 
								<td height="12"><img src="../images/graph2.gif" height="11" width="<?= intval( $row[1] / $total_trade_cnt * 10000 ) / 100*3;?>"></td>
							</tr>
							<tr> 
								<td height="12"><img src="../images/graph1.gif" height="11" width="<?= intval( $row[2] / $total_trade_price * 10000 ) / 100*3;?>"></td>
							</tr>
						</table>
					</td>
				</tr>
				<?
					fwrite($fp, $row[0].",".$row[1].",".$row[2].","."회원(".$row[3].")"." / "."비회원(".$no_cnt.")");
					fwrite($fp, $newline);     // 줄 바꾸기             
				}
				fclose($fp); 
				?>
			</table>
			<?
			} else if($_GET[date]==5 && $_GET[year] && $_GET[mon]) {
				// 판매완료한 총 구매수
				$total_trade_cnt=$db->cnt("cs_trade", "where left(trade_day, 4)='$_GET[year]' and substring(trade_day, 6, 2)=$_GET[mon] and trade_stat=4");
				// 판매완료한 총 구입금액
				$total_trade_price=$db->sum("cs_trade", "where left(trade_day, 4)='$_GET[year]' and substring(trade_day, 6, 2)=$_GET[mon] and trade_stat=4", "trade_price");
				$result=$db->result("select substring(trade_day, 9, 2), count(idx), sum(trade_price), count(order_userid) from cs_trade where left(trade_day, 4)='$_GET[year]' and substring(trade_day, 6, 2)=$_GET[mon] and trade_stat=4 group by substring(trade_day, 9, 2)");
				
				if(file_exists('../../data/csv/crm2.csv')) { unlink('../../data/csv/crm2.csv');    }  // 만일 이전에 만든 화일이 있으면 지운다 
				$newline = chr(10);            //  LF(줄바꿈)의 ascii 값을 얻는다. 
				$fp = fopen( "../../data/csv/crm2.csv", "w" ) or die("../../data/csv/crm2.csv 화일을 열수 없습니다") ;  // crm2.csv 를 새로 연다 
				fwrite($fp,"일별, 판매수, 구매금액, 구매자정보");		 //  타이틀 쓰고 
				fwrite($fp,$newline);                     //  줄바꾸기 
			?>
			<table width="800" border="1" cellspacing="0" cellpadding="3" class="menu" bordercolor='#BDBEBD' style='border-collapse: collapse'>
				<tr bgcolor="EFEFEF"> 
					<td height="25" align="center">일별</td>
					<td height="25" align="center">판매수</td>
					<td height="25" align="center">구매금액</td>
					<td height="25" align="center">구매자정보</td>
					<td width="300" height="25" align="center" bgcolor="EFEFEF">판매수/구매금액 그래프</td>
				</tr>
				<?
				while( $row = @mysql_fetch_array( $result )) {
					$no_cnt=$row[1]-$row[3];
				?>
				<tr> 
					<td height="25" align="center"><?=$row[0];?></td>
					<td height="25" align="center"><?=number_format($row[1]);?></td>
					<td height="25" align="center"><?=number_format($row[2]);?></td>
					<td height="25" align="center">회원(<?=number_format($row[3]);?>), 비회원(<?=number_format($no_cnt);?>)</td>
					<td width="300" height="25">
						<table width="" height="25" border="0" cellpadding="0" cellspacing="0" class="menupurple">
							<tr> 
								<td height="12"><img src="../images/graph2.gif" height="11" width="<?= intval( $row[1] / $total_trade_cnt * 10000 ) / 100*3;?>"></td>
							</tr>
							<tr> 
								<td height="12"><img src="../images/graph1.gif" height="11" width="<?= intval( $row[2] / $total_trade_price * 10000 ) / 100*3;?>"></td>
							</tr>
						</table>
					</td>
				</tr>
				<?
					fwrite($fp, $row[0].",".$row[1].",".$row[2].","."회원(".$row[3].")"." / "."비회원(".$no_cnt.")");
					fwrite($fp, $newline);     // 줄 바꾸기             
				}
				fclose($fp); 
				?>
			</table>

			<?}?>
			
			<table width="800" border="0" cellspacing="0" cellpadding="0" height="55">
				<tr> 
					<td height="25" align="right"><a href="../../data/csv/crm2.csv"><img src="../images/bt_excell.gif" align="absmiddle" border="0"></a></td>
				</tr>
			</table>
		</td>
		<td width="1" rowspan="8" bgcolor="BDBEBD"></td>
	</tr>
</table>
<script language="JavaScript">
<!--
showMon();
//-->
</script>
<? include('../footer.php');?>