window.onload = event => {
	$root = document.getElementById('mainContainer');
	$loader = document.getElementById('loader');
	$formulario = document.getElementById('formularioContainer');
	$tabela = document.getElementById('tabelaContainer');
	$loader.innerHTML = '';

	addressModel.GetView('views/formulario.php').then(response => {
		$formulario.innerHTML = response;
	});

	addressModel.GetView('views/tabela.php').then(response => {
		$tabela.innerHTML += response;
	});

	addressModel.FetchAll().then(clientes => {
		clientes.forEach(function(cliente) {
			addressView.appendToAddressTable(cliente);
		});
	});

	// Primeiro carregamos todos os dados que já estão no BD e colocamos na página:
};

var addressController = new function() {
	this.getIdFromTr = clickedButton => {
		return clickedButton
			.parent()
			.parent()
			.attr('key');
	};

	this.getTr = clickedButton => {
		return clickedButton.parent().parent();
	};

	this.getClientFromView = clickedButton => {
		let id = addressController.getIdFromTr(clickedButton);
		let cliente = { id };
		let i = 0;

		this.getTr(clickedButton)
			.children()
			.each(function() {
				switch (i) {
					case 0:
						cliente.nome =
							$(this)
								.find('input')
								.val() || $(this).html();
						break;
					case 1:
						cliente.sobrenome =
							$(this)
								.find('input')
								.val() || $(this).html();
						break;
					case 2:
						cliente.endereco =
							$(this)
								.find('textarea')
								.val() || $(this).html();
						break;
				}
				i++;
			});

		return cliente;
	};

	this.editClient = clickedButton => {
		let cliente = this.getClientFromView(clickedButton);
		let i = 0;

		this.getTr(clickedButton)
			.children()
			.each(function() {
				switch (i) {
					case 0:
						$(this).replaceWith(
							'<td><input type="text" value="' +
								cliente.nome +
								'" /></td>'
						);
						break;
					case 1:
						$(this).replaceWith(
							'<td><input type="text" value="' +
								cliente.sobrenome +
								'" /></td>'
						);
						break;
					case 2:
						$(this).replaceWith(
							"<td><textarea style='height: " +
								($(this)
									.parent()
									.height() -
									0) +
								"px;'>" +
								cliente.endereco +
								'</textarea></td>'
						);
						break;
					case 3:
						$(this)
							.find('div')
							.html('Salvar');
						break;
					default:
				}
				i++;
			});
	};

	this.transformEditIntoRow = clickedButton => {
		let cliente = this.getClientFromView(clickedButton);
		let i = 0;

		addressController
			.getTr(clickedButton)
			.children()
			.each(function() {
				switch (i) {
					case 0:
						$(this)
							.find('input')
							.replaceWith(cliente.nome);
						break;
					case 1:
						$(this)
							.find('input')
							.replaceWith(cliente.sobrenome);
						break;
					case 2:
						$(this)
							.find('textarea')
							.replaceWith(cliente.endereco);
						break;
					case 3:
						$(this)
							.find('div')
							.html('Editar');
						break;
					default:
				}
				i++;
			});
	};
}();
