<?php
$data = $_POST['jsonString'];
$f = fopen("vocab.json", "w+") or die("fopen failed");
fwrite($f, $data);
fclose($f);
?>
