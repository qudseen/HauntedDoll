package com.development.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.LinkedList;
import java.util.Map;
import java.util.TreeMap;

import com.development.domain.User;
import static com.development.dao.DBConstants.*;

public class UserDAO {

	private Connection connection;
    DbDAO dbDAO;  // for common DB methods
    
	public UserDAO(DbDAO db) {
		dbDAO = db;
		connection = db.getConnection();
	}
	
	public boolean signup(String name, String username, String email, String password) throws SQLException {
		// sign up method
		// insert into users table

		Statement stmt = connection.createStatement();
		try {
			stmt.execute("insert into " + USERS_TABLE + " (`name`, `username`, `email`, `password`) "
					+ "VALUES ('"+ name +"', '"+ username +"', '"+ email +"', '"+ password +"')");
		} catch(Exception e){
			throw e;
		}finally {
			stmt.close();
		}
		
		return true;
	}
	
	// sign in method
	public User signin(String username, String password) throws SQLException {
		User usr= null;
		Statement stmt = connection.createStatement();
		try {
			ResultSet set = null;
			set = stmt.executeQuery("select * from " + USERS_TABLE + " where username = '" + username + "' and password = '" + password + "' order by id");
			if (set.next()) {
				usr = new User(set.getInt("id"), set.getString("name"), set.getString("username"), set.getString("email"));
			}

		} finally {
			stmt.close();
		}
		return usr;
	}
	
	public List<User> getAllUsers() throws SQLException {
		Map<Integer, User> users = new TreeMap<Integer, User>();

		User usr= null;
		Statement stmt = connection.createStatement();
		try {
			ResultSet set = null;
			set = stmt.executeQuery("select * from " + USERS_TABLE + " order by id");
			while (set.next()) {
				int id = set.getInt("id");
				usr = new User(id , set.getString("name"), set.getString("username"), set.getString("email"));
				users.put(id, usr);
			}

		} finally {
			stmt.close();
		}
		return new LinkedList<User>(users.values());
	}

}