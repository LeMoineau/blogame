CLASSPATH=./src:./WEB-INF/lib/gson-2.8.9.jar:$JBOSS_HOME/modules/system/layers/base/javax/servlet/api/main/jboss-servlet-api_4.0_spec-1.0.0.Final.jar

javac -cp $CLASSPATH -Xlint:-serial -sourcepath src -d ./WEB-INF/classes src/*.java

jar cf BloGame.war WEB-INF *.jsp client
cp BloGame.war $JBOSS_HOME/standalone/deployments
