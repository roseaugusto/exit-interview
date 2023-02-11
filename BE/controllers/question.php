<?php
require_once("../models/question.php");
require_once("header.php");

switch($_SERVER['REQUEST_METHOD']) {
    CASE 'GET':
        if(!isset($_GET['isList'])) {
            echo json_encode(Question::listByID($_GET['id']));
        } else {
            echo json_encode(Question::listAllByForm($_GET['id']));
        }
		break;
    case 'POST':
        $type = $_POST['type'];
        $name = $_POST['name'];
        $placeholder = $_POST['placeholder'];
        $isRequired = $_POST['isRequired'];

        $question = Question::add($name, $type, $placeholder, $isRequired);

        echo $question;
        break;
    case 'PATCH':
        $type = $_PATCH['type'];
        $name = $_PATCH['name'];
        $placeholder = $_PATCH['placeholder'];
        $isRequired = $_PATCH['isRequired'];
        $questionID = $_PATCH['question_id'];

        $question = Question::add($name, $type, $placeholder, $isRequired, $questionID);

        echo $question;
        break;
    case 'DELETE':
        $questionID = $_DELETE['question_id'];

        $question = Question::delete($questionID);

        echo $question;
        break;
}

?>