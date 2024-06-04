package com.development.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.LinkedList;
import java.util.Map;
import java.util.TreeMap;

import com.development.domain.DollName;
import static com.development.dao.DBConstants.*;

public class DollNameDAO {

	private Connection connection;
    DbDAO dbDAO;  // for common DB methods
    
	public DollNameDAO(DbDAO db) {
		dbDAO = db;
		connection = db.getConnection();
	}
	
	public List<DollName> getAllDollNames() throws SQLException {
		Map<Integer, DollName> dollNames = new TreeMap<Integer, DollName>();

		DollName dollName = null;
		Statement stmt = connection.createStatement();
		try {
			ResultSet set = null;
			set = stmt.executeQuery("select * from " + DOLL_NAMES_TABLE + " order by id");
			while (set.next()) {
				int id = set.getInt("id");
				dollName = new DollName(id , set.getString("doll_name"));
				dollNames.put(id, dollName);
			}

		} finally {
			stmt.close();
		}
		return new LinkedList<DollName>(dollNames.values());
	}

}
