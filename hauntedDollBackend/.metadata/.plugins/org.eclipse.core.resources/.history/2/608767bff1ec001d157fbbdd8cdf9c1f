package com.development.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Map;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.Set;
import java.util.List;
import java.util.LinkedList;

import com.development.domain.Cart;
import com.development.domain.Order;
import static com.development.dao.DBConstants.*;

public class CartDAO {

	private Connection connection;
    DbDAO dbDAO;  // for common DB methods
    
	public CartDAO(DbDAO db) {
		dbDAO = db;
		connection = db.getConnection();
	}

	public List<Cart> getCart(int userid) throws SQLException {
		String sqlString =
			"SELECT o.*, s.*, n.*, u.*, eot.* "
			+ "FROM " + CART_TABLE + " o LEFT OUTER JOIN " + CART_EXTRA_OPTIONS_TABLE + " eot " +
			" ON o.id = eot.cart_id " +
			"JOIN " + DOLL_SIZES_TABLE + " s ON o.size_id = s.id " + 
			"JOIN " + DOLL_NAMES_TABLE + " n ON o.name_id = n.id " + 
			"JOIN " + USERS_TABLE + " u ON o.user_id = u.id " + 
			((userid > 0) ? ("WHERE o.user_id = " + userid) : "") +
			" ORDER BY o.id";
		
		Map<Integer, Cart> statusMap = new TreeMap<Integer, Cart>();
		Statement stmt = connection.createStatement();

		try {
			ResultSet table = stmt.executeQuery(sqlString);

			while (table.next()) {
				int cartId = table.getInt("id");
				Cart cart = null;
				String extras_name = table.getString("extra_option_name");
				if ((cart = (Cart) statusMap.get(cartId)) != null) {
					cart.setExtras(cart.getExtras() + ", " + extras_name);
				} else {
					String extras = extras_name;
					String name = table.getString("username");
					String dollName = table.getString("doll_name");
					String dollSize = table.getString("size_name");
					
					cart = new Cart(cartId, name, dollName, dollSize, extras);
					statusMap.put(cartId, cart);
				}
			}
		} finally {
			stmt.close();
		}
		return new LinkedList<Cart>(statusMap.values());
	}
	
	public void addToCart(int user_id, int dollName_id, int dollSize_id, String[] extras_names) throws SQLException {
		
		Statement stmt = connection.createStatement();
		try {
			stmt.executeUpdate("insert into " + CART_TABLE + " (`user_id`, `name_id`,`size_id`) "+
					"VALUES ("+ user_id +","+ dollName_id +","+ dollSize_id + ")", Statement.RETURN_GENERATED_KEYS);
			ResultSet rs = stmt.getGeneratedKeys();
			int cart_id = 0;
		    if(rs.next()) {
		       cart_id = rs.getInt(1);
		    }
		    
		    if (cart_id > 0) {
		    	// insert into extras table
		    	for (int i =0; i < extras_names.length; i++) {
		    		String name = extras_names[i];
		    		stmt.execute("insert into " + CART_EXTRA_OPTIONS_TABLE + " (`cart_id`, `extra_option_name`) "+ "VALUES ("+ cart_id +",'"+ name +"')");
		    	}
		    }
		} catch(Exception e){
			throw e;
		}finally {
			stmt.close();
		}
		
		return;

	}

public void removeCartItem(int cart_id) throws SQLException {
		
		Statement stmt = connection.createStatement();
		try {
			
	    	// delete from extras table
    		stmt.executeUpdate("delete from " + CART_EXTRA_OPTIONS_TABLE + " where cart_id=" + cart_id);

    		// delete from cart table
			stmt.executeUpdate("delete from " + CART_TABLE + " where id=" + cart_id);
		} catch(Exception e){
			throw e;
		}finally {
			stmt.close();
		}
		
		return;

	}

}
