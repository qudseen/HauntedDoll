package com.development.dao;

public interface DBConstants {
	public static final String MYSQL_DRIVER = "com.mysql.cj.jdbc.Driver";
	public static final String ORACLE_DRIVER = "oracle.jdbc.OracleDriver";
	public static final String H2_DRIVER = "org.h2.Driver";
	public static final String H2_URL = "jdbc:h2:~/test";
	public static final String HSQLDB_DRIVER = "org.hsqldb.jdbcDriver";
	public static final String HSQLDB_URL = "jdbc:hsqldb:hsql://localhost/";

	public static final String USERS_TABLE = "users";
	public static final String ORDER_TABLE = "doll_orders";
	public static final String CART_TABLE = "doll_cart";
	public static final String SYS_TABLE = "doll_sys_tab";
	public static final String MENU_DOLL_EXTRA_OPTIONS_TABLE = "menu_doll_extra_options";
	public static final String MENU_DOLL_SIZES_TABLE = "menu_doll_sizes";
	public static final String MENU_DOLL_NAMES_TABLE = "menu_doll_names";
	public static final String DOLL_EXTRA_OPTIONS_TABLE = "doll_extra_options";
	public static final String CART_EXTRA_OPTIONS_TABLE = "cart_extra_options";
	public static final String DOLL_NAMES_TABLE = "doll_names";
	public static final String DOLL_SIZES_TABLE = "doll_sizes";
	public static final int MAX_TOPPINGS_STR_SIZE = 30;
	public static final int MAX_SIZE_STR_SIZE = 30;
}
