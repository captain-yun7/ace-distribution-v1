<?
   // define('NAVERKEY', '네이버키');

    //$publisher = "";     // api 호출 결과(출판사 명)
   // $title = "";        // api 파라메터(책 이름)

    if (isset ($_GET["title"])) { 
        $title = trim($_GET["title"]);         // 텍스트 필드에 입력한 값을 가져옴

        $encodedquery = urlencode($title);     // 쿼리 변경, 암호화 하는 것과 관련있을듯 싶다.
//        $url = "http://openapi.naver.com/search?query=$encodedquery&display=1&target=book&key=2b243b4e72a3da7d85077e52b585b230"; // API 요청
		$url = "http://openapi.naver.com/search?key=2b243b4e72a3da7d85077e52b585b230&query=$encodedquery&display=10&start=1&target=book";
        $publisher = simplexml_load_file($url)->channel->item[0]->publisher; // 결과 저장
    }
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>책 API 예제</title>
    </head>
    <body>
        <!-- 1. 입력 부분 -->
        <form name="book" method="get" action="<?=$_SERVER['PHP_SELF']?>">
            <textarea name="title" cols="20" rows="1"></textarea>
            <input type="submit" value="search">
        </form>

        <!-- 2. 출력 부분 -->    
        <div>
            <?
                echo $publisher; // 결과 출력
            ?>
        </div>
    </body>
</html>