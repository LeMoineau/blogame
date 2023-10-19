/**
 * @author Paul Bridier
 */

pseudoSession = '';
idSession = '';
getIdSession();
getPseudoSession();

let nombreDeMessages =-1;
setInterval(rechercheMessages, 5000);

$("#sendMessage").click(function(e) {
  sendMessage();
});

$("#champMessage").keydown((event) => {
  if (event.keyCode === 13) {
    sendMessage();
  }
})

function sendMessage() {
  console.log($("#envoiMessage").serialize(), "cocou")
  $.ajax({
    type: "POST",
    url: "../Messages",
    data: {champMessage: $("#champMessage").val()}, // serializes the form's elements.
    success: function(data)
    {
      rechercheMessages();
      cleanInputs();
    },error: () => {
      alert('Gros problème');
    }
  });
}

function setPseudoSession(data) {
  pseudoSession = data;
}

function setIdSession(data) {
  idSession = data;
}

function getPseudoSession() {
  $.ajax({
    type: "POST",
    url: "../Messages",
    data:{obtenirPseudo:"obtenirPseudo"},
    success: function(data)
    {
      setPseudoSession(data);
    },error: (error) => {
      console.log(error);
      console.log('Gros problème');
    }
  });
}

function getIdSession() {
  $.ajax({
    type: "POST",
    url: "../Messages",
    data:{obtenirIdSession:"obtenirIdSession"},
    success: function(data)
    {
      setIdSession(data);
    },error: (error) => {
      console.log(error);
      console.log('Gros problème');
    }
  });
}

function cleanInputs() {
  $("#champMessage").val('');
}

function panneauFerme() {
  return document.getElementById("chat").style.display == 'none';
}

function rechercheMessages() {
  let estFerme = panneauFerme();

  if (estFerme == 0) {
    console.log("je recherche message");
    $.ajax({
      type: "GET",
      url: "../Messages",
      dataType: "json",
      success: function(data)
      {
        afficherLesMessages(data);
      },error: (error) => {
        console.log(error);
        console.log('Gros problème');
      }
    });
  }
}

function afficherLesMessages(messages){
  if (messages.length <= nombreDeMessages) {
    //il n'y a pas besoin de reactualiser !
    return;
  }
  nombreDeMessages = messages.length;
  $("#listeMessages").empty();
  messages.forEach(m => {
    let pseudo  = obtenirPseudoAvecId(m["idEmett"], (res)=>{
      if(idSession == m["idRecept"] || (m["idEmett"]==idSession && m["idRecept"]!=0)) {
        //MESSAGE PRIVE
        if(pseudoSession == res) {
          $("#listeMessages").append(`<div class="message messageBleu messagePrive"><p class="contenuMess">${m["contenuM"]}</p><p class="emetteurMess">${res} le ${m["dateMess"]} pour ${m["idRecept"]}</p></div>`);
        }
        else {
          $("#listeMessages").append(`<div class="message messageGris messagePrive"><p class="contenuMess">${m["contenuM"]}</p><p class="emetteurMess">${res} le ${m["dateMess"]} pour ${m["idRecept"]}</p></div>`);
        }
      }
      else {
        if(m["idRecept"] == 0) {
          //MESSAGE GENERAL
          if(pseudoSession == res) {
            $("#listeMessages").append(`<div class="message messageBleu"><p class="contenuMess">${m["contenuM"]}</p><p class="emetteurMess">${res} le ${m["dateMess"]} pour ${m["idRecept"]}</p></div>`);
          }
          else {
            $("#listeMessages").append(`<div class="message messageGris"><p class="contenuMess">${m["contenuM"]}</p><p class="emetteurMess">${res} le ${m["dateMess"]} pour ${m["idRecept"]}</p></div>`);
          }
        }
      }
    });
  });
}

function obtenirPseudoAvecId(id, callback) {
  $.ajax({
    type: "POST",
    url: "../Messages",
    data : {obtenirID:id},
    success: function(data)
    {
      callback(data);
    },error: (error) => {
      console.log(error);
      console.log('Gros problème');
    }
  });
}
