clear
JBOSS_HOME="./lib/wildfly-14.0.1.Final"
CLASSPATH="./lib/gson-2.8.9.jar;./lib/apache-tomcat-9.0.56/lib/servlet-api.jar;./lib/wildfly-14.0.1.Final/modules/system/layers/base/javax/servlet/api/main/jboss-servlet-api_4.0_spec-1.0.0.Final.jar;./src"

echo $CLASSPATH
javac -classpath $CLASSPATH -sourcepath ./src -d ./WEB-INF/classes src/*.java

jar cf BloGame.war WEB-INF *.jsp client
cp BloGame.war $JBOSS_HOME/standalone/deployments
