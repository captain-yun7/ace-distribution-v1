<?php
$mobile_agent = array("iphone","ipod", "ipad","android","blackberry","opera Mini", "windows ce", "nokia", "sony", "lgtelecom","skt" );
$check_mobile = false;
for($i=0; $i<sizeof($mobile_agent); $i++){
    if(stripos( $_SERVER['HTTP_USER_AGENT'], $mobile_agent[$i] )){
        $check_mobile = true;
        break;
    }
}

if($check_mobile) { } else {
    echo"<script>location.href='/';</script>";
}

?>
<div id="wrap">
    <!-- header -->
    <header id="header">
    		<div class="h_inner">
            <!-- <h1><a href="/index.php" title="홈으로">에이스유통(주)</a></h1> -->
            
            <div class="m-util">
                <ul>
                    <li><a href="/mobile/index.php">HOME</a></li>
                    <li><a href="/mobile/inquiry/inquiry.php">CONTACT</a></li>
                </ul>
            </div>
		  <div id="headerInner">
			<div class="area-padding-m">
				<h1 class="logo">
					<a href="/mobile/index.php" title="홈으로">
						<em>에이스유통(주)</em>
						<img src="/images/mobile/header_logo_m.png" alt="">
						<!-- <img src="/images/mobile/logo.png" alt="">
						<span class="logo-tit">에이스유통주식회사</span> -->
					</a>					
				</h1>
				<!-- <a href="" class="nav-open-btn">
					<span class="line"></span>
					<span class="line"></span>
					<span class="line"></span>
				</a> -->
			</div>
		  </div>
		</div>
		<!-- GNB Mobile -->
		<button class="nav-open-btn" title="네비게이션 열기">
			<span><i class="xi-bars"></i></span>
			<i class="xi-close close"></i>
		</button>
		<div class="gnb-overlay-bg-m"></div>
		<nav id="gnbM" class="gnb-style-basic">
			<!-- 
				기본스타일 : .gnb-style-basic
				Full 스타일 : .gnb-style-full
			-->
			<div class="header-util-menu-box">
				<!-- 회원메뉴 -->
				<? if($_SESSION['USERID']){ ?>
				<ul class="clearfix member-menu-box">
					<li><a href="/mobile/member/login_ok.php?logout=1"><strong>로그아웃</strong></a></li>
					<li><a href="/mobile/member/modify_01.php"><strong>정보수정</strong></a></li>		
				</ul>
				<? } else { ?>
				<ul class="clearfix member-menu-box">
					<li><a href="/mobile/member/login.php"><strong>로그인</strong></a></li>
					<li><a href="/mobile/member/join_01.php"><strong>회원가입</strong></a></li>		
				</ul>
				<? } ?>
			</div>
			<h2 class="blind">주메뉴</h2>
			<div class="gnb-navigation-wrapper">
				<div class="gnb-navigation-inner">
					<ul id="navigation" data-menu-clone="true">
						<li class="gnb1">
							<a href="/mobile/about/greeting.php">회사소개</a>
							<div class="gnb-2dep">
								<ul>
									<li><a href="/mobile/about/greeting.php">인사말</a></li>
									<li><a href="/mobile/about/location.php">찾아오시는 길</a></li>
								</ul>
							</div>
						</li>
						<li class="gnb2">
							<a href="/mobile/about/greeting.php">제품소개</a>
							<div class="gnb-2dep">
								<ul>
									<li><a href="/mobile/product/product_list.php">전체</a></li>
									<?
									$query = "select * from cs_part where part_display_check='1' and part_index='1' order by part_ranking asc, idx asc";
									$rs = mysql_query($query);
									while($row = mysql_fetch_array($rs)){
									?>
									<li><a href="/mobile/product/product_list.php?part1_idx=<?=$row[idx]?>"><?=$row[part_name]?></a></li>
									<? } ?>
									<!-- <li><a href="/mobile/product/product_list.php">두·서류가공품</a></li>
									<li><a href="">곡류가공품</a></li>
									<li><a href="">견과가공품</a></li>
									<li><a href="">유지 및 유가공품</a></li> -->
								</ul>
							</div>
						</li>
						<li class="gnb3">
							<a href="/mobile/community/notice.php">커뮤니티</a>
							<div class="gnb-2dep">
								<ul>
									<li><a href="/mobile/community/notice.php">공지사항</a></li>
									<li><a href="/mobile/community/press.php">보도자료</a></li>
									<li><a href="/mobile/community/recipe.php">레시피</a></li>
									<li><a href="/mobile/community/qna.php">Q&A</a></li>
								</ul>
							</div>
						</li>
						<? if($_SESSION['USERID']){ ?>
						<li class="gnb4">
							<a href="/mobile/recruit/offer_01.php">구인구직</a>
							<div class="gnb-2dep">
								<ul>
									<li><a href="/mobile/recruit/offer_01.php">구인</a></li>
									<li><a href="/mobile/recruit/offer_02.php">구직</a></li>
								</ul>
							</div>
						</li>
						<? } ?>
						<li class="gnb5">
							<a href="/mobile/inquiry/inquiry.php">온라인 문의</a>							
						</li>
					</ul><!-- PC메뉴 같을때 true / 같지않으면 false 후 메뉴삽입 -->
				</div>
			</div>
		</nav>

    </header>
