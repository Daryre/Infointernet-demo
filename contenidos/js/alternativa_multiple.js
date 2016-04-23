function ocultarAlternativas(respuesta) {
  $(".option").each(function(index, element) {
      var idElement = $(element).attr("id");
      if (idElement != respuesta) {
        $(element).css("visibility", "hidden");
      }
  });
}

function corregir(caller, answer, counter, sigue1, sigue2, justificacion, solucion) {
  $(".option").each(function(index, element) {
    var idElement = $(element).attr("id");
    if (idElement == caller) {
      $(element).css("background-color", "black");
    } else {
      $(element).css("background-color", "white");
    }
  });
  console.log(caller);
  console.log(answer);
  console.log(counter);
  if (caller != answer) {
    counter++;
    $("#counter").val(counter);
  }
  if (counter < 3) {
    if (caller == answer) {
      ocultarAlternativas(caller);
      $(solucion).fadeIn();
    } else if (counter == 1) {
      $(sigue1).fadeIn().delay(700).fadeOut();
    } else {
      $(sigue2).fadeIn().delay(700).fadeOut();
    }
  } else {
    $(justificacion).fadeIn();
    ocultarAlternativas(caller);
  }
}

function cerrarPopUp(element) {
  $(element).parent().fadeOut();
}