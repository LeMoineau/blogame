/**
	@author Paul Bridier
 */

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

import java.util.*;
import java.text.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.PreparedStatement;
import java.sql.Date;


public class Messages extends HttpServlet {
  private static SimpleDateFormat formatter = new SimpleDateFormat("E d MMM yyyy, H:m:s", Locale.FRANCE);

  public void doPost(HttpServletRequest requete, HttpServletResponse reponse) throws ServletException, IOException {
    HttpSession session = requete.getSession();
    //System.out.println("\n\n"+requete.getParameter("obtenirID")+"\n\n");

    //GET PSEUDO AVEC ID
    if (requete.getParameter("obtenirID") != null) {
      reponse.setContentType("text");
      PrintWriter out = reponse.getWriter();

      ResultSet idVerif = ConnexionBD.executeQuery("SELECT pseudo FROM User WHERE iduser=?",
      Arrays.asList(requete.getParameter("obtenirID")));

      try{
        while(idVerif.next()){
          out.write(idVerif.getString("pseudo"));
        }
      }catch(SQLException se){System.out.println("ERREUR BD DANS DO POST");}
    }

    if (requete.getParameter("obtenirIdSession") != null){
      reponse.setContentType("text");
      PrintWriter out = reponse.getWriter();
      out.write(session.getAttribute("iduser").toString());
    }

    else {
      if (requete.getParameter("obtenirPseudo") != null){
        reponse.setContentType("text");
        PrintWriter out = reponse.getWriter();
        out.write(session.getAttribute("pseudo").toString());
      }


      else {

        if (requete.getParameter("champMessage") != null) {
          //System.out.println("Message recu avec :"+requete.getParameter("champMessage"));


          //Dans le canal general, idRecepteur vaut 0.
          int idRecepteur = calculIdRecepteur(requete.getParameter("champMessage").toString());

          int idEmetteur = Integer.parseInt(session.getAttribute("iduser").toString());
          String corpsMessage = calculCorpsMessage(requete.getParameter("champMessage"));
          java.util.Date dateMessage =  new java.util.Date();
          dateMessage.setTime(System.currentTimeMillis());
          String date = formatter.format(dateMessage);
          ErrorEnum e1 = ConnexionBD.executeUpdate("INSERT INTO Messages (idemett,idrecept,datemess,contenum) VALUES (?,?,?,?)",
          Arrays.asList(idEmetteur,idRecepteur,date,corpsMessage));

        }
      }
    }
  }

  public String calculCorpsMessage(String message) {
    String[] messDecoup = message.split(" ");
    if (messDecoup[0].charAt(0) != '/') {
      //On est dans le general, on renvoie 0 :
      return message;
    }
    String newMess = "";
    int cpt = 0;
    for (String s : messDecoup) {
      if (cpt>0)
      newMess+=s+" ";
      cpt++;
    }

    return newMess;
  }

  public int calculIdRecepteur(String message) {
    /**
    1) Salut ça va ?
    2) /admin salut !
    */
    String[] messDecoup = message.split(" ");
    if (messDecoup[0].charAt(0) != '/') {
      //On est dans le general, on renvoie 0 :
      return 0;
    }
    String destinataire = messDecoup[0].replace("/","");
    //On veut obtenir l'id de ce destinaire.
    System.out.println("\nj'essaye de recuperer l'id de "+destinataire+" !!!\n");
    ResultSet idVerif = ConnexionBD.executeQuery("SELECT iduser FROM User WHERE pseudo=?",
    Arrays.asList(destinataire));
    try {
      return Integer.parseInt(idVerif.getString("idUser"));
    }catch(SQLException se){}

      return 0;
    }

    public void doGet(HttpServletRequest requete, HttpServletResponse reponse) throws ServletException, IOException {
      //System.out.println("\n\nJ'ENTRE ICIIIIIIIIIIIIIIIII\n\n");
      reponse.setContentType("application/json; charset=UTF-8");
      //reponse.setContentType("text");
      PrintWriter out = reponse.getWriter();
      boolean premier = true;

      ResultSet resultSet = ConnexionBD.executeQuery("select * from Messages");

      out.write("[\n");
      try{
        while(resultSet.next()){

          if(!premier){
            out.write(",\n");
          } else {
            premier=false;
          }

          out.write("{\n");
          out.write("\"idMess\": \"" + resultSet.getString("idMess") +"\",\n" );
          out.write("\"idEmett\": \"" + resultSet.getString("idEmett") +"\",\n" );
          out.write("\"idRecept\": \"" + resultSet.getString("idRecept") +"\",\n" );
          out.write("\"dateMess\": \"" + resultSet.getString("dateMess") +"\",\n" );
          out.write("\"contenuM\": \"" + resultSet.getString("contenuM") +"\"\n" );
          out.write("}");

        }

        out.write("\n]\n");
        //System.out.println("j'ai fini sans erreur mdr");
      }catch(SQLException e){
        System.out.println("Erreur base DONNeES");
      }
    }
  }
