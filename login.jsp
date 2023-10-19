<!--
@author Paul Bridier & Pierre Faber & Yohann Chenu
-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - BloGame</title>
    <link href="http://fonts.cdnfonts.com/css/games" rel="stylesheet">
    <link href="../client/css/login.css"  rel="stylesheet" type="text/css" />
</head>
<body>
    <h1>BloGame</h1>
    <div class="error-message">
                <div class="main">
                    <form action="CompteServlet" method="POST">
                        <legend> Nouveau compte </legend>
                        <input type="text" name="create_login" placeholder="Login">
                        <% if (request.getAttribute("error")!=null){
                            if (request.getAttribute("error").toString().contains("LOGIN_DEJA_EXISTANT")){%>
                                <p>Le login est pris, choisis en un autre.</p>
                        <% }
                        } %>
                        <input type="text" name="pseudo" placeholder="Pseudo">
                        <% if (request.getAttribute("error")!=null){
                            if (request.getAttribute("error").toString().contains("PSEUDO_DEJA_EXISTANT")){%>
                                <p>Le pseudo est pris, choisis en un autre.</p>
                        <% }
                        } %>
                        <input type="password" name="password" placeholder="Password">
                        <input type="password" name="confirm_password"
                            placeholder="Confirmation password">
                        <% if (request.getAttribute("error")!=null){
                            if (request.getAttribute("error").toString().contains("PASSWORD_PAS_CORRESPONDANT")){%>
                                <p>Heu... Les mots de passe ne correspondent pas.</p>
                        <% }
                            if (request.getAttribute("error").toString().contains("INFORMATION_TROP_LONGUE")){%>
                                <p>C'est pas un peu long ton truc ? (Max 15 car.)</p>
                        <% }
                        } %>
                        <button type="submit"> Validation du compte </button>
                    </form>
                    <form action="CompteServlet" method="POST">
                        <legend> Se connecter </legend>
                        <input type="text" name="connexion_login" placeholder="Login">
                        <% if (request.getAttribute("error")!=null){
                            if (request.getAttribute("error").toString().contains("IDENTIFIANT_INCORRECT")){%>
                            <p>Login incorrect.</p>
                        <% }
                        } %>
                        <input type="password" name="password" placeholder="Password">
                        <% if (request.getAttribute("error")!=null){
                            if (request.getAttribute("error").toString().contains("PASSWORD_INVALID")){%>
                                <p>Mot de passe incorrecte. L'aurais-tu oublier ?</p>
                        <% }
                        } %>
                        <button type="submit"> Connexion </button>
                    </form>
                    <form action="CompteServlet" method="POST">
                        <legend> Sans authentification </legend>
                        <input type="text" name="pseudo" placeholder="Pseudo">
                        <% if (request.getAttribute("error")!=null){
                            if (request.getAttribute("error").toString().contains("PSEUDO_VIDE")){%>
                            <p>Choisis toi un beau nom.</p>
                        <% } 
                        } %>
                        <button type="submit"> jouer sans compte </button>
                    </form>
                </div>
                <% if (request.getAttribute("error")!=null){
                    if (request.getAttribute("error").toString().contains("ERREUR_DB")){%>
                    <p>Oh il se peut qu'il y ait eu un petit souci chez nous.</p>
                <% }
            }
        %>
    </div>
</body>
</html>
