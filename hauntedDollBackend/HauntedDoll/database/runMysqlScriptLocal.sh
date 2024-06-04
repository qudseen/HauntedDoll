# needs mysql program available locally, so works on pe07 but not at home
# Usage; runMysqlScriptLocal.sh createdb.sql|showdb.sql|dropdb.sql
mysql -u $MYSQL_USER -p -D ${MYSQL_USER}db < $1
