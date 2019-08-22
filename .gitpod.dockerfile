FROM gitpod/workspace-mysql

# add your tools here

env ERABLE_CONFIG_DIR=/workspace/nodejstest/modulers/test/resources/config/
env ERABLE_SERVICE=njstest
env ERABLE_PORT=8080
env ERABLE_PORTS=8080
env MYSQL_WRITE_DATABASE="mysql://njstest:njstest@localhost:3306/njstest"

RUN mysql -e "CREATE DATABASE IF NOT EXISTS njstest;"
RUN mysql -e "GRANT ALL PRIVILEGES ON njstest.* TO 'njstest' IDENTIFIED BY 'njstest';"