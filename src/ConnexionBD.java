/**
	@author Paul Bridier & Pierre Faber
 */
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

import java.util.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.PreparedStatement;

public class ConnexionBD {

  private static final String DBPath = "D:/Documents/INSA/Cours/TechnoWeb/bloGame/projet-blogame/bd/Blogame.db";
  private static Connection connection = null;
  private static Statement statement = null;

  public static boolean connect() {
    if (connection == null) {
      try {
        Class.forName("org.sqlite.JDBC");
        connection = DriverManager.getConnection("jdbc:sqlite:" + DBPath);
        statement = ConnexionBD.connection.createStatement();
        System.out.println("Connexion à la base de donnees " + DBPath + " reussie !");
        return true;
      } catch (SQLException sqlException) {
        sqlException.printStackTrace();
        System.out.println("Erreur de connexion à la base de donnees " + DBPath);
      } catch (ClassNotFoundException cnf) {
        System.out.println("Erreur lors du chargement du driver JDBC: " + cnf);
      }
    } else {
      return true;
    }
    return false;
  }

  public static void close() {
    try {
      if (ConnexionBD.connection != null) {
        ConnexionBD.connection.close();
        ConnexionBD.connection = null;
      }
    } catch (SQLException e) {
      System.out.println("Erreur lors de la fermeture de la connexion: " + e.getMessage());
    }
  }

  public static boolean estEntier(Object o) {
    try {
      int entier = Integer.parseInt(o.toString());
      return true;
    }catch(Exception e){return false;}
  }

  public static ResultSet executeQuery(String requete) {
    boolean result = ConnexionBD.connect();
    if(result){
      if(ConnexionBD.connection != null){
        PreparedStatement preparedStatement = null;
        try {
          preparedStatement = ConnexionBD.connection.prepareStatement(requete);
          ResultSet res = preparedStatement.executeQuery();
          return res;
        } catch (SQLException e) {
          System.out.println("Erreur de lecture de la base de donnees " + DBPath + ": " + e.getMessage());
          //log(e.getMessage());
          return null;
        }
      }
    }
    return null;
  }

  public static ResultSet executeQuery(String requete, List<Object> args) {
    boolean result = ConnexionBD.connect();
    if(result){
      if(ConnexionBD.connection != null){
        PreparedStatement preparedStatement = null;
        try {
          preparedStatement = ConnexionBD.connection.prepareStatement(requete);
          int compteur = 1;
          for (Object current: args) {
            if (ConnexionBD.estEntier(current)) {
              preparedStatement.setInt(compteur, Integer.parseInt(current.toString()));
            } else {
              preparedStatement.setString(compteur, current.toString());
            }
            compteur += 1;
          }
          ResultSet res = preparedStatement.executeQuery();
          return res;
        } catch (SQLException e) {
          System.out.println("Erreur de lecture de la base de donnees " + DBPath + ": " + e.getMessage());
          //log(e.getMessage());
          return null;
        }
      }
    }
    return null;
  }

  public static ErrorEnum executeUpdate(String requete, List<Object> args) {
    boolean result = ConnexionBD.connect();
    if(result) {
      if(ConnexionBD.connection != null){
        PreparedStatement preparedStatement = null;
        try {
          preparedStatement = ConnexionBD.connection.prepareStatement(requete);
          int compteur = 1;
          for (Object current: args) {
            if (ConnexionBD.estEntier(current)) {
              preparedStatement.setInt(compteur, Integer.parseInt(current.toString()));
            } else {
              preparedStatement.setString(compteur, (String)(current));
            }
            compteur += 1;
          }

          preparedStatement.executeUpdate();
          preparedStatement.close();
          ConnexionBD.close();
          return ErrorEnum.PAS_D_ERREUR;
        } catch (SQLException e) {
          System.out.println("Erreur de lecture de la base de donnees " + DBPath + ": " + e.getMessage());
          //log(e.getMessage());
          return ErrorEnum.ERREUR_DB;
        }
      }
    }
    return ErrorEnum.ERREUR_DB;


  }

}
