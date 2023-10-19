<!-- 
   @author Paul Bridier
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
    <link rel="stylesheet" href="./css/creator.css">
    <!-- main js -->
    <script type="text/javascript" src="./js/enums.js"> </script>
    <script type="text/javascript" src="./js/game.js"> </script>
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
    <!-- creator -->
    <script type="text/javascript" src="./js/mapcreator/creatorManager.js"> </script>
    <script type="text/javascript" src="./js/mapcreator/htmlCreatorManager.js"> </script>
    <script type="text/javascript" src="./js/mapcreator/cameraCreator.js"> </script>
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

    <input type="text" id="input-map-name" placeholder="nom du monde" value="Nouveau monde">

    <nav id="nav-creator" class="nav">

    </nav>

    <nav id="nav-material-chooser" class="nav">
      <canvas id="material-chooser-canvas"></canvas>
    </nav>

    <form class="deconnexion-button" action="../Servlet/CompteServlet" method="POST">
        <button type="submit" name="deconnexion"> Se deconnecter </button>
    </form>

    <button class="demande-aide" onclick="demanderAide()">
      Aide
    </button>

    <div class="panneauAide" id="panneauAide" style="display: none;">
      <pre id="affichage-texte-aide">
        <h3 id="bvnMonde">Bienvenue dans la creation de votre monde !</h3>

        Pour modifier le nom de ce dernier, vous pouvez cliquer sur le texte "Nouveau Monde", et l'editer directement.

        Pour ajouter un bloc, clickez sur le bouton "Ajouter un nouveau bloc".
        Automatiquement, un bloc d'herbe est selectionne. Si vous voulez les modifier, cliquez sur "edit".
        Vous pourrez alors choisir differents types de bloc.
        Vous pouvez regler ses parametres en ajustant les curseurs.
        Le parametre "solid" indique si vous pouvez ou non traverser l'objet.
        Le parametre z correspond au "z-index" en css, c'est-a-dire sa place par rapport au plan.

        Pour rajouter un nouveau bloc, il faut aller en bas du panneau des elements et cliquer sur "Ajouter un nouveau bloc".
        Vous pourrez toujours modifier les anciens blocs depuis le panneau de droite. Pour modifier un element qui n'est plus present dans le panneau de droit, deplacer le curseur rectangulaire avec les fleches directionnelles vers l'objet puis appuyez sur "Espace". (Comme si vous visiez l'objet).

        Avant de retourner au jeu grace au bouton "Retourner au jeu", il faut penser a SAUVEGARDER votre monde avec le bouton "Sauvegarder la map".
      </pre>
    </div>

    <script type="text/javascript" src="./js/mapcreator/main.js"> </script>

    <script>
      function demanderAide() {
        let d = document.getElementById("panneauAide");
        if (d.style.display == 'none')
          d.style.display = 'initial';
        else
          d.style.display = 'none';
      }
    </script>
  </body>
</html>
