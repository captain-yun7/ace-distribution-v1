<? include $_SERVER["DOCUMENT_ROOT"]."/common.php"; ?>
<? $admin_stat = $db->object("cs_admin", ""); ?>

<meta name="robots" content="ALL" />
<meta name="Keywords" content="<?=$admin_stat->meta_keyw?>" />
<meta name="subject" content="<?=$admin_stat->link_cano?>" />
<meta name="description" content="<?=$admin_stat->meta_desc?>" />

<title><?=$admin_stat->title?></title>
