<?php
$data = $_POST['jsonString'];
$f = fopen("neuralnetwork.json", "w+") or die("fopen failed");
fwrite($f, $data);
fclose($f);
?>
