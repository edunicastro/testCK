var app = new function() {
  this.generateTableRow = cliente => {
    var data = "";
    data += '<tr key="' + cliente.id + '">';
    data += "<td>" + cliente.nome + "</td>";
    data += "<td>" + cliente.sobrenome + "</td>";
    data += "<td>" + cliente.endereco + "</td>";
    data += '<td><div id="editButton">Editar</div></td>';
    data += '<td><div id="delButton">Deletar</div></td>';
    data += "</tr>";
    return data;
  };

  this.FetchAll = () => {
    return $.get("api/index.php");
  };

  this.Add = formDataObj => {
    return $.post("api/index.php?acao=add", formDataObj);
  };

  this.Delete = id => {
    if (id == parseInt(id, 10)) {
      return $.get("api/index.php?acao=delete&id=" + id);
    }
  };

  this.Edit = formDataObj => {
    if (formDataObj.id == parseInt(formDataObj.id, 10)) {
      return $.post("api/index.php?acao=update", formDataObj);
    }
  };

  // Sets app.clientes to hold an array with all clients
  this.FetchAll().then(clientes => {
    this.clientes = clientes;
  });
}();

window.onload = event => {
  $root = document.getElementById("mainContainer");
  $loader = document.getElementById("loader");
  $formulario = document.getElementById("formularioContainer");
  $tabela = document.getElementById("tabelaContainer");
  $loader.innerHTML = "";

  $.get("views/formulario.php", function(text) {
    $formulario.innerHTML = text;
  });

  $.get("views/tabela.php", function(text) {
    $tabela.innerHTML += text;
  });

  app.FetchAll().then(clientes => {
    clientes.forEach(function(cliente) {
      appendToAddressTable(cliente);
    });
  });

  // Primeiro carregamos todos os dados que já estão no BD e colocamos na página:
};

const appendToAddressTable = cliente => {
  $("#tabelaContainer table tbody").append(app.generateTableRow(cliente));
};

const removeLineFromTable = delButton => {
  delButton
    .parent()
    .parent()
    .remove();
};

const getIdFromTr = clickedButton => {
  return clickedButton
    .parent()
    .parent()
    .attr("key");
};

const getTr = clickedButton => {
  return clickedButton.parent().parent();
};

const getClienteIntoForm = cliente => {
  $("#insertAddressForm input[name='nome']").val(cliente.nome);
  $("#insertAddressForm input[name='sobrenome']").val(cliente.sobrenome);
  $("#insertAddressForm input[name='endereco']").val(cliente.endereco);
};

const getClient = clickedButton => {
  let id = getIdFromTr(clickedButton);
  let cliente = { id };
  let i = 0;

  getTr(clickedButton)
    .children()
    .each(function() {
      switch (i) {
        case 0:
          cliente.nome = $(this)
            .find("input")
            .val();
          break;
        case 1:
          cliente.sobrenome = $(this)
            .find("input")
            .val();
          break;
        case 2:
          cliente.endereco = $(this)
            .find("textarea")
            .val();
          break;
      }
      i++;
    });

  return cliente;
};

const editClient = clickedButton => {
  let id = getIdFromTr(clickedButton);
  let cliente = { id };
  let i = 0;

  getTr(clickedButton)
    .children()
    .each(function() {
      switch (i) {
        case 0:
          cliente.nome = $(this).html();
          $(this).replaceWith(
            '<td><input type="text" value="' + cliente.nome + '" /></td>'
          );
          break;
        case 1:
          cliente.sobrenome = $(this).html();
          $(this).replaceWith(
            '<td><input type="text" value="' + cliente.sobrenome + '" /></td>'
          );
          break;
        case 2:
          cliente.endereco = $(this).html();
          $(this).replaceWith(
            "<td><textarea style='height: " +
              ($(this)
                .parent()
                .height() -
                0) +
              "px;'>" +
              cliente.endereco +
              "</textarea></td>"
          );
          break;
        case 3:
          $(this)
            .find("div")
            .html("Salvar");
          break;
        default:
      }
      i++;
    });

  return cliente;
};

const refreshEditRow = clickedButton => {
  let id = getIdFromTr(clickedButton);
  let cliente = { id };
  let i = 0;

  getTr(clickedButton)
    .children()
    .each(function() {
      switch (i) {
        case 0:
          cliente.nome = $(this)
            .find("input")
            .val();
          $(this)
            .find("input")
            .replaceWith(cliente.nome);
          break;
        case 1:
          cliente.sobrenome = $(this)
            .find("input")
            .val();
          $(this)
            .find("input")
            .replaceWith(cliente.sobrenome);
          break;
        case 2:
          cliente.endereco = $(this)
            .find("textarea")
            .val();
          $(this)
            .find("textarea")
            .replaceWith(cliente.endereco);
          break;
        case 3:
          $(this)
            .find("div")
            .html("Editar");
          break;
        default:
      }
      i++;
    });
};

// controllers
const getUser = id => {
  profile = this.getProfile(id);

  renderView("users/profile", profile); // update the view
};

$(document).on("submit", "#insertAddressForm", function(e) {
  e.preventDefault();

  let formData = toObject($("#insertAddressForm").serializeArray());
  app.Add(formData).then(result => {
    $("#insertAddressForm")
      .find("input:text")
      .val("");
    appendToAddressTable(result);
  });
});

$(document).on("click", "#delButton", function(e) {
  e.preventDefault();
  if ($(this).hasClass("activate")) {
    let id = getIdFromTr($(this));
    app.Delete(id).then(result => {
      removeLineFromTable($(this));
    });
  } else {
    $(this).toggleClass("activate");
    $(this).text("Confirmar");
  }
});

$(document).on("click", "#editButton", function(e) {
  e.preventDefault();
  if ($(this).hasClass("activate")) {
    let cliente = getClient($(this));
    // Salva as alterações, volta a ser valor
    app.Edit(cliente).then(result => {
      refreshEditRow($(this));
      $(this).removeClass("activate");
    });
  } else {
    $(this).addClass("activate");
    editClient($(this));
  }
});

$(document).on("focusout", ".form-holder__input", function() {
  if ($(this).val().length > 0) {
    $(this)
      .next()
      .addClass("notempty");
  } else {
    $(this)
      .next()
      .removeClass("notempty");
  }
});

const toObject = arr => {
  let rv = {};
  arr.forEach(function(arrLine) {
    let key = arrLine["name"];
    let value = arrLine["value"];
    rv[key] = value;
  });
  return rv;
};
