<?php
require_once("../models/form.php");
require_once("header.php");

switch($_SERVER['REQUEST_METHOD']) {
    CASE 'GET':
        if(isset($_GET['id'])) {
            echo json_encode(Form::listByID($_GET['id']));
        } else {
            echo json_encode(Form::listAll());
        }
		break;
    case 'POST':
        $name = $_POST['name'];

        $form = Form::add($name);

        echo $form;
        break;
    case 'PATCH':
        $id = $_PATCH['id'];
        $name = $_PATCH['name'];

        $form = Form::update($name, $id);

        echo $form;
        break;
    case 'DELETE':
        $id = $_DELETE['id'];

        $form = Form::delete($id);

        echo $form;
        break;
}

?>