FROM gitpod/workspace-mysql

# add your tools here

env ERABLE_CONFIG_DIR=/workspace/nodejstest/modulers/test/resources/config/
env ERABLE_SERVICE=njstest
env ERABLE_PORT=8080
env ERABLE_PORTS=8080