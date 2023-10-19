/**
	@author Paul Bridier & Pierre Faber & Yohann Chenu
 */

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

import java.util.*;
import java.sql.*;

import com.google.gson.*;
import static java.util.stream.Collectors.toList;

public class GameState {

  public HashMap<String, Player> playersConnected = new HashMap<>();
  public ArrayList<String> pseudosJoueurTemporaire = new ArrayList<>();

  public GameState() {

  }

  public boolean playerIsAlreadyConnected(String pseudo) {
    return this.playersConnected.containsKey(pseudo);
  }

  public ErrorEnum createNewPlayer(String pseudo) {
    ResultSet playerBD = ConnexionBD.executeQuery("SELECT * FROM player WHERE pseudo=?", Arrays.asList(pseudo));
    try {
      //Player p = new Player(pseudo, playerBD.getInt("x"), playerBD.getInt("y"), playerBD.getInt("idMap"));
      Player p = new Player(pseudo, 0, 0, 0);
      this.playersConnected.put(pseudo, p);
      playerBD.close();
      return ErrorEnum.PAS_D_ERREUR;
    } catch (SQLException e) {
      return ErrorEnum.ERREUR_DB;
    }
  }

  public ErrorEnum connectNewPlayer(String pseudo) {
    if (!this.playerIsAlreadyConnected(pseudo)) {
      return this.createNewPlayer(pseudo);
    }

    return ErrorEnum.PAS_D_ERREUR;
  }

  public ErrorEnum addPseudoJoueurTemporaire(String pseudo) {
    if (!this.pseudosJoueurTemporaire.contains(pseudo)) {
      ResultSet pseudoVerif = ConnexionBD.executeQuery("SELECT * from User WHERE pseudo=?", Arrays.asList(pseudo));
      if (Utils.isEmpty(pseudoVerif)) {
        this.pseudosJoueurTemporaire.add(pseudo);
        return ErrorEnum.PAS_D_ERREUR;
      } else {
        return ErrorEnum.PSEUDO_DEJA_EXISTANT;
      }
    } else {
      return ErrorEnum.PSEUDO_DEJA_EXISTANT;
    }
  }

  public void deconnexionJoueur(String pseudo) {
    if (this.pseudosJoueurTemporaire.contains(pseudo)) {
      this.pseudosJoueurTemporaire.remove(pseudo);
    } else if (this.playersConnected.containsKey(pseudo)) {
      this.playersConnected.remove(pseudo);
    }
  }

  public Player getPlayer(String pseudo) {
    return this.playersConnected.get(pseudo);
  }

  public void updatePlayer(String pseudo, String state) {
    JsonObject jsonObject = JsonParser.parseString(state).getAsJsonObject();
    Player p = this.getPlayer(pseudo);

    p.x = jsonObject.get("x").getAsInt();
    p.y = jsonObject.get("y").getAsInt();
    p.idMap = jsonObject.get("idMap").getAsInt();
    p.bulleGlobal = jsonObject.get("bulleGlobal").getAsString();
  }

  public void teleporterPlayer(String pseudo, String state) {
    JsonObject jsonObject = JsonParser.parseString(state).getAsJsonObject();
    Player p = this.getPlayer(pseudo);
    System.out.println(state);

    try {
      ResultSet result = ConnexionBD.executeQuery("SELECT idMap FROM map WHERE pseudoOwner=?", Arrays.asList(jsonObject.get("owner").getAsString()));

      if (!Utils.isEmpty(result)) {
        p.idMap = result.getInt("idMap");
      }

      result.close();
    } catch (SQLException e) {
      System.out.println("erreur: " + e.getMessage());
    }
  }

  public String getState(String pseudo) {
    Player player = this.getPlayer(pseudo);
    if (player == null) {
      return "{\"players\": []}";
    } else {
      List<Player> playersInSameMap = this.playersConnected.entrySet()
        .stream()
        .filter(p -> p.getValue().idMap == player.idMap)
        .map(Map.Entry::getValue)
        .collect(toList());
      String res = "{\"players\":[";
      int index = 0;
      Boolean playerAdded = false;
      for (int i = 0; i<playersInSameMap.size(); i++) {
        if (!playersInSameMap.get(i).equals(player)) {
          playerAdded = true;
          res += playersInSameMap.get(i).getState() + ",";
        }
      }
      res = playerAdded ? res.substring(0, res.length() - 1) + "]}" : res + "]}";
      return res;
    }
  }

}
