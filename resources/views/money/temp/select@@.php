<?php
function GetDb(){
    $dsn = 'mysql:dbname=zaimshow_db; host=localhost';
    $usr = 'laravel';
    $passwd = 'password';

    try
    {
      $db = new PDO($dsn, $usr, $passwd);
      $db->exec('SET NAMES utf8');
    }
    catch (PDOException $e)
    {
      die("connection failure: {$e->getMessage()}");
    }
    return $db;
}
function e($str, $charset = 'UTF-8'){
    print htmlspecialchars($str, ENT_QUOTES, $charset);
}

// initialization for column
$arryCol = array();
array_push($arryCol, MakeColElement('Date', 'string'));
array_push($arryCol, MakeColElement('Value', 'number'));

$arryRow = array();

// query data
$qry = "select * from tbl_money";
try
{
    $db = GetDb();
    $stt = $db->prepare($qry);
    $stt->execute();

    // loop till fetch all aquired values and store.
    while($row = $stt->fetch(PDO::FETCH_ASSOC)) {
      array_push($arryRow, MakeRowElement($row['id'], $row['item_name']));
    }

    // delete
    $db = NULL;
}
catch (PDOEXception $e)
{
    die("connection error:{$e->getMessage()}");
}

// return created Json format.
echo MakeTable($arryCol, $arryRow);

function MakeColElement ($label, $type)
{
  return '{"id":"","label":"'.$label.'"'.',"pattern":"","type":"'.$type.'"'.'}';
}

function MakeRowElement ($item, $val)
{
  return '{"c":[{"v":"'.$item.'","f":null},{"v":'.$val.',"f":null}]}';
}

function MakeTable ($arryCol, $arryRow)
{
  $ret = '{
          "cols": ['
          .ConnectArry($arryCol)
          .'],'
          .'"rows": ['
          .ConnectArry($arryRow)
          .']
         }';
  return $ret;
}

function ConnectArry($arry)
{
  $ret = '';
  for ($i=0; $i < count($arry); $i++)
  {
    $ret = ($i != (count($arry)-1)) ? $ret.$arry[$i].',' : $ret.$arry[$i] ;
  }
  return $ret;
}
?>