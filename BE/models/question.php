<?php
	require("db.php");
	
	class Question
	{
		public static function listAllByForm($id)
		{
			return DB::transact_db("select * from question where form_id=?", [$id], "SELECT");
		}

        public static function listByID($id)
		{
			return DB::transact_db("select * from question where id=?", [$id], "SELECT");
		}

        public static function add($name, $type, $placeholder, $isRequired, $isFilter, $formId)
		{
			return DB::transact_db(
                "insert into question (name, type, placeholder, isRequired, isFilter, form_id) 
				values (?,?,?,?,?,?)", 
                [$name, $type, $placeholder, $isRequired, $formId], 
                "INSERT");
		}

        public static function update($name, $type, $placeholder, $isRequired, $questionID)
		{
			return DB::transact_db(
				"UPDATE question set name=?, type=?, placeholder=?, isRequired=? where id=?", 
				[$name, $type, $placeholder, $isRequired, $questionID], 
				"UPDATE");
		}

		public static function delete($id)
		{
			return DB::transact_db("delete question where id=?", [$id], "DELETE");
		}
		
	}
?>