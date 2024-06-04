		create table haunted_doll.users(
				id integer not null AUTO_INCREMENT, 
				name varchar(255) not null,
				username varchar(255) not null,
				email varchar(255) not null,
				password varchar(255) not null,
				primary key (id),
				unique (username));

		create table haunted_doll.menu_doll_names(
				id integer not null, 
				doll_name varchar(30) not null,
				primary key (id),
				unique (doll_name));
				
	   create table haunted_doll.doll_names(
				id integer not null AUTO_INCREMENT, 
				doll_name varchar(30) not null,
				primary key (id));

		create table haunted_doll.menu_doll_sizes(
				id integer not null,
				size_name varchar(30) not null,
				primary key(id),
				unique (size_name));
				
	   create table haunted_doll.doll_sizes(
				id integer not null AUTO_INCREMENT, 
				size_name varchar(30) not null,
				primary key(id));

		create table haunted_doll.doll_orders(
				id integer not null AUTO_INCREMENT, 
				address varchar(500) not null, 
				name_id integer not null, 
				user_id integer not null, 
				size_id integer,
				day integer not null, -- we should default this to current date?
				status integer not null, -- 1 , 2, 3
				primary key(id),
				foreign key (size_id) references doll_sizes(id),
				foreign key (name_id) references doll_names(id),
				foreign key (user_id) references users(id));

		create table haunted_doll.doll_cart(
				id integer not null AUTO_INCREMENT, 
				name_id integer not null, 
				user_id integer not null, 
				size_id integer,
				primary key(id),
				foreign key (size_id) references doll_sizes(id),
				foreign key (name_id) references doll_names(id),
				foreign key (user_id) references users(id));
						
		create table haunted_doll.menu_doll_extra_options(
				id integer not null AUTO_INCREMENT, 
				extra_option_name varchar(30) not null,
				primary key(id),
				unique (extra_option_name));
				
	   create table haunted_doll.doll_extra_options(
				id integer not null AUTO_INCREMENT, 
				order_id integer not null,
				extra_option_name varchar(30) not null,
				primary key(id),
				foreign key (order_id) references doll_orders(id));

	   create table haunted_doll.cart_extra_options(
				id integer not null AUTO_INCREMENT, 
				cart_id integer not null,
				extra_option_name varchar(30) not null,
				primary key(id),
				foreign key (cart_id) references doll_cart(id));

		create table haunted_doll.doll_sys_tab (
				next_menu_doll_extra_options_id integer not null,
				next_menu_doll_size_id integer not null,
				next_menu_doll_names_id integer not null, 
				next_order_id integer not null, 
				next_doll_extra_options_id integer not null, 
				next_doll_sizes_id integer not null, 
				next_doll_names_id integer not null, 
				current_day integer not null);
		
		insert into haunted_doll.doll_sys_tab values (1, 1, 1, 1, 1, 1, 1, 1);
		INSERT INTO `haunted_doll`.`users` (`id`,`name`,`username`,`email`,`password`) VALUES(1, "Admin", "Administrator", "admin@test.com", "Password");