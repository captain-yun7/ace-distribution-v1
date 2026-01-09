<? include $_SERVER["DOCUMENT_ROOT"]."/common.php"; ?>
<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Content-Script-Type" content="text/javascript">
<meta http-equiv="Content-Style-Type" content="text/css">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=1000">
<title>에이스유통(주)</title>
<link rel="stylesheet" type="text/css" href="/css/reset.css">
<link rel="stylesheet" type="text/css" href="/css/style.css">
<link rel="stylesheet" type="text/css" href="/css/board.css">
<link rel="stylesheet" type="text/css" href="/css/button.css">
<link rel="stylesheet" type="text/css" href="/css/thickbox.css">
<script type="text/javascript" src="/js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="/js/jquery.slides.min.js"></script>
<script type="text/javascript" src="/js/jqbanner.js"></script>
<script type="text/javascript" src="/js/gnb.js"></script>
<script type="text/javascript" src="/js/lnb.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript" src="/js/thickbox.js"></script>
<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
</head>

<body>
<!-- accessibility -->
<div class="accessibility">
	<a href="#container">본문 바로가기</a>
</div>
<!-- //accessibility -->

<div id="wrap">
    <!-- header -->
    <header id="header">
    	<div class="h_inner">
            <h2><a href="/index.php" title="홈으로">에이스유통(주)</a></h2>
            
            <!-- gnb -->
            <nav id="gnb">
                <ul>
                    <li class="blFirst"><a href="/about/greeting.php">회사소개</a>
                        <ul>
                            <li><a href="/about/greeting.php">인사말</a></li>
                            <!--li><a href="/about/history.php">연혁</a></li-->
                            <li><a href="/about/location.php">찾아오시는길</a></li>
                        </ul>
                    </li>
                    <li><a href="/product/all_list.php">제품소개</a>
                        <ul>
                            <li><a href="/product/all_list.php">전체</a></li>
                            <?
							$query = "select * from cs_part where part_display_check='1' and part_index='1' order by part_ranking asc, idx asc";
							$rs = mysql_query($query);
							while($row = mysql_fetch_array($rs)){
							?>
							<li><a href="/product/product_list.php?part1_idx=<?=$row[idx]?>"><?=$row[part_name]?></a></li>
							<? } ?>
                        </ul>
                    </li>
                    <li><a href="/community/notice.php">커뮤니티</a>
                        <ul>
                            <li><a href="/community/notice.php">공지사항</a></li>
                            <li><a href="/community/press.php">보도자료</a></li>
                            <li><a href="/community/recipe.php">레시피</a></li>
                            <li><a href="/community/q_a.php">Q&amp;A</a></li>
                        </ul>
                    </li>
                    <li><a href="/inquiry/inquiry.php">온라인 문의</a></li>
                </ul>
            </nav>
            <!-- //gnb -->
            
            <div class="util" style="display:flex; justify-content:space-between;">
		  		<ul style="float:none;">
					<? if($_SESSION[USERID]){ ?>
                    <li><a href="/member/login_ok.php?logout=1" class="main-login-btn" style="background:#0c4da2;">로그아웃</a></li>
                    <li><a href="/member/modify_01.php" class="main-join-btn">정보수정</a></li>
					<? } else { ?>
                    <li><a href="/member/login.php" class="main-login-btn" style="background:#0c4da2;">로그인</a></li>
                    <li><a href="/member/join_01.php" class="main-join-btn">회원가입</a></li>
					<? } ?>
               </ul>
               <ul style="float:none;">
                    <li><a href="/index.php">HOME</a></li>
                    <li><a href="/about/location.php">CONTACT</a></li>
                    <li><a href="#" id="sitemap_view">SITEMAP</a></li>
               </ul>
            </div>
        </div>
    </header>
    <!-- //header -->
    
    <div class="active_bg"></div>
    
    <!-- container -->
	<section id="container">