<?php
	require("db.php");
	
	class QuestionOptions
	{
		public static function listAll()
		{
			return DB::transact_db("select * from question_options", [], "SELECT");
		}

        public static function listByQuestionID($id)
		{
			return DB::transact_db("select * from question_options where question_id=?", [$id], "SELECT");
		}

        public static function add($questionID, $name)
		{
			return DB::transact_db("insert into question_options (question_id, name) values (?,?)", 
			[$questionID, $name], 
			"INSERT");
		}

		public static function update($name, $id)
		{
			return DB::transact_db(
				"UPDATE question_options set name=? where id=?", 
				[$name, $id], 
				"UPDATE");
		}

		public static function delete($id)
		{
			return DB::transact_db("delete question_options where id=?", [$id], "DELETE");
		}
		
	}
?>