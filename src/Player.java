/**
	@author Pierre Faber
 */

public class Player {

  public String pseudo;
  public int x;
  public int y;
  public int idMap;
  public String bulleGlobal;

  public Player(String pseudo) {
    this.pseudo = pseudo;
    this.x = 0;
    this.y = 0;
    this.idMap = 0;
    this.bulleGlobal = "";
  }

  public Player(String pseudo, int x, int y) {
    this(pseudo);
    this.x = x;
    this.y = y;
    this.idMap = 0;
  }

  public Player(String pseudo, int x, int y, int idMap) {
    this(pseudo, x, y);
    this.idMap = idMap;
  }

  public String getState() {
    return String.format("{\"pseudo\": \"%s\", \"x\": %d, \"y\": %d, \"idMap\": %d, \"bulleGlobal\": \"%s\"}",
      this.pseudo, this.x, this.y, this.idMap, this.bulleGlobal);
  }

}
