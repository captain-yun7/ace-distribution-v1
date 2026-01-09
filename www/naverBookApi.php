<?php 
class Book
{
        private $key = "2b243b4e72a3da7d85077e52b585b230"; // 사용자가 발급받은 오픈API 키 
        private $searchUrl = "http://openapi.naver.com/search"; // 오픈API 호출URL
        private $target = "book";

        /**
         * API 결과를 받아오기 위하여 오픈API 서버에 Request 를 하고 결과를 XML Object 로 반환하는 메소드
         * @return object
         */
        private function query($query)
        {
                $url = sprintf("%s?query=%s&target=%s&key=%s", $this->searchUrl, $query, $this->target, $this->key);
                $data =file_get_contents($url);
                $xml = simplexml_load_string($data);
                
                return $xml;
        }

        /**
         * API의 결과를 Json 으로 encode 하려 반환하는 메소드
         * XML을 직접 parsing 하지 않고 json으로 변환하여 반환한다. 
         */
        public function getBookSearch($query)
        {       $xml = $this->query($query);
                $result = json_encode($xml);

                return $result; 
        }
}       
?>