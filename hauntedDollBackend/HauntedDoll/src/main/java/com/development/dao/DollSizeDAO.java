package com.development.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.LinkedList;
import java.util.Map;
import java.util.TreeMap;

import com.development.domain.DollSize;
import static com.development.dao.DBConstants.*;

public class DollSizeDAO {

	private Connection connection;
    DbDAO dbDAO;  // for common DB methods
    
	public DollSizeDAO(DbDAO db) {
		dbDAO = db;
		connection = db.getConnection();
	}
	
	public List<DollSize> getAllDollSizes() throws SQLException {
		Map<Integer, DollSize> dollSizes = new TreeMap<Integer, DollSize>();

		DollSize dollSize = null;
		Statement stmt = connection.createStatement();
		try {
			ResultSet set = null;
			set = stmt.executeQuery("select * from " + DOLL_SIZES_TABLE + " order by id");
			while (set.next()) {
				int id = set.getInt("id");
				dollSize = new DollSize(id , set.getString("size_name"));
				dollSizes.put(id, dollSize);
			}

		} finally {
			stmt.close();
		}
		return new LinkedList<DollSize>(dollSizes.values());
	}

}
