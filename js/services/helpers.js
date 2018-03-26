var appHelper = new function() {
	this.toObject = arr => {
		let rv = {};
		arr.forEach(function(arrLine) {
			let key = arrLine['name'];
			let value = arrLine['value'];
			rv[key] = value;
		});
		return rv;
	};

	this.validateForm = (formId, reqFieldsArray) => {
		for (var i = 0; i < reqFieldsArray.length - 1; i++) {
			if (
				$('#' + formId)
					.find('input[name=' + reqFieldsArray[i] + ']')
					.val().length < 1
			) {
				return false;
			}
		}
		return true;
	};
}();
