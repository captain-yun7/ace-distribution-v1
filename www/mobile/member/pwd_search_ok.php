<?
header("Content-type: text/html; charset=utf-8");
include $_SERVER['DOCUMENT_ROOT']."/common.php";
$admin_stat		=	$db->object("cs_admin", "");

//디바이스체크
//$site_url = $tools->deviceURL();

$userid= 	$tools->filter($_POST[userid]);
$name	= 	$tools->filter($_POST[name]);
$email	= 	$tools->filter($_POST[email]);

if( !$db->cnt("cs_member", "where userid='$userid' and name='$name' and email='$email' and sns=''")) { $tools->errMsg('정확한 회원정보를 입력해주세요');}
$mem_row = $db->object("cs_member", "where userid='$userid' and name='$name' and email='$email' and sns=''");

//패스워드 변경
$rand_passwd = substr(md5(rand()),0,8);
$passwd = $tools->openssl($rand_passwd);
$query = "update cs_member set passwd='$passwd' where userid='$userid'";
mysql_query($query);

//메일보내기
include $_SERVER['DOCUMENT_ROOT']."/lib/mail_class.php";
$mail = new my_mime_mail();
$mail_row = $db->object("cs_mailform","where code='password'");

$mail_subject			= $mail_row->subject;
$mail_content			= $mail_row->content;

$mail_content = str_replace("[{SHOP_NAME}]", $admin_stat->shop_name, $mail_content);
$mail_content = str_replace("[{USER_NAME}]", $mem_row->name, $mail_content);
$mail_content = str_replace("[{USER_ID}]", $mem_row->userid, $mail_content);
$mail_content = str_replace("[{USER_PASSWD}]", $rand_passwd, $mail_content);
$mail_content = str_replace("[{SHOP_DOMAIN}]", "http://".$_SERVER['HTTP_HOST'], $mail_content);

$conf['charset'] = "UTF-8";
$mail_to_name		= "=?$conf[charset]?B?".base64_encode($mem_row->name) . "?=";
$mail_from_name	= "=?$conf[charset]?B?".base64_encode($admin_stat->shop_name) . "?=";
$mail_subject			=	"=?$conf[charset]?B?".base64_encode($mail_subject) . "?=";

$mail->to =  $mail_to_name." <".$mem_row->email.">";
$mail->from = $mail_from_name." <".$admin_stat->shop_email.">";
$mail->subject = $mail_subject;
$mail->body = $mail_content;
$mail->send();

$tools->alertMetaGo("입력하신 메일로 임시 비밀번호를 보냈습니다.","./pwd_search.php");
?>