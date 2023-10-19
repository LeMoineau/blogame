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


import java.nio.charset.*;
import java.security.*;

public class CompteServlet extends HttpServlet {

	public final int MAX_INPUT_LENGTH = 15;

	private GameState gameState;

  @Override
  public void init() {
    this.gameState = new GameState();
    System.out.println("\n\ninit!");
  }

	public void doGet(HttpServletRequest requete, HttpServletResponse reponse) throws ServletException, IOException {

		//reponse.setContentType("application/json; charset=UTF-8");

		HttpSession session = requete.getSession();
		String contextPath = requete.getContextPath();
		RequestDispatcher requestDispatcher = null;

		if (session.getAttribute("pseudo") == null) {
			requestDispatcher = requete.getRequestDispatcher("/login.jsp");
			requestDispatcher.forward(requete, reponse);
			//reponse.sendRedirect(contextPath + "/login.jsp");
		} else {
			reponse.sendRedirect(contextPath + "/Servlet/AntiCheatServlet");
		}

	}

	public void doPost(HttpServletRequest requete, HttpServletResponse reponse) throws ServletException, IOException {

		HttpSession session = requete.getSession();
		String contextPath = requete.getContextPath();

		if (requete.getParameter("deconnexion") != null) {

			gameState.deconnexionJoueur((String)session.getAttribute("pseudo"));
			session.setAttribute("pseudo", null);

		} else if (requete.getParameter("connexion_login") != null) {

			String login = requete.getParameter("connexion_login");
			String password = requete.getParameter("password");

			ErrorEnum error = this.seConnecter(login, password, session);
			if (error.equals(ErrorEnum.PAS_D_ERREUR)) {
				reponse.sendRedirect(contextPath + "/Servlet/AntiCheatServlet");
			} else {
				requete.setAttribute("error", error);
			}

		} else if (requete.getParameter("create_login") != null) {

			String login = requete.getParameter("create_login");
			String password = requete.getParameter("password");
			String confirm_password = requete.getParameter("confirm_password");
			String pseudo = requete.getParameter("pseudo");

			ErrorEnum error = this.creerNouveauCompte(login, pseudo, password, confirm_password);
			System.out.println("\nError creation compte: " + error);
			if (error.equals(ErrorEnum.PAS_D_ERREUR)) {
				session.setAttribute("pseudo", pseudo);
				fixerIdUser(pseudo, session);
				reponse.sendRedirect(contextPath + "/Servlet/AntiCheatServlet");
			} else {
				requete.setAttribute("error", error);
			}

		} else if (requete.getParameter("pseudo") != null) {

			String pseudo = requete.getParameter("pseudo");

			ErrorEnum error = creerJoueurTemporaire(pseudo);
			if (error.equals(ErrorEnum.PAS_D_ERREUR)) {
				session.setAttribute("pseudo", pseudo);
				fixerIdUser(pseudo, session);
				reponse.sendRedirect(contextPath + "/Servlet/AntiCheatServlet");
			} else {
				requete.setAttribute("error", error);
			}

		}

		RequestDispatcher requestDispatcher = requete.getRequestDispatcher("/login.jsp");
		requestDispatcher.forward(requete, reponse);
	}

	public void fixerIdUser(String pseudo, HttpSession session) {
		ResultSet idVerif = ConnexionBD.executeQuery("SELECT iduser FROM User WHERE pseudo=?",
		Arrays.asList(pseudo));
		if (!Utils.isEmpty(idVerif)) {
			try {
				session.setAttribute("iduser", idVerif.getString("iduser"));
				idVerif.close();
			} catch(SQLException e) {
				System.out.println("Erreur: " + e.getMessage());
			}
		}
	}

	public String hacherPass(String pass) {
		try {
			MessageDigest msg = MessageDigest.getInstance("SHA-256");
			byte[] hash = msg.digest(pass.getBytes(StandardCharsets.UTF_8));
			// convertir bytes en hexadecimal
			StringBuilder s = new StringBuilder();
			for (byte b : hash) {
				s.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
			}
			System.out.println(s.toString());

			return s.toString();
		}catch(NoSuchAlgorithmException nsae){}
		return null;
	}

	public ErrorEnum creerNouveauCompte(String login, String pseudo, String password, String passwordConfirm) {
		ConnexionBD.close();
		try {
			if (password.equals(passwordConfirm) && password.length() > 0) {
				if (login.length() > 0 && login.length() <= MAX_INPUT_LENGTH && pseudo.length() > 0 && pseudo.length() <= MAX_INPUT_LENGTH) {
					ResultSet loginVerif = ConnexionBD.executeQuery("SELECT * FROM user WHERE login=?", Arrays.asList(login));
					if (Utils.isEmpty(loginVerif)) {
						loginVerif.close();
						ResultSet pseudoVerif = ConnexionBD.executeQuery("SELECT * FROM user WHERE pseudo=?", Arrays.asList(pseudo));
						if (Utils.isEmpty(pseudoVerif)) {
							pseudoVerif.close();

							String passHache = hacherPass(password);

							ConnexionBD.executeUpdate("INSERT INTO user (role, login, pseudo, password) VALUES (?,?,?,?);",
								Arrays.asList(1, login, pseudo, passHache));
							ConnexionBD.executeUpdate("INSERT INTO player (x, y, idMap, pseudo, conversations) VALUES(?,?,?,?,?);",
								Arrays.asList(0, 0, 0, pseudo, ""));
							ConnexionBD.executeUpdate("INSERT INTO map (nbLike, blocks, pseudoOwner, name) VALUES(?,?,?,?);",
								Arrays.asList(0, "", pseudo, "Nouveau monde"));
							return ErrorEnum.PAS_D_ERREUR;
						} else {
							return ErrorEnum.PSEUDO_DEJA_EXISTANT;
						}
					} else {
						return ErrorEnum.LOGIN_DEJA_EXISTANT;
					}
				} else {
					return ErrorEnum.INFORMATION_TROP_LONGUE;
				}
			} else {
				return ErrorEnum.PASSWORD_PAS_CORRESPONDANT;
			}
		} catch (SQLException e) {
			System.out.println("Erreur creation Nouveau compte: " + e.getMessage());
			return ErrorEnum.ERREUR_DB;
		} finally {
			ConnexionBD.close();
		}
	}

	public ErrorEnum seConnecter(String login, String password, HttpSession session) {
		password = hacherPass(password);
		try {
			ResultSet connexionVerif = ConnexionBD.executeQuery("SELECT pseudo FROM user WHERE login=? AND password=?", Arrays.asList(login, password));
			if (!Utils.isEmpty(connexionVerif)) {
				session.setAttribute("pseudo", connexionVerif.getString("pseudo"));
				fixerIdUser(connexionVerif.getString("pseudo"), session);
				connexionVerif.close();
				return ErrorEnum.PAS_D_ERREUR;
			} else {
				return ErrorEnum.IDENTIFIANT_INCORRECT;
			}
		} catch (SQLException e) {
			return ErrorEnum.ERREUR_DB;
		} finally {
			ConnexionBD.close();
		}
	}

	public ErrorEnum creerJoueurTemporaire(String pseudo) {
		if (pseudo.length() > 0 && pseudo.length() <= MAX_INPUT_LENGTH) {
			return gameState.addPseudoJoueurTemporaire(pseudo);
		} else {
			return ErrorEnum.PSEUDO_VIDE;
		}
	}

}
