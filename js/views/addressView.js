var addressView = new function() {
	this.generateTableRow = cliente => {
		var data = '';
		data += '<tr key="' + cliente.id + '">';
		data += '<td>' + cliente.nome + '</td>';
		data += '<td>' + cliente.sobrenome + '</td>';
		data += '<td>' + cliente.endereco + '</td>';
		data += '<td><div id="editButton">Editar</div></td>';
		data += '<td><div id="delButton">Deletar</div></td>';
		data += '</tr>';
		return data;
	};

	this.appendToAddressTable = cliente => {
		$('#tabelaContainer table tbody').append(
			this.generateTableRow(cliente)
		);
	};

	this.removeLineFromTable = delButton => {
		delButton
			.parent()
			.parent()
			.remove();
	};
}();
