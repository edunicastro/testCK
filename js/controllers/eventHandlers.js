// Event Handlers
$(document).on('submit', '#insertAddressForm', function(e) {
	e.preventDefault();

	if (
		!appHelper.validateForm('insertAddressForm', [
			'nome',
			'sobrenome',
			'endereco'
		])
	) {
		return false;
	}

	let formData = appHelper.toObject($('#insertAddressForm').serializeArray());

	addressModel.Add(formData).then(result => {
		$('#insertAddressForm')
			.find('input:text')
			.val('');

		addressView.appendToAddressTable(result);
		$('.form-holder__label').each(function() {
			$(this).removeClass('notempty');
		});
	});
});

$(document).on('click', '#delButton', function(e) {
	e.preventDefault();
	if ($(this).hasClass('activate')) {
		let id = addressController.getIdFromTr($(this));
		addressModel.Delete(id).then(result => {
			addressView.removeLineFromTable($(this));
		});
	} else {
		$(this).toggleClass('activate');
		$(this).text('Confirmar');
	}
});

$(document).on('click', '#editButton', function(e) {
	e.preventDefault();
	if ($(this).hasClass('activate')) {
		let cliente = addressController.getClientFromView($(this));
		// Salva as alterações, volta a ser valor
		addressModel.Edit(cliente).then(result => {
			addressController.transformEditIntoRow($(this));
			$(this).removeClass('activate');
		});
	} else {
		$(this).addClass('activate');
		addressController.editClient($(this));
	}
});

$(document).on('focusout', '.form-holder__input', function() {
	if ($(this).val().length > 0) {
		$(this)
			.next()
			.addClass('notempty');
	} else {
		$(this)
			.next()
			.removeClass('notempty');
	}
});
