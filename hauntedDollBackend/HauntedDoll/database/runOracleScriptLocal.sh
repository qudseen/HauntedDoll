# needs sqlplus program available, so works on pe07 but not at home
# Usage runOracleScriptLocal createdb.sql|showdb.sql|dropdb.sql
sqlplus ${ORACLE_USER}/${ORACLE_PW}@//dbs3.cs.umb.edu/dbs3 < $1
