var addressModel = new function() {
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

	this.Edit = formDataObj => {
		if (formDataObj.id == parseInt(formDataObj.id, 10)) {
			return $.post('api/index.php?acao=update', formDataObj);
		}
	};

	this.FetchAll().then(clientes => {
		this.clientes = clientes;
	});

	this.GetView = path => {
		return $.get(path);
	};
}();
