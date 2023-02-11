<?php
require_once("../models/answer.php");
require_once("header.php");

switch($_SERVER['REQUEST_METHOD']) {
    CASE 'GET':
        if(isset($_GET['id']) && isset($_GET['key'])) {
            echo json_encode(Answer::listByUserOrQuestionID($_GET['key'], $_GET['id']));
        } else {
            echo json_encode(Answer::listAll());
        }
        break;
    case 'POST':
        // $questionID = $_POST['question_id'];
        // $questionOptionID = $_POST['question_option_id'];
        // $userID = $_POST['user_id'];
        // $answer = $_POST['answer'];
        // Takes raw data from the request
        // $a = Answer::add($questionID, $userID, $questionOptionID, $answer);
        $json = file_get_contents('php://input');

        // Converts it into a PHP object
        $data = json_decode($json);
        echo $data;
        // foreach($data as $d) {
        //   Answer::add($d->questionid, $d->userid, $d->answerOptionId, $d->answer);
        // }

        //echo 'success';
        break;
    case 'PATCH':
        $id = $_PATCH['id'];
        $answer = $_PATCH['answer'];

        $a = Answer::update($answer, $id);

        echo $a;
        break;
}
?>