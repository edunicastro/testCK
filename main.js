var app = new function() {
	this.generateTableRow = cliente => {
		var data = '';
		data += '<tr key="' + cliente.id + '">';
		data += '<td>' + cliente.nome + '</td>';
		data += '<td>' + cliente.sobrenome + '</td>';
		data += '<td>' + cliente.endereco + '</td>';
		data += '<td><button id="editButton">Edit</button></td>';
		data += '<td><button id="delButton">Delete</button></td>';
		data += '</tr>';
		return data;
	};

	this.FetchAll = () => {
		return $.get('api/index.php');
	};

	this.Add = formDataObj => {
		return $.post('api/index.php?acao=add', formDataObj);
	};

	this.Delete = id => {
		if (id == parseInt(id, 10)) {
			return $.get('api/index.php?acao=delete&id=' + id);
		}
	};

	this.Edit = id => {
		if (id == parseInt(id, 10)) {
			return $.get('api/index.php?acao=delete&id=' + id);
		}
	};

	// Sets app.clientes to hold an array with all clients
	this.FetchAll().then(clientes => {
		this.clientes = clientes;
	});
}();

window.onload = event => {
	$root = document.getElementById('mainContainer');
	$loader = document.getElementById('loader');
	$formulario = document.getElementById('formularioContainer');
	$tabela = document.getElementById('tabelaContainer');
	$loader.innerHTML = '';

	$.get('views/formulario.php', function(text) {
		$formulario.innerHTML = text;
	});

	$.get('views/tabela.php', function(text) {
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
	$('#tabelaContainer table tbody').append(app.generateTableRow(cliente));
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
		.attr('key');
};

const getTr = clickedButton => {
	return clickedButton.parent().parent();
};

const getClienteIntoForm = cliente => {
	$("#addressForm input[name='nome']").val(cliente.nome);
	$("#addressForm input[name='sobrenome']").val(cliente.sobrenome);
	$("#addressForm input[name='endereco']").val(cliente.endereco);
};

const getEditClient = clickedButton => {
	let id = getIdFromTr(clickedButton);
	let cliente = { id };
	let i = 0;

	getTr(clickedButton)
		.children()
		.each(function() {
			switch (i) {
				case 0:
					cliente.nome = this.innerHTML;
					i++;
					break;
				case 1:
					cliente.sobrenome = this.innerHTML;
					i++;
					break;
				case 2:
					cliente.endereco = this.innerHTML;
					i++;
					break;
				default:
			}
		});
	return cliente;
};

// controllers
const getUser = id => {
	profile = this.getProfile(id);

	renderView('users/profile', profile); // update the view
};

$(document).on('submit', '#addressForm', function(e) {
	e.preventDefault();
	let formData = toObject($('#addressForm').serializeArray());
	app.Add(formData).then(result => {
		console.log(result);
		appendToAddressTable(result);
	});
});

$(document).on('click', '#delButton', function(e) {
	e.preventDefault();
	let id = getIdFromTr($(this));
	app.Delete(id).then(result => {
		removeLineFromTable($(this));
	});
});

$(document).on('click', '#editButton', function(e) {
	e.preventDefault();
	let cliente = getEditClient($(this));
	getClienteIntoForm(cliente);
	console.log(cliente);
	// app.Delete(id).then(result => {
	// 	removeLineFromTable($(this));
	// });
});

const toObject = arr => {
	let rv = {};
	arr.forEach(function(arrLine) {
		let key = arrLine['name'];
		let value = arrLine['value'];
		rv[key] = value;
	});
	return rv;
};
