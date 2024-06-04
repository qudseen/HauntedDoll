# Use H2's runScript JDBC program to run scripts on pe07's mysql from home or on pe07
# Usage: runMysqlScriptJDBC.sh <script>, for ex.,  runMysqlScript.sh showdb.sql
# using ?useSSL=false on end of jdbc url to avoid mysql ssl bug
java -cp lib-for-ant/h2.jar:lib-for-ant/mysql-connector-java-8.0.14.jar org.h2.tools.RunScript -url jdbc:mysql://${MYSQL_SITE}/${MYSQL_USER}db?useSSL=false -user $MYSQL_USER -password $MYSQL_PW -script $1 -showResults
