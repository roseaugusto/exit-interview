<?php
	require("db.php");
	
	class Form
	{
		public static function listAll()
		{
			return DB::transact_db("select * from form", [], "SELECT");
		}

        public static function listByID($id)
		{
			return DB::transact_db("select * from form where id=?", [$id], "SELECT");
		}

        public static function add($name)
		{
			return DB::transact_db(
                "insert into form (name) values (?)", 
                [$name], 
                "INSERT");
		}

        public static function update($name, $id)
		{
			return DB::transact_db(
				"UPDATE form set name=? where id=?", 
				[$name, $id], 
				"UPDATE");
		}

		public static function delete($id)
		{
			return DB::transact_db("delete form where id=?", [$id], "DELETE");
		}
		
	}
?>