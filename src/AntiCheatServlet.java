/**
   @author Pierre Faber

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

import com.google.gson.*;
import java.lang.reflect.Type;
import com.google.gson.reflect.TypeToken;

public class AntiCheatServlet extends HttpServlet {

	private GameState gameState;

	@Override
	public void init() {
		this.gameState = new GameState();
	}

	public void doGet(HttpServletRequest requete, HttpServletResponse reponse) throws ServletException, IOException {

		//reponse.setContentType("application/json; charset=UTF-8");

		HttpSession session = requete.getSession();
		String contextPath = requete.getContextPath();
		RequestDispatcher requestDispatcher = null;

		if (session.getAttribute("pseudo") == null) {
		reponse.sendRedirect(contextPath + "/Servlet/CompteServlet");
		} else {
		reponse.sendRedirect(contextPath + "/client/");
		}
	}

	//Use only in AJAX request
	public void doPost(HttpServletRequest requete, HttpServletResponse reponse) throws ServletException, IOException {
		HttpSession session = requete.getSession();
		String eventType = requete.getParameter("eventType").toString();
		String state = requete.getParameter("state").toString();

		if (session.getAttribute("pseudo") != null) {
		String pseudo = session.getAttribute("pseudo").toString();

		if (eventType.equals("initPlayer")) {
			this.gameState.connectNewPlayer(pseudo);
			this.sendJSON(reponse, this.gameState.getPlayer(pseudo).getState());
		} else if (eventType.equals("playerState")) {
			if (this.peutSeDeplacer(pseudo, state)) {
			this.gameState.updatePlayer(pseudo, state);
			}
		} else if (eventType.equals("gameState")) {
			this.sendJSON(reponse, this.gameState.getState(pseudo));
		} else if (eventType.equals("changeMap")) {
			String map = this.peutAllerDansMap(pseudo, state);
			this.sendJSON(reponse, map);
			this.gameState.teleporterPlayer(pseudo, state);
		} else if (eventType.equals("searchMap")) {
			String maps = this.prendreToutesLesMap(pseudo, state);
			this.sendJSON(reponse, maps);
		} else if (eventType.equals("initOwnMap")) {
			if (session.getAttribute("adminMapModify") != null) {
			String map = session.getAttribute("adminMapModify").toString();
			this.sendJSON(reponse, map);
			} else {
			String map = this.prendrePropreMap(pseudo);
			this.sendJSON(reponse, map);
			}
		} else if (eventType.equals("saveMap")) {
			this.peutModifierMap(session, state);
		} else if (eventType.equals("playerDeconnexion")) {
			this.gameState.deconnexionJoueur(pseudo);
		} else if (eventType.equals("adminModify")) {
			String map = this.prendrePropreMap(state.substring(1, state.length()-1));
			session.setAttribute("adminMapModify", map);
		} else if (eventType.equals("leaveLike")) {
			String res = "{\"nbLike\": 0}";
			if (this.leaveLike(pseudo)) {
			res = "{\"nbLike\": 1}";
			}
			this.sendJSON(reponse, res);
		}
		}
	}

	public boolean isAdmin(String pseudo) {
		try {
		ResultSet isAdmin = ConnexionBD.executeQuery("SELECT role FROM user WHERE pseudo=?",
			Arrays.asList(pseudo));
		boolean res = false;
		if (!Utils.isEmpty(isAdmin)) {
			res = isAdmin.getInt("role") == 0;
		}
		isAdmin.close();
		return res;
		} catch (SQLException e) {
		System.out.println("Erreur: " + e.getMessage());
		return false;
		}
	}

	public boolean leaveLike(String pseudo) {
		if (this.isAdmin(pseudo)) {
		Player p = this.gameState.getPlayer(pseudo);
		ConnexionBD.executeUpdate("UPDATE map SET nbLike=? WHERE idMap=?",
			Arrays.asList(1, p.idMap));
		ConnexionBD.close();
		return true;
		}
		return false;
	}

	public String prendreToutesLesMap(String pseudo, String state) {
		JsonObject jsonObject = JsonParser.parseString(state).getAsJsonObject();
		try {
		ResultSet result = ConnexionBD.executeQuery("SELECT * FROM map WHERE name LIKE ? OR pseudoOwner LIKE ?",
			Arrays.asList("%" + jsonObject.get("name").getAsString() + "%", "%" + jsonObject.get("name").getAsString() + "%"));
		String res = "{\"maps\":[";
		Boolean first = true;
		while (result.next()) {
			if (!first) {
			res += ",";
			}
			res += String.format("{\"name\": \"%s\", \"owner\": \"%s\"}", result.getString("name"), result.getString("pseudoOwner"));
			first = false;
		}
		res += "]}";
		result.close();
		ConnexionBD.close();
		return res;
		} catch (SQLException e) {
		System.out.println("Erreur: " + e.getMessage());
		return "{\"maps\": []}";
		}
	}

	public String getOwnerOfMapById(int idMap) {
		try {
		ResultSet result = ConnexionBD.executeQuery("SELECT pseudoOwner FROM map WHERE idMap=?", Arrays.asList(idMap));
		if (!Utils.isEmpty(result)) {
			return String.format("{\"owner\": \"%s\"}", result.getString("pseudoOwner"));
		}
		} catch (SQLException e) {
		System.out.println("Erreur: " + e.getMessage());
		}
		return "{\"owner\": \"\"}";
	}

	public String peutAllerDansMap(String pseudo, String state) {
		System.out.println(state);
		JsonObject jsonObject = JsonParser.parseString(state).getAsJsonObject();
		String res = String.format("{\"name\": \"Nouveau monde\", \"owner\": \"%s\", \"blocks\": [], \"nbLike\": 0}",
		pseudo);
		try {
		ResultSet result = ConnexionBD.executeQuery("SELECT * FROM map WHERE pseudoOwner=?",
			Arrays.asList(jsonObject.get("owner").getAsString()));
		String blocksIDs = "";
		while (result.next()) {
			res = String.format("{\"idMap\": %d, \"name\": \"%s\", \"owner\": \"%s\", \"nbLike\": %d, ",
			result.getInt("idMap"), result.getString("name"), result.getString("pseudoOwner"), result.getInt("nbLike"));
			blocksIDs = result.getString("blocks");
		}
		result.close();
		Boolean first = true;
		String blocks = "[";
		for (String blockID: blocksIDs.split(",")) {
			if (!first) {
			blocks += ",";
			}
			ResultSet getBlockInfo = ConnexionBD.executeQuery("SELECT * FROM block WHERE idBlock=?", Arrays.asList(blockID));
			if (!Utils.isEmpty(getBlockInfo)) {
			blocks += String.format("{\"type\": \"%s\", \"x\": %d, \"y\": %d, \"z\": %d, \"solid\": %b, \"width\": %d, \"height\": %d, \"metadata\": %s}",
				getBlockInfo.getString("type"), getBlockInfo.getInt("x"), getBlockInfo.getInt("y"), getBlockInfo.getInt("z"),
				getBlockInfo.getInt("solid") == 1 ? true : false, getBlockInfo.getInt("width"), getBlockInfo.getInt("height"), getBlockInfo.getString("metadata"));
			}
			getBlockInfo.close();
			first = false;
		}
		blocks += "]";
		res += String.format("\"blocks\": %s", blocks);
		if (this.isAdmin(pseudo)) {
			res += ", \"isAdmin\": true";
		} else {
			res += ", \"isAdmin\": false";
		}
		res += "}";
		return res;
		} catch(SQLException e) {
		System.out.println("Erreur: " + e.getMessage());
		return res;
		}
	}

	public String prendrePropreMap(String pseudo) {
		return this.peutAllerDansMap(pseudo, String.format("{\"owner\": \"%s\"}", pseudo));
	}

	public boolean peutSeDeplacer(String pseudo, String state) {
		return this.gameState.playerIsAlreadyConnected(pseudo);
	}

	public boolean peutModifierMap(HttpSession session, String state) {
		String pseudo = session.getAttribute("pseudo").toString();
		JsonObject jsonObject = JsonParser.parseString(state).getAsJsonObject();
		JsonArray jsonArr = jsonObject.getAsJsonArray("blocks");

		Gson gJson = new Gson();
		Type listType = new TypeToken<ArrayList<JsonObject>>() {}.getType();
		ArrayList<JsonObject> jsonObjList = gJson.fromJson(jsonArr, listType);

		String blocksIDs = "";
		Boolean first = true;
		for (JsonObject b: jsonObjList) {
		String type = b.get("type").getAsString();
		int x = b.get("x").getAsInt();
		int y = b.get("y").getAsInt();
		int z = b.get("z").getAsInt();
		int solid = b.get("solid").getAsBoolean() ? 1 : 0;
		int width = b.get("width").getAsInt();
		int height = b.get("height").getAsInt();
		String metadata = b.get("metadata").getAsString();
		try {
			if (!first) {
			blocksIDs += ",";
			}
			ResultSet result = ConnexionBD.executeQuery("SELECT idBlock FROM block WHERE type=? AND x=? AND y=? AND z=? AND solid=? AND width=? AND height=? AND metadata=?",
			Arrays.asList(type, x, y, z, solid, width, height, metadata));
			if (!Utils.isEmpty(result)) {
			blocksIDs += result.getString("idBlock");
			result.close();
			} else {
			result.close();
			ConnexionBD.executeUpdate("INSERT INTO block (type, x, y, z, solid, width, height, metadata) VALUES (?,?,?,?,?,?,?,?)",
				Arrays.asList(type, x, y, z, solid, width, height, metadata));
			ConnexionBD.close();
			ResultSet getBlockId = ConnexionBD.executeQuery("SELECT idBlock FROM block WHERE type=? AND x=? AND y=? AND z=? AND solid=? AND width=? AND height=? AND metadata=?",
				Arrays.asList(type, x, y, z, solid, width, height, metadata));
			if (!Utils.isEmpty(getBlockId)) {
				blocksIDs += getBlockId.getString("idBlock");
			}
			getBlockId.close();
			}
			first = false;
			ConnexionBD.close();
		} catch(SQLException e) {
			System.out.println("Erreur: " + e.getMessage());
		}
		}
		ConnexionBD.close();
		String target = pseudo;
		if (session.getAttribute("adminMapModify") != null) {
		String map = session.getAttribute("adminMapModify").toString();
		JsonObject j2 = JsonParser.parseString(map).getAsJsonObject();
		target = j2.get("owner").getAsString();
		}
		ConnexionBD.executeUpdate("UPDATE map SET name=?, blocks=? WHERE pseudoOwner=?",
		Arrays.asList(jsonObject.get("name").getAsString(), blocksIDs, target));
		ConnexionBD.close();
		return false;
	}

	public void sendJSONError(HttpServletResponse reponse, String error) throws ServletException, IOException {
		this.sendJSON(reponse, String.format("{\"error\": \"%s\"}", error));
	}

	public void sendJSON(HttpServletResponse reponse, String json) throws ServletException, IOException {
		reponse.setContentType("application/json; charset=UTF-8");
		PrintWriter out = reponse.getWriter();
		out.write(json);
	}

}
