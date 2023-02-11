<?php
	require("db.php");
	
	class User
	{
		public static function listAll()
		{
			return DB::transact_db("select * from user where isAdimn", [0], "SELECT");
		}

        public static function listByIDorEmail($fieldKey, $fieldValue)
		{
			return DB::transact_db("select * from question where ".$fieldKey."=?", [$fieldValue], "SELECT");
		}

        public static function add($email, $fullName, $isAdmin, $password, $status)
		{
			return DB::transact_db(
                "insert into user (email, full_name, isAdmin, password, status) values (?,?,?,?,?)", 
                [$email, $fullName, $isAdmin, $password, $status], 
                "INSERT");
		}

        public static function update($email, $fullName, $isAdmin, $password, $status, $id)
		{
			return DB::transact_db(
				"UPDATE user set email=?, full_name=?, isAdmin=?, password=?, status where id=?", 
				[$email, $fullName, $isAdmin, $password, $status, $id], 
				"UPDATE");
		}

		public static function login($id, $token)
		{
			return DB::transact_db("INSERT INTO user_token (user_id, token) values (?,?)", [$id, $token], "INSERT");
		}

		public static function logout($token)
		{
			return DB::transact_db("DELETE user_token where token=?", [$token], "DELETE");
		}
		
	}
?>