<?php
require_once("../models/question_options.php");
require_once("header.php");

switch($_SERVER['REQUEST_METHOD']) {
    CASE 'GET':
        if(isset($_GET['id'])) {
            echo json_encode(QuestionOptions::listByQuestionID($_GET['id']));
        } else {
            echo json_encode(QuestionOptions::listAll());
        }
        break;
    case 'POST':
        $questionID = $_POST['question_id'];
        $name = $_POST['name'];

        $question_options = QuestionOptions::add($questionID, $name);

        echo $question_options;
        break;
    case 'PATCH':
        $id = $_PATCH['id'];
        $name = $_PATCH['name'];

        $question_options = QuestionOptions::update($name, $id);

        echo $question_options;
        break;
    case 'DELETE':
        $id = $_DELETE['id'];

        $question_options = QuestionOptions::delete($id);

        echo $question_options;
        break;
    
}

?>