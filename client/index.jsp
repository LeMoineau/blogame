<!-- 
   @author Paul Bridier & Pierre Faber
  -->
<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title> bloGame </title>
    <!-- lib -->
    <script type="text/javascript" src="./lib/jquery-3.3.1.min.js"> </script>
    <!-- style -->
    <link rel="stylesheet" href="./css/global.css">
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="./css/styleMessage.css">
    <!-- main js -->
    <script type="text/javascript" src="./js/enums.js"> </script>
    <script type="text/javascript" src="./js/game.js"> </script>
    <script type="text/javascript" src="./js/multiplayerManager.js"> </script>
    <script type="text/javascript" src="./js/map.js"> </script>
    <script type="text/javascript" src="./js/uiManager.js"> </script>
    <script type="text/javascript" src="./js/texture.js"> </script>
    <script type="text/javascript" src="./js/utils.js"> </script>
    <!-- animations -->
    <script type="text/javascript" src="./js/animations/animation.js"> </script>
    <script type="text/javascript" src="./js/animations/playerAnimation.js"> </script>
    <script type="text/javascript" src="./js/animations/playerIdleAnimation.js"> </script>
    <script type="text/javascript" src="./js/animations/playerWalkAnimation.js"> </script>
    <script type="text/javascript" src="./js/animations/playerRunAnimation.js"> </script>
    <!-- entities -->
    <script type="text/javascript" src="./js/entities/player.js"> </script>
    <script type="text/javascript" src="./js/entities/animator.js"> </script>
    <script type="text/javascript" src="./js/entities/playerAnimator.js"> </script>
    <script type="text/javascript" src="./js/entities/playerListener.js"> </script>
    <script type="text/javascript" src="./js/entities/bulleGlobal.js"> </script>
    <!-- blocks -->
    <script type="text/javascript" src="./js/blocks/blockData.js"> </script>
    <script type="text/javascript" src="./js/blocks/block.js"> </script>
    <script type="text/javascript" src="./js/blocks/grass.js"> </script>
    <script type="text/javascript" src="./js/blocks/grassWhiteFlower.js"> </script>
    <script type="text/javascript" src="./js/blocks/wall.js"> </script>
    <script type="text/javascript" src="./js/blocks/wall2.js"> </script>
    <script type="text/javascript" src="./js/blocks/wall3.js"> </script>
    <script type="text/javascript" src="./js/blocks/wall4.js"> </script>
    <script type="text/javascript" src="./js/blocks/sign.js"> </script>
    <script type="text/javascript" src="./js/blocks/imagePane.js"> </script>
    <script type="text/javascript" src="./js/blocks/portalBlog.js"> </script>
    <script type="text/javascript" src="./js/blocks/portalCreator.js"> </script>
    <script type="text/javascript" src="./js/blocks/tree.js"> </script>
    <script type="text/javascript" src="./js/blocks/fountain.js"> </script>
    <script type="text/javascript" src="./js/blocks/path.js"> </script>
    <script type="text/javascript" src="./js/blocks/water.js"> </script>
    <script type="text/javascript" src="./js/blocks/rock.js"> </script>
    <script type="text/javascript" src="./js/blocks/house.js"> </script>
    <script type="text/javascript" src="./js/blocks/building.js"> </script>
    <script type="text/javascript" src="./js/blocks/triggerBlog.js"> </script>
    <script type="text/javascript" src="./js/blocks/triggerCreator.js"> </script>
    <!-- ui -->
    <script type="text/javascript" src="./js/ui/basicUI.js"> </script>
    <script type="text/javascript" src="./js/ui/textMeshUI.js"> </script>
    <script type="text/javascript" src="./js/ui/dialogBox.js"> </script>
    <script type="text/javascript" src="./js/ui/imageBox.js"> </script>
    <script type="text/javascript" src="./js/ui/inputBox.js"> </script>
    <script type="text/javascript" src="./js/ui/mapChooser.js"> </script>
    <script type="text/javascript" src="./js/ui/chatBox.js"> </script>
    <!-- to remove -->
    <script type="text/javascript" src="./map/maps.js"> </script>
  </head>
  <body>

    <%
      if(session.getAttribute("pseudo") == null) {
        response.sendRedirect("../Servlet/CompteServlet");
      }
    %>

    <canvas id="canvas"></canvas>

    <form class="deconnexion-button" action="../Servlet/CompteServlet" method="POST">
        <button type="submit" name="deconnexion"> Se deconnecter </button>
    </form>

    <div class="chatGeneral" id="chat" style="display: none;">
        <div class="titreMessage"><h1>Messages</h1><button id="chat-close-button">Reduire</button></div>
        <div class="listeMessages" id="listeMessages"> </div>
        <div class="envoyerMessage">
            <div id="envoiMessage">
                <input type="text" name="champMessage" id="champMessage">
                <button type="button" id="sendMessage">Envoyer</button>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="./js/main.js"> </script>
    <script type="text/javascript" src="./js/chat.js"> </script>
  </body>
</html>
