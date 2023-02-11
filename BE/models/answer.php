<?php
	require("db.php");
	
	class Answer
	{
		public static function listAll()
		{
			return DB::transact_db("select * from user_forms", [$id], "SELECT");
		}

		public static function listAllByUser($id)
		{
			return DB::transact_db("select * from user_forms where user_id", [$id], "SELECT");
		}

		public static function listAllAnswers($id)
		{
			return DB::transact_db("select from answer where user_forms_id=?", [$id], "SELECT");
		}

        public static function add($questionID, $userID, $questionOptionID, $answer, $formID)
		{
			$id = DB::transact_db("insert into user_forms (user_id, form_id) values (?,?)", 
			[$userID, $formID], 
			"INSERT");

			return DB::transact_db("insert into answer (user_forms, question_option_id, answer, question_id) values (?,?,?,?)", 
			[$id, $questionOptionID, $answer,$questionID], 
			"INSERT");
		}

		public static function update($answer, $question_option_id, $id)
		{
			return DB::transact_db(
				"UPDATE question_options set answer=?, question_option_id=? where id=?", 
				[$answer, $question_option_id, $id], 
				"UPDATE");
		}
		
	}
?>
